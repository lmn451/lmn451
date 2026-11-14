#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const FPS = 20;
const MAX_BYTES = 5 * 1024 * 1024;

async function main() {
  const probe = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  if (probe.status !== 0) throw new Error('FFmpeg must be installed and available on PATH.');
  const scratch = process.env.JCODE_SCRATCH_DIR || os.tmpdir();
  await fs.mkdir(scratch, { recursive: true });
  const temp = await fs.mkdtemp(path.join(scratch, 'profile-banner-'));
  let browser;
  try {
    // Set BROWSER_CHANNEL=chromium to use a Playwright-managed Chromium build.
    const channel = process.env.BROWSER_CHANNEL || 'chrome';
    browser = await chromium.launch({ headless: true, channel });
    const page = await browser.newPage({ viewport: { width: 1200, height: 360 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const url = pathToFileURL(path.join(__dirname, 'banner.html'));
    url.searchParams.set('capture', '1');
    await page.goto(url.href);
    await page.evaluate(() => document.fonts.ready);
    const duration = await page.evaluate(() => window.banner.duration);
    const checks = await page.evaluate(() => {
      const { drawFrame, canvas, duration } = window.banner;
      const ctx = canvas.getContext('2d');
      drawFrame(0);
      const first = canvas.toDataURL();
      const left = Array.from(ctx.getImageData(0, 0, 700, 360).data);
      drawFrame(duration / 4);
      const quarter = canvas.toDataURL();
      const laterLeft = ctx.getImageData(0, 0, 700, 360).data;
      const staticHeadline = left.every((value, index) => value === laterLeft[index]);
      drawFrame(duration);
      return { seamless: first === canvas.toDataURL(), animated: first !== quarter, staticHeadline };
    });
    assert.deepEqual(checks, { seamless: true, animated: true, staticHeadline: true });
    console.log('Validated seamless loop, moving sculpture, and static headline.');
    const count = Math.round(duration * FPS);
    for (let frame = 0; frame < count; frame++) {
      const png = await page.evaluate(seconds => {
        window.banner.drawFrame(seconds);
        return window.banner.canvas.toDataURL('image/png').split(',')[1];
      }, frame / FPS);
      await fs.writeFile(path.join(temp, `${String(frame).padStart(4, '0')}.png`), Buffer.from(png, 'base64'));
      if (frame % 50 === 0) console.log(`Rendered ${frame}/${count} frames`);
    }
    assert.equal(errors.length, 0, errors.join('\n'));
    await browser.close(); browser = undefined;
    const gif = path.join(temp, 'banner.gif');
    const encoded = spawnSync('ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(FPS),
      '-i', path.join(temp, '%04d.png'),
      '-filter_complex', '[0:v]split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
      '-loop', '0', gif,
    ], { encoding: 'utf8', timeout: 120000 });
    if (encoded.status !== 0) throw new Error(encoded.error?.message || encoded.stderr || 'GIF encoding failed');
    const { size } = await fs.stat(gif);
    assert.ok(size < MAX_BYTES, `GIF exceeds 5 MiB budget: ${size} bytes`);
    await fs.copyFile(gif, path.join(ROOT, 'assets/banner.gif'));
    await fs.copyFile(path.join(temp, '0000.png'), path.join(ROOT, 'assets/banner-static.png'));
    console.log(`Exported ${count} frames, ${duration}s, ${FPS}fps, ${(size / 1024 / 1024).toFixed(2)} MiB`);
    console.log('assets/banner.gif + assets/banner-static.png');
  } finally {
    if (browser) await browser.close();
    await fs.rm(temp, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
