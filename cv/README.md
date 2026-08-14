# CV generator

The CV is maintained as structured data in `data.json` and rendered through an
A4 HTML/CSS template. The build produces a selectable, searchable PDF with live
links and a PNG preview of the first page.

```bash
npm install
npx playwright install chromium # only needed when Chrome/Chromium is unavailable
npm run cv:build
```

Outputs:

- `output/pdf/michael-lerman-cv.pdf`
- `assets/cv-preview.png`

The renderer uses Playfair Display, Lato, and Roboto Condensed from Google
Fonts, with common local fallbacks. Set `CV_CHROME_PATH` if Playwright should
use a specific Chrome or Chromium executable.
