#!/usr/bin/env node
// Brand and SEO guard. Runs over the built HTML in dist/ so it checks what a
// visitor actually receives, not what the source looks like. Exits non-zero on
// any hard-rule violation, which is what fails the build in CI.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p) === '.html') files.push(p);
  }
})(DIST);

// Brand guide section 7, plus the additions in PLAN.md section 0.
const RETIRED = [
  'leverage', 'leverages', 'leveraging', 'robust', 'seamless', 'seamlessly',
  'game-changer', 'game changer', 'disrupt', 'disruptive', 'disruption',
  'unlock', 'unlocks', 'unlocking', 'empower', 'empowers', 'empowering',
  'solutioning', 'best-in-class', 'paradigm', 'cutting-edge', 'cutting edge',
  'next-generation', 'next generation', 'revolutionary', 'revolutionise',
  'ai-powered', 'ai powered', 'ai-driven', 'ai driven', 'ai-first',
  "in today's fast-paced world", 'in todays fast-paced world',
  'transformative', 'digital transformation',
];
// "journey" and "transform" are retired as brand words but appear in ordinary
// English, so they are checked as whole words with the marketing sense only.
const RETIRED_PHRASES = [
  /\b(?:your|their|our|the)\s+(?:ai|digital|business|customer)\s+journey\b/i,
  /\btransform\s+your\b/i,
];

// Invented proof the old site carried. None of it may come back.
const INVENTED = [
  /50\+\s*businesses/i,
  /businesses transformed/i,
  /avg\.?\s*(weekly|efficiency)/i,
  /join\s+50\+/i,
  /industry partner/i,
  /\d+\s*happy clients/i,
];

// British spellings. Josh is in Colorado; the site is American English.
const BRITISH = [
  ['summarise', 'summarize'], ['summarised', 'summarized'], ['summarising', 'summarizing'],
  ['neighbour', 'neighbor'], ['neighbours', 'neighbors'], ['neighbourhood', 'neighborhood'],
  ['prioritise', 'prioritize'], ['prioritised', 'prioritized'],
  ['organise', 'organize'], ['organised', 'organized'], ['organisation', 'organization'],
  ['recognise', 'recognize'], ['recognised', 'recognized'],
  ['realise', 'realize'], ['realised', 'realized'],
  ['behaviour', 'behavior'], ['favour', 'favor'], ['favourite', 'favorite'],
  ['colour', 'color'], ['centre', 'center'], ['licence', 'license'],
  ['practise', 'practice'], ['analyse', 'analyze'], ['catalogue', 'catalog'],
  ['apologise', 'apologize'], ['maximise', 'maximize'], ['minimise', 'minimize'],
  ['specialise', 'specialize'], ['utilise', 'utilize'], ['whilst', 'while'],
  ['programme', 'program'], ['travelling', 'traveling'], ['modelling', 'modeling'],
];

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
const EM_DASH = /[—–]/;

// Palette from global.css. Any other hex in a component is a bug.
const ALLOWED_HEX = new Set([
  '#1c3e54', '#3c8e8e', '#2c6671', '#0f2836', '#7fc5c5', '#a8dada',
  '#e6f2f2', '#f4f7f8', '#4f5d68', '#ffffff', '#fff', '#000', '#000000',
]);

const problems = [];
const add = (file, rule, detail) => problems.push({ file, rule, detail });

// Strip tags, scripts, styles, and JSON-LD so copy checks only see visible prose.
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const text = visibleText(html);
  const lower = text.toLowerCase();
  const isDev = file.includes('/dev/');

  for (const word of RETIRED) {
    const re = new RegExp(`(^|[^a-z-])${word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}([^a-z-]|$)`, 'i');
    if (re.test(lower)) add(file, 'retired word', word);
  }
  for (const re of RETIRED_PHRASES) {
    const m = text.match(re);
    if (m) add(file, 'retired phrase', m[0]);
  }
  for (const re of INVENTED) {
    const m = text.match(re);
    if (m) add(file, 'invented proof', m[0]);
  }
  for (const [bad, good] of BRITISH) {
    const re = new RegExp(`(^|[^a-z])${bad}([^a-z]|$)`, 'i');
    if (re.test(lower)) add(file, 'british spelling', `${bad} should be ${good}`);
  }
  const emoji = text.match(EMOJI);
  if (emoji) add(file, 'emoji', emoji[0]);
  const dash = text.match(EM_DASH);
  if (dash) {
    const i = text.indexOf(dash[0]);
    add(file, 'em dash', text.slice(Math.max(0, i - 40), i + 40).trim());
  }

  // Raw hex outside the token set.
  for (const m of html.matchAll(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)) {
    if (!ALLOWED_HEX.has(m[0].toLowerCase())) add(file, 'raw hex', m[0]);
  }

  // Structure: one H1, a title under 60, a description under 155, canonical.
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) add(file, 'headings', `${h1s.length} h1 elements`);
  const decode = (v) =>
    v
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#8217;/g, '\u2019');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (!title) add(file, 'seo', 'missing title');
  else if (title.length > 60) add(file, 'seo', `title ${title.length} chars`);
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!desc) add(file, 'seo', 'missing description');
  else if (desc.length > 155) add(file, 'seo', `description ${desc.length} chars`);
  if (!/rel="canonical"/.test(html)) add(file, 'seo', 'missing canonical');
  if (!isDev && !/property="og:image"/.test(html)) add(file, 'seo', 'missing og:image');

  // Images need alt text, decorative ones an explicit empty alt.
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) add(file, 'a11y', `img without alt: ${m[0].slice(0, 70)}`);
  }

  // Drafts must never reach main.
  if (/DRAFT: needs Josh review/.test(html)) add(file, 'draft', 'draft marker present');
}

// Workshop titles must appear verbatim wherever they appear at all.
const TITLES = [
  'AI Essentials: Three Capabilities You Keep',
  'AI Implementation Bootcamp',
  'AI Leadership Intensive',
];
const allText = files.map((f) => visibleText(readFileSync(f, 'utf8'))).join(' ');
for (const t of TITLES) {
  if (!allText.includes(t)) add('(site)', 'offer language', `missing exact title: ${t}`);
}

const byRule = new Map();
for (const p of problems) {
  if (!byRule.has(p.rule)) byRule.set(p.rule, []);
  byRule.get(p.rule).push(p);
}

console.log(`Checked ${files.length} built pages.\n`);
if (!problems.length) {
  console.log('Brand and SEO checks: clean.');
  process.exit(0);
}
for (const [rule, list] of byRule) {
  console.log(`${rule} (${list.length})`);
  for (const p of list.slice(0, 12)) console.log(`  ${p.file}: ${p.detail}`);
  if (list.length > 12) console.log(`  ... and ${list.length - 12} more`);
  console.log('');
}
console.error(`${problems.length} problem(s).`);
process.exit(1);
