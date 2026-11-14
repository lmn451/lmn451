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
  assert.ok(readme.includes('[View static banner](./assets/code-trace-static.svg)'));
  assert.ok(!header.includes('#play'), 'Default embedding must respect device motion preferences');
  const source = await fs.readFile(path.join(root, 'assets/code-trace.svg'), 'utf8');
  const still = await fs.readFile(path.join(root, 'assets/code-trace-static.svg'), 'utf8');
  assert.equal(still, source.replace('<svg ', '<svg data-static="true" '), 'Regenerate the static SVG after editing its source');
  assert.ok(Buffer.byteLength(source) < 16 * 1024);
  const assets = new Map([['/assets/code-trace.svg', source], ['/assets/code-trace-static.svg', still]]);
  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // No height:auto override: it previously masked a fixed-height README bug.
      res.end(`<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:16px}img{max-width:100%}</style><main>${header}</main></html>`);
    } else if (assets.has(req.url)) {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.end(assets.get(req.url));
    } else { res.statusCode = 404; res.end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const base = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
    for (const width of [1280, 912, 390]) {
      for (const reducedMotion of ['no-preference', 'reduce']) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
        await page.goto(base);
        const img = page.locator('main img');
        await img.evaluate(i => i.decode());
        const metrics = await img.evaluate(i => ({
          w: i.getBoundingClientRect().width, h: i.getBoundingClientRect().height,
          ratio: i.naturalWidth / i.naturalHeight, source: i.currentSrc, height: i.getAttribute('height'),
        }));
        assert.equal(metrics.height, null, 'Fixed image heights distort responsive GitHub banners');
        assert.ok(metrics.source.endsWith('/assets/code-trace.svg'));
        assert.equal(metrics.ratio, 5);
        assert.ok(Math.abs(metrics.w / metrics.h - metrics.ratio) < 0.002);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        if (width === 912) {
          // Chromium image documents on this host use the OS motion setting,
          // not Playwright's page-level media override. Test explicit opt-in in
          // actual image mode, and test both default preferences directly below.
          await img.evaluate(i => { i.src += '#play'; return i.decode(); });
          const before = await img.screenshot({ animations: 'allow' });
          await page.waitForTimeout(1800);
          assert.ok(!before.equals(await img.screenshot({ animations: 'allow' })), 'Opt-in SVG must visibly animate as an image');
          await img.evaluate(i => { i.src = '/assets/code-trace-static.svg#play'; return i.decode(); });
          const paused = await img.screenshot({ animations: 'allow' });
          await page.waitForTimeout(400);
          assert.ok(paused.equals(await img.screenshot({ animations: 'allow' })), 'Static derivative must stay still even with a play fragment');
          await img.evaluate(i => i.setAttribute('height', '240'));
          const brokenRatio = await img.evaluate(i => i.getBoundingClientRect().width / i.getBoundingClientRect().height);
          assert.ok(Math.abs(brokenRatio - metrics.ratio) > 0.1, 'Negative control must catch fixed-height distortion');
        }
        console.log(`PASS ${width}px / ${reducedMotion}: responsive vector embedding`);
        await page.close();
      }
    }
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ reducedMotion });
      await page.goto(base + '/assets/code-trace.svg');
      const count = await page.evaluate(() => document.getAnimations().length);
      assert.equal(count > 0, reducedMotion === 'no-preference', 'Default motion must follow the document preference');
      if (reducedMotion === 'no-preference') {
        const sample = time => page.evaluate(t => {
          for (const animation of document.getAnimations()) { animation.pause(); animation.currentTime = t; }
          const opacity = selector => Number(getComputedStyle(document.querySelector(selector)).opacity);
          return { original: opacity('.before'), renamed: opacity('.after'), resolved: opacity('.resolution') };
        }, time);
        assert.deepEqual(await sample(0), { original: 1, renamed: 0, resolved: 0 });
        assert.deepEqual(await sample(4000), { original: 1, renamed: 0, resolved: 1 });
        assert.deepEqual(await sample(6400), { original: 0, renamed: 1, resolved: 0 });
        const first = await page.screenshot();
        await sample(22400);
        assert.ok(first.equals(await page.screenshot()), 'The 16-second animation must repeat seamlessly');
      } else {
        assert.equal(await page.locator('.resolution').evaluate(e => getComputedStyle(e).opacity), '1');
        await page.goto(base + '/assets/code-trace.svg#play');
        assert.ok(await page.evaluate(() => document.getAnimations().length > 0), 'Explicit Play must override reduced motion');
      }
      console.log(`PASS ${reducedMotion}: default preference and animation stages`);
      await page.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
