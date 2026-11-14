#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/code-trace.svg'), 'utf8');
assert.ok(source.startsWith('<svg '), 'Expected a standalone SVG');
assert.ok(!/<(?:script|foreignObject|image)\b|\b(?:href|on\w+)\s*=|@import|url\s*\(|<!DOCTYPE|<!ENTITY/i.test(source), 'Banner must be self-contained and script-free');
assert.ok(source.includes('id="play"') && source.includes('svg:not(:target)'), 'Keep explicit opt-in playback working');
assert.ok(source.includes('prefers-reduced-motion'), 'Keep a useful reduced-motion state');
assert.ok(Buffer.byteLength(source) < 16 * 1024, 'Vector source should stay lightweight');
fs.writeFileSync(path.join(root, 'assets/code-trace-static.svg'), source.replace('<svg ', '<svg data-static="true" '));
console.log(`Vector banner: ${Buffer.byteLength(source)} bytes; static SVG generated.`);
