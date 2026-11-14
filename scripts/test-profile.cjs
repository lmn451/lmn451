#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

async function main() {
  const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
  const header = readme.match(/^<p>[\s\S]*?<\/p>/)?.[0];
  assert.ok(header, 'README must contain a banner');
  const image = await fs.readFile(path.join(root, 'assets/banner.gif'));
  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // Deliberately do NOT set height:auto. That preview override previously
      // hid the README's fixed-height bug in narrower GitHub profile columns.
      res.end(`<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:16px}img{max-width:100%}</style><main>${header}</main></html>`);
    } else if (req.url === '/assets/banner.gif') {
      res.setHeader('Content-Type', 'image/gif'); res.end(image);
    } else { res.statusCode = 404; res.end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  let browser;
  try {
    browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
    for (const width of [1280, 912, 390]) {
      for (const reducedMotion of ['no-preference', 'reduce']) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
        await page.goto(`http://127.0.0.1:${server.address().port}`);
        const img = page.locator('main img');
        await img.evaluate(i => i.decode());
        const metrics = await img.evaluate(i => ({
          w: i.getBoundingClientRect().width, h: i.getBoundingClientRect().height,
          ratio: i.naturalWidth / i.naturalHeight, source: i.currentSrc, height: i.getAttribute('height'),
        }));
        assert.equal(metrics.height, null, 'Fixed image heights distort responsive GitHub banners');
        assert.ok(metrics.source.endsWith('/assets/banner.gif'), 'Do not silently substitute a still image');
        assert.ok(Math.abs(metrics.w / metrics.h - metrics.ratio) < 0.002, 'Banner must preserve its natural aspect ratio');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        if (width === 912 && reducedMotion === 'no-preference') {
          const before = await img.screenshot();
          await page.waitForTimeout(1500);
          assert.ok(!before.equals(await img.screenshot()), 'The GIF must visibly animate');
          await img.evaluate(i => i.setAttribute('height', '360'));
          const brokenRatio = await img.evaluate(i => i.getBoundingClientRect().width / i.getBoundingClientRect().height);
          assert.ok(Math.abs(brokenRatio - metrics.ratio) > 0.1, 'Regression fixture must detect the original fixed-height bug');
        }
        console.log(`PASS ${width}px / ${reducedMotion}: responsive GIF, no still substitution`);
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
