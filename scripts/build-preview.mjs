#!/usr/bin/env node
// Packs the built site into one self-contained HTML file for review.
//
// This exists only so the site can be clicked through before it is deployed
// anywhere. It is not the deliverable and it is not how the site ships: the
// real thing is the static output in dist/. Everything here is inlined because
// the preview host serves a single file from its own origin with no network
// access: fonts and logos become data URIs, the stylesheets and the component
// scripts are inlined, and navigation is handled by a small router that swaps
// one page's markup for another and then fires `astro:page-load`, which is the
// same event Astro's view transitions fire, so every component re-wires itself.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const OUT = process.argv[2] || 'preview.html';

const ROUTES = [
  ['/', 'index.html', 'Home'],
  ['/workshops', 'workshops.html', 'Workshops'],
  ['/workshops/ai-essentials', 'workshops/ai-essentials.html', 'AI Essentials'],
  ['/workshops/implementation-bootcamp', 'workshops/implementation-bootcamp.html', 'Implementation Bootcamp'],
  ['/workshops/leadership-intensive', 'workshops/leadership-intensive.html', 'Leadership Intensive'],
  ['/consulting', 'consulting.html', 'Consulting'],
  ['/realtors', 'realtors.html', 'For brokerages'],
  ['/about', 'about.html', 'About'],
  ['/ai-readiness-assessment', 'ai-readiness-assessment.html', 'Readiness assessment'],
  ['/ai-briefing-breakfast', 'ai-briefing-breakfast.html', 'Briefing breakfast'],
  ['/contact', 'contact.html', 'Contact'],
  ['/blog', 'blog.html', 'Blog'],
  ['/privacy', 'privacy.html', 'Privacy'],
  ['/thanks', 'thanks.html', 'Thanks'],
  ['/404', '404.html', '404'],
  ['/dev/motion', 'dev/motion.html', 'Motion review'],
];

// Blog posts, discovered rather than listed.
const blogIndex = readFileSync(join(DIST, 'blog.html'), 'utf8');
for (const m of blogIndex.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)) {
  const route = `/blog/${m[1]}`;
  if (!ROUTES.some((r) => r[0] === route)) ROUTES.push([route, `blog/${m[1]}.html`, m[1]]);
}

const dataUri = (path, mime) =>
  `data:${mime};base64,${readFileSync(join(DIST, path)).toString('base64')}`;

const FONTS = {
  '/fonts/newsreader-latin-wght-normal.woff2': dataUri('fonts/newsreader-latin-wght-normal.woff2', 'font/woff2'),
  '/fonts/newsreader-latin-wght-italic.woff2': dataUri('fonts/newsreader-latin-wght-italic.woff2', 'font/woff2'),
  '/fonts/inter-latin-wght-normal.woff2': dataUri('fonts/inter-latin-wght-normal.woff2', 'font/woff2'),
};
const IMAGES = {
  '/logo.svg': dataUri('logo.svg', 'image/svg+xml'),
  '/logo-white.svg': dataUri('logo-white.svg', 'image/svg+xml'),
  '/favicon.svg': dataUri('favicon.svg', 'image/svg+xml'),
};

// Every stylesheet the pages reference, in first-seen order.
const cssFiles = [];
const jsFiles = [];
const inlineScripts = [];
const pages = [];

for (const [route, file, label] of ROUTES) {
  const path = join(DIST, file);
  if (!existsSync(path)) {
    console.warn(`skipping missing ${file}`);
    continue;
  }
  const html = readFileSync(path, 'utf8');

  for (const m of html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+)"/g)) {
    if (!cssFiles.includes(m[1])) cssFiles.push(m[1]);
  }
  for (const m of html.matchAll(/<script type="module" src="(\/_astro\/[^"]+)"><\/script>/g)) {
    // Astro's view-transition router and its prefetch module are both replaced
    // by the preview's own router, and the prefetch module tries to fetch real
    // URLs that do not exist in a single file.
    if (/ClientRouter|\/page\.|\/index\./.test(m[1])) continue;
    if (!jsFiles.includes(m[1])) jsFiles.push(m[1]);
  }

  let body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));

  // Astro emits each component's script as an inline module in the body. Markup
  // injected with innerHTML never executes its scripts, so they are lifted out,
  // deduped, and run once at load. They all register an `astro:page-load`
  // listener, which is what makes them re-wire on every route change.
  for (const m of body.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)) {
    const code = m[1].trim();
    if (code && !inlineScripts.includes(code)) inlineScripts.push(code);
  }
  // Then strip every script tag: the externals are inlined globally, the JSON-LD
  // is not needed in a preview, and the home page's anchor-redirect shim would
  // fight the preview router.
  body = body.replace(/<script[\s\S]*?<\/script>/g, '');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, label])[1];
  pages.push({ route, label, title, body });
}

