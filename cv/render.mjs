import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '..');
const outputPdf = path.join(root, 'output', 'pdf', 'michael-lerman-cv.pdf');
const outputPreview = path.join(root, 'assets', 'cv-preview.png');

const [template, styles, data] = await Promise.all([
  readFile(path.join(directory, 'template.html'), 'utf8'),
  readFile(path.join(directory, 'styles.css'), 'utf8'),
  readFile(path.join(directory, 'data.json'), 'utf8').then(JSON.parse),
]);

const serializedData = JSON.stringify(data).replaceAll('<', '\\u003c');
const html = template
  .replace('/*__CV_CSS__*/', styles)
  .replace('__CV_DATA__', serializedData);

await mkdir(path.dirname(outputPdf), { recursive: true });
await mkdir(path.dirname(outputPreview), { recursive: true });

const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.CV_CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined);
const browser = await chromium.launch({ headless: true, executablePath });

try {
  const page = await browser.newPage({
    viewport: { width: 1192, height: 1684 },
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const pages = page.locator('.page');
  if ((await pages.count()) !== 2) {
    throw new Error('Expected exactly two CV pages');
  }

  await page.pdf({
    path: outputPdf,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });

  await pages.first().screenshot({ path: outputPreview });
  console.log(`Created ${path.relative(root, outputPdf)}`);
  console.log(`Created ${path.relative(root, outputPreview)}`);
} finally {
  await browser.close();
}

