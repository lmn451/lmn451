# Banner source

The profile uses a locally generated 3D ASCII constellation. No external animation service is needed to display it.

- `banner.html`: editable canvas source, with a 16-second periodic rotation and a stationary headline.
- `render-banner.cjs`: deterministic frame capture and palette-optimized GIF export.
- `../assets/banner.gif`: 1200 × 360, 200 frames at 12.5 fps, looping every 16 seconds.
- `../assets/banner-static.png`: matching still for reduced-motion preferences and the explicit static-banner link.
- `../assets/banner.svg`: original static masthead, retained as an alternative.

## Rebuild

Requires Node.js, FFmpeg on `PATH`, and Playwright. The current render was generated using Playwright 1.62.1 and installed Google Chrome.

From the repository root:

```sh
npm install --no-save --package-lock=false playwright@1.62.1
node scripts/render-banner.cjs
```

The renderer defaults to installed Chrome. To use Playwright's Chromium instead:

```sh
npx playwright install chromium
BROWSER_CHANNEL=chromium node scripts/render-banner.cjs
```

Frames are generated in a unique temporary directory under `JCODE_SCRATCH_DIR` when set, otherwise the OS temporary directory. Temporary frames are removed after rendering. The script checks that the loop endpoints match, the artwork moves, the headline stays pixel-identical, and the exported GIF is smaller than 5 MiB before copying the output assets. Exact rasterization can vary with installed fonts and browser versions.

Open `banner.html` directly to inspect the source animation. Add `?capture=1` to freeze playback for frame capture. The source respects reduced-motion preferences. The README uses a `<picture>` source for the still when reduced motion is requested, plus a direct static-image link for renderers that do not honor the media query. Browser behavior was checked in the local preview, not on a published GitHub profile.