let css = cssFiles.map((f) => readFileSync(join(DIST, f.slice(1)), 'utf8')).join('\n');
for (const [from, to] of Object.entries(FONTS)) css = css.split(from).join(to);

let js = [
  ...jsFiles.map((f) => readFileSync(join(DIST, f.slice(1)), 'utf8')),
  ...inlineScripts,
].join('\n;\n');

const esc = (s) => s.replace(/<\/script>/gi, '<\\/script>');
const payload = pages.map((p) => {
  let body = p.body;
  for (const [from, to] of Object.entries(IMAGES)) body = body.split(`"${from}"`).join(`"${to}"`);
  return { ...p, body };
});

const nav = payload
  .filter((p) => !['/thanks', '/404'].includes(p.route))
  .map((p) => `<option value="${p.route}">${p.label}</option>`)
  .join('');

const out = `<title>Idea Collaborative</title>
<style>${css}</style>
<style>
  .previewbar {
    position: fixed; inset-inline: 0; bottom: 0; z-index: 999;
    display: flex; gap: .75rem; align-items: center; flex-wrap: wrap;
    padding: .6rem 1rem calc(.6rem + env(safe-area-inset-bottom));
    background: #0F2836; color: #F4F7F8;
    font: 500 13px/1.3 "Inter Variable", system-ui, sans-serif;
    border-top: 1px solid rgba(127,197,197,.28);
  }
  .previewbar b { font-weight: 600; color: #7FC5C5; letter-spacing: .06em; text-transform: uppercase; font-size: 11px; }
  .previewbar select {
    font: inherit; padding: .4rem .6rem; border-radius: 6px; min-height: 34px;
    background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(127,197,197,.35);
  }
  .previewbar select option { color: #0F2836; }
  .previewbar span { opacity: .72; font-weight: 400; }
  body { padding-bottom: 3.5rem; }
  @media (max-width: 560px) { .previewbar span { display: none; } }
</style>

<div id="stage"></div>

<div class="previewbar">
  <b>Preview</b>
  <select id="route" aria-label="Choose a page">${nav}</select>
  <span>Static preview of the built site. Forms and booking are inert here.</span>
</div>

<script>window.__PAGES__ = ${esc(JSON.stringify(payload))};</script>
<script type="module">${esc(js)}</script>
<script type="module">
  const pages = window.__PAGES__;
  const stage = document.getElementById('stage');
  const select = document.getElementById('route');
  const byRoute = Object.fromEntries(pages.map((p) => [p.route, p]));

  function show(route, push) {
    const page = byRoute[route] || byRoute['/404'] || pages[0];
    stage.innerHTML = page.body;
    document.title = page.title;
    if (select.value !== page.route) select.value = page.route;
    window.scrollTo(0, 0);
    // Re-run every component's wiring. Astro components listen for this event
    // because the real site uses view transitions, so nothing special is needed.
    document.dispatchEvent(new Event('astro:page-load'));
    if (push) history.pushState({ route: page.route }, '', '#' + page.route);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) return;
    if (!href.startsWith('/')) return;
    const [path, hash] = href.split('#');
    const route = path.replace(/\\/$/, '') || '/';
    if (!byRoute[route]) return;
    e.preventDefault();
    show(route, true);
    if (hash) {
      const t = document.getElementById(hash);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    show('/thanks', true);
  });

  select.addEventListener('change', () => show(select.value, true));
  window.addEventListener('popstate', () => show((location.hash || '#/').slice(1), false));

  show((location.hash || '#/').slice(1), false);
</script>
`;

writeFileSync(OUT, out);
console.log(`${OUT}: ${pages.length} routes, ${Math.round(out.length / 1024)} KB`);
