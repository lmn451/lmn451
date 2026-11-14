# Banner source

The profile uses a locally generated, interwoven 3D ASCII sculpture. No external animation service is needed to display it.

The shape is a closed trefoil with a twisting elliptical cross-section, sampled at 35,840 surface points. A per-character depth buffer hides occluded surfaces. Directional, rim, and specular lighting define the ribbons. A deterministic set of 220 code fragments assembles into the sculpture, a highlight travels over its surfaces, and it dissolves back into code. Brief eased holds keep the loop calm and its first frame useful as a still.

- `banner.html`: editable canvas source, with a 12-second three-stage loop and a stationary headline.
- `render-banner.cjs`: deterministic frame capture and palette-optimized GIF export.
- `../assets/banner.gif`: 1600 × 480, 300 frames at 25 fps, looping every 12 seconds.
- `../assets/banner-static.png`: matching still available through the explicit static-banner link.
- `../assets/banner.svg`: original static masthead, retained as an alternative.

## Rebuild

Requires Node.js, FFmpeg on `PATH`, and Playwright. The current render was generated using Playwright 1.62.1 and installed Google Chrome.

From the repository root:

```sh
npm install --no-save --package-lock=false playwright@1.62.1
node scripts/render-banner.cjs
node scripts/test-profile.cjs
```

The renderer defaults to installed Chrome. To use Playwright's Chromium instead:

```sh
npx playwright install chromium
BROWSER_CHANNEL=chromium node scripts/render-banner.cjs
```

Frames are generated in a unique temporary directory under `JCODE_SCRATCH_DIR` when set, otherwise the OS temporary directory. Temporary frames are removed after rendering. The script checks that the loop endpoints match, all three stages appear, the artwork moves, the headline stays pixel-identical, and the exported GIF is smaller than 5 MiB before copying the output assets. The two-pass palette encoder avoids buffering the entire high-resolution animation in memory. Exact rasterization can vary with installed fonts and browser versions.

`test-profile.cjs` loads the actual README banner markup in a local browser fixture at desktop, narrow-profile, and mobile widths. It verifies GIF selection under both motion preferences, natural aspect ratio, no horizontal overflow, and visible playback. The fixture deliberately omits `height:auto`, and a negative control reintroduces the old fixed-height bug to ensure the check catches it.

Open `banner.html` directly to inspect the source animation. Add `?capture=1` to freeze playback for frame capture. The source respects reduced-motion preferences. The README embeds the GIF directly without a fixed height so narrower columns preserve its natural aspect ratio. The static PNG is an explicit link, not an automatic replacement. GitHub's own accessibility settings control GIF autoplay independently.
