# Profile visual authoring

## Current vector source

Edit `assets/code-trace.svg` from the repository root. It is a self-contained **1200 × 240 (5:1)** SVG with a CSS-animated illustration of a coordinator planning a task, dispatching implementation and tests to parallel workers, and verifying their results. This is **an illustrated workflow, not recorded editor footage** or a product screenshot.

The SVG uses no JavaScript, external resources, or external animation service. Its shapes, text, and animation rules live in one editable file. Keep the title and description accurate when changing the illustration.

From the repository root, regenerate the static derivative and run the profile checks:

```sh
node scripts/build-code-trace.cjs
node scripts/test-profile.cjs
```

The build needs Node.js. It reads `assets/code-trace.svg`, checks that the source is lightweight, self-contained, script-free, and includes reduced-motion handling, then writes `assets/code-trace-static.svg`. The derivative adds `data-static="true"` to select the source's nonanimated CSS state. Edit the primary SVG, not the generated derivative.

### Motion and embedding

The source's `prefers-reduced-motion: reduce` rules disable animation while retaining visible delegation paths, completed workers, and the verification result. The static derivative selects that useful still independently of the motion preference. The profile intentionally has no separate static-banner link.

Embed the animated SVG with an image width of `1200` and **no fixed HTML image height**. Its intrinsic SVG dimensions establish the 5:1 aspect ratio, allowing narrower profile columns to scale proportionally. Do not remove the SVG's intrinsic height to achieve this.

Append `#play` to the source URL only after an explicit playback request, such as the local preview's Play button. The SVG's `:target` rule opts into motion without scripts. Do not add this fragment to the README's default image. The generated static SVG remains still even with `#play`.

The browser checks require Playwright and installed Chrome (or set `BROWSER_CHANNEL` for another installed Playwright Chromium channel):

```sh
npm install --no-save --package-lock=false playwright@1.62.1
node scripts/test-profile.cjs
```

The checks cover image embedding at 1280, 912, and 390 pixels, correct 5:1 sizing, pixel changes during explicit playback, an unchanged static image, plan/delegate/verify stages, and repeatability. A negative control deliberately adds a fixed image height to catch distortion.

On the tested macOS Chrome setup, embedded SVGs followed the device motion setting instead of Playwright's page-level media emulation. Tests therefore exercise explicit playback as an embedded image and both default media preferences in the standalone SVG document. This is local Chrome coverage, not proof of GitHub production behavior. GitHub production validation has not been established.

## Legacy raster experiments

The following files preserve the earlier decorative ASCII-sculpture experiment. They are **not used by the current profile**:

- `scripts/banner.html`: editable canvas source with a 12-second three-stage sculpture loop and stationary headline.
- `scripts/render-banner.cjs`: deterministic frame capture and palette-optimized GIF export.
- `assets/banner.gif`: 1600 × 480, 300 frames at 25 fps.
- `assets/banner-static.png`: matching raster still.
- `assets/banner.svg`: earlier static masthead.

### Rebuild the legacy GIF

This separate pipeline requires Node.js, FFmpeg on `PATH`, and Playwright. The documented legacy render used Playwright 1.62.1 and installed Google Chrome. From the repository root:

```sh
npm install --no-save --package-lock=false playwright@1.62.1
node scripts/render-banner.cjs
```

The renderer defaults to installed Chrome. To use Playwright's Chromium instead:

```sh
npx playwright install chromium
BROWSER_CHANNEL=chromium node scripts/render-banner.cjs
```

Frames are generated in a unique temporary directory under `JCODE_SCRATCH_DIR` when set, otherwise the OS temporary directory, and removed after rendering. The renderer checks matching loop endpoints, the three stages, artwork movement, a pixel-identical headline, and a GIF size below 5 MiB before copying the output assets. Its two-pass palette encoder avoids buffering the entire high-resolution animation in memory. Rasterization can vary with installed fonts and browser versions.

Open `scripts/banner.html` directly to inspect this legacy animation. Add `?capture=1` to freeze it for frame capture. Its canvas source supports reduced motion, but that does not make the exported GIF responsive to motion preferences. The current profile tests cover the vector visual, not this legacy GIF.
