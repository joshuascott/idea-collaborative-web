#!/usr/bin/env node
// Rebuilds the three font files in public/fonts from @fontsource-variable.
//
// The site uses Newsreader at one weight (500, roman and italic) and Inter
// between 300 and 700, all Latin. Shipping the full variable fonts meant 168 KB
// on the critical path, which was holding LCP at 2.9s on a throttled phone.
// Pinning the axes and cutting the character set takes that to a fraction.
//
// Run with: node scripts/build-fonts.mjs   (needs python3 with fonttools+brotli)
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

const OUT = 'public/fonts';
mkdirSync(OUT, { recursive: true });

// Basic Latin, Latin-1, the typographic marks the copy actually uses, and the
// brand's checkmark glyph, which is drawn from CSS content in the body font.
const UNICODES = [
  'U+0020-007E', 'U+00A0-00FF', 'U+0131', 'U+0152-0153',
  'U+2013-2014', 'U+2018-201D', 'U+2022', 'U+2026', 'U+2039-203A',
  'U+00B7', 'U+2212', 'U+20AC', 'U+2122', 'U+2713',
].join(',');

const jobs = [
  { src: 'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2', out: 'newsreader-latin-wght-normal.woff2', axes: 'wght=500' },
  { src: 'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2', out: 'newsreader-latin-wght-italic.woff2', axes: 'wght=500' },
  { src: 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', out: 'inter-latin-wght-normal.woff2', axes: 'wght=300:700' },
];

for (const job of jobs) {
  const before = statSync(job.src).size;
  const tmp = `/tmp/${job.out.replace('.woff2', '')}-instance.ttf`;
  execFileSync('python3', ['-m', 'fontTools.varLib.instancer', job.src, job.axes, '-o', tmp], { stdio: 'inherit' });
  execFileSync('python3', ['-m', 'fontTools.subset', tmp,
    `--unicodes=${UNICODES}`,
    '--layout-features=kern,liga,calt,ccmp,locl,mark,mkmk,tnum,frac',
    '--flavor=woff2',
    '--desubroutinize',
    '--no-hinting',
    `--output-file=${OUT}/${job.out}`,
  ], { stdio: 'inherit' });
  const after = statSync(`${OUT}/${job.out}`).size;
  console.log(`${job.out}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`);
}
