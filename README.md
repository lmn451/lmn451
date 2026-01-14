<p align="center">
  <img src="./assets/banner.svg" alt="lmn451 banner" />
</p>

<div align="center">

[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=lmn451&show_icons=true&theme=tokyonight&hide_border=true)](https://github.com/lmn451)
[![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=lmn451&layout=compact&theme=tokyonight&hide_border=true)](https://github.com/lmn451)

</div>

<h2 align="center">Developer tooling for editors, CSS, and code archaeology.</h2>

<p align="center">
  I build language servers, editor extensions, and web utilities that make complex codebases feel small.
</p>

<p align="center">
  <strong>Status:</strong> Senior Software Engineer (full-time)
</p>

<p align="center">
  <a href="https://github.com/lmn451">
    <img alt="Followers" src="https://img.shields.io/badge/followers-4-blue?logo=github" />
  </a>
  <a href="https://github.com/lmn451?tab=repositories">
    <img alt="Repos" src="https://img.shields.io/badge/repos-40-blue?logo=github" />
  </a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white" />
  <img alt="Rust" src="https://img.shields.io/badge/Rust-dea584?logo=rust&logoColor=111827" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-f1e05a?logo=javascript&logoColor=111827" />
</p>

---

## Language Servers

### 🏆 CSS Variable LSP

<p align="right"><img alt="1,900+ downloads/month" src="https://img.shields.io/badge/dyn/1,900%2B%20downloads%2Fmonth-14b8a6" /></p>

Language server for CSS custom properties with completions, hovers, and diagnostics. Indexes your entire workspace to understand the full cascade—from `:root` to inline styles.

**Perfect for:**
- Finding where a CSS variable is defined or used
- Debugging missing variable errors before runtime
- Refactoring design systems with confidence

**Key features:**
- ✓ Workspace-wide variable indexing across CSS, HTML, JS, Vue, Svelte
- ✓ Cascade-aware hover resolution (knows which value actually applies)
- ✓ Diagnostics for undefined or unused variables
- ✓ Works in all your files, not just `.css`

<p align="center">
  <a href="https://github.com/lmn451/css-lsp"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
  <a href="https://www.npmjs.com/package/css-variable-lsp"><img alt="npm" src="https://img.shields.io/badge/npm-1.9k%2Fmo-cb3837?logo=npm" /></a>
</p>

---

### 🆕 JSX Prop Lookup (MCP)

<p align="right"><img alt="MCP + CLI" src="https://img.shields.io/badge/MCP+%2B+CLI-f97316" /></p>

AST-powered analysis for React and TypeScript prop usage across an entire repository. Ask questions about your components and get answers in seconds—not minutes.

**Perfect for:**
- Finding which props a component actually uses
- Identifying dead props that can be removed
- Auditing component APIs before refactoring

**Key features:**
- ✓ Codebase-wide prop search and component analysis
- ✓ AND/OR filters for complex component queries
- ✓ TypeScript interface-aware results
- ✓ **Available as MCP server + standalone CLI**

<p align="center">
  <a href="https://github.com/lmn451/jsx-prop-lookup-mcp-server"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
</p>

---

## Editor Extensions

### CSS Variables for Zed

<p align="right"><img alt="2 forks" src="https://img.shields.io/badge/forks-2-14b8a6" /></p>

Zero-config Zed extension that runs css-variable-lsp automatically. Get completions, hovers, and references for CSS variables in CSS, JS/TS, Vue, Svelte, and more—without manual setup.

**Key features:**
- ✓ Auto-installs the latest LSP on first run
- ✓ Completions, hover, and references
- ✓ Works across all file types Zed supports
- ✓ One-click install from Zed extensions marketplace

<p align="center">
  <a href="https://github.com/lmn451/css-variables-zed"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
  <a href="https://zed.dev/extensions/css-variables"><img alt="Zed" src="https://img.shields.io/badge/Zed-Extension-111827?logo=zed" /></a>
</p>

---

### Git Search for VS Code

<p align="right"><img alt="1 star" src="https://img.shields.io/badge/stars-1-f97316" /></p>

Fast, UI-based git log search to answer "who changed what and when" without leaving your editor. Jump straight to commits, view diffs, and explore history.

**Key features:**
- ✓ Search commit history without the terminal
- ✓ Jump straight to remote commits
- ✓ Pagination for large histories
- ✓ Author and date filtering

<p align="center">
  <a href="https://github.com/lmn451/git-search"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
</p>

---

## Web Utilities

### Screencast Extension

<p align="right"><img alt="Chrome" src="https://img.shields.io/badge/Chrome-4285f4?logo=googlechrome" /></p>

Chromium browser extension for streamlined screen recording workflows. Designed for creators who need quick setup and iteration.

**Key features:**
- ✓ Unpacked dev workflow for Chromium browsers
- ✓ Clear setup and reload steps for fast iteration
- ✓ Optimized for quick capture and export

<p align="center">
  <a href="https://github.com/lmn451/screencast"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
</p>

---

### Smart Life Webapp

<p align="right"><img alt="Cloudflare" src="https://img.shields.io/badge/Cloudflare-f97316?logo=cloudflare&logoColor=white" /></p>

PWA to control Smart Life/Tuya devices with a Cloudflare Pages Functions API proxy. Vue 3 + Element Plus frontend with region-aware backend.

**Key features:**
- ✓ Vue 3 and Element Plus UI
- ✓ Cloudflare Pages Functions API proxy
- ✓ Tuya API with multi-region support
- ✓ Installable PWA

<p align="center">
  <a href="https://github.com/lmn451/smart-life-webapp"><img alt="Repo" src="https://img.shields.io/badge/Repo-GitHub-111827?logo=github" /></a>
</p>

---

## Tech Stack

<div align="center">

| Languages | Editors | Infrastructure |
|-----------|---------|----------------|
| TypeScript | VS Code | Cloudflare |
| Rust | Zed | npm |
| JavaScript | | |

</div>

---

## Support

<div align="center">

**Building tools you use? Fund the work.**

Solana: `GD8b6k9A82WLth6L6fdSiBFrz2DyL8TQKydfjqfUebFJ`  
Ethereum/Polygon: `0x23193f07cf79A2a5Df4176368cbBfAADbb3eC4dB`

</div>
