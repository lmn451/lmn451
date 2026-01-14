<p align="center">
  <img src="./assets/banner.svg" alt="lmn451 banner" />
</p>

<h2 align="center">Developer tooling for editors, CSS, and code archaeology.</h2>

<p align="center">
  I build language servers, editor extensions, and web utilities that make complex codebases feel small.
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white" />
  <img alt="Rust" src="https://img.shields.io/badge/Rust-dea584?logo=rust&logoColor=111827" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-f1e05a?logo=javascript&logoColor=111827" />
  <img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-007acc?logo=visualstudiocode&logoColor=white" />
  <img alt="Zed" src="https://img.shields.io/badge/Zed-111827" />
  <img alt="LSP" src="https://img.shields.io/badge/LSP-0ea5e9" />
  <img alt="Cloudflare" src="https://img.shields.io/badge/Cloudflare-f97316?logo=cloudflare&logoColor=white" />
</p>

## Signature projects

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>JSX Prop Lookup (MCP)</h3>
      <p>AST-powered analysis for React and TypeScript prop usage across a whole repo.</p>
      <p>
        <a href="https://github.com/lmn451/jsx-prop-lookup-mcp-server">Repo</a>
      </p>
      <ul>
        <li>Codebase-wide prop search and component analysis</li>
        <li>Advanced component queries with AND/OR filters</li>
        <li>TypeScript interface-aware results</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>CSS Variable LSP</h3>
      <p>Language server focused on CSS custom properties with completions, hovers, and diagnostics.</p>
      <p>
        <a href="https://github.com/lmn451/css-lsp">Repo</a> | <a href="https://www.npmjs.com/package/css-variable-lsp">npm</a>
      </p>
      <ul>
        <li>Workspace indexing across CSS and HTML styles</li>
        <li>Cascade-aware hover resolution</li>
        <li>Diagnostics for undefined variables</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>CSS Variables for Zed</h3>
      <p>Zed extension that runs css-variable-lsp with zero manual setup.</p>
      <p>
        <a href="https://github.com/lmn451/css-variables-zed">Repo</a> | <a href="https://zed.dev/extensions/css-variables">Zed Extension</a>
      </p>
      <ul>
        <li>Completion, hover, and references for CSS variables</li>
        <li>Works in CSS, JS/TS, Vue, Svelte, and more</li>
        <li>Auto-installs the latest LSP on first run</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>Git Search for VS Code</h3>
      <p>Fast, UI-based git log search to answer who changed what and when.</p>
      <p>
        <a href="https://github.com/lmn451/git-search">Repo</a>
      </p>
      <ul>
        <li>Search commit history without the terminal</li>
        <li>Jump straight to remote commits</li>
        <li>Pagination for large histories</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>Screencast Extension</h3>
      <p>Chromium browser extension for screen recording workflows.</p>
      <p>
        <a href="https://github.com/lmn451/screencast">Repo</a>
      </p>
      <ul>
        <li>Unpacked dev workflow for Chromium browsers</li>
        <li>Clear setup and reload steps for fast iteration</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>Smart Life Webapp</h3>
      <p>PWA to control Smart Life devices with a Cloudflare Pages Functions API proxy.</p>
      <p>
        <a href="https://github.com/lmn451/smart-life-webapp">Repo</a>
      </p>
      <ul>
        <li>Vue 3, Element Plus, and Cloudflare Pages</li>
        <li>Tuya API proxy with region support</li>
      </ul>
    </td>
  </tr>
</table>

## What I optimize for

- Fast feedback loops in editors and CLI tools
- Clear ergonomics for large, messy codebases
- DX-first defaults with sensible configuration

## Collaborate

Open an issue on any repo for bugs, features, or integration questions.
