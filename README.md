# Idea Collaborative

Practical AI that pays for itself. Workshops and implementation for Northern
Colorado businesses.

Astro 5 static site. Zero client JavaScript on most routes, self-hosted fonts,
no tracking cookies.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve dist/
npm run lint:brand # brand and SEO checks against the built HTML
```

Node 22 or later.

## Where things are

```
src/
  data/           Single source of truth. Prices, titles, contact, schema.
                  Change a price here and it changes everywhere.
  components/     Presentational pieces.
    motion/       The six signature moments from PLAN.md 4b.
  layouts/        Base (head, nav, footer) and Post (blog).
  content/posts/  Blog markdown. Frontmatter schema in src/content.config.ts.
  pages/          Routes. File-based.
  styles/         global.css. The brand tokens live here and nowhere else.
scripts/
  check-brand.mjs Brand and SEO guard, run over dist/ by npm run lint:brand.
  build-fonts.mjs Re-subsets the three web fonts after a font package update.
public/           Logos, favicons, OG images, fonts, robots.txt.
docs/             The brand guide, for reference.
```

## The rules

`CLAUDE.md` holds the hard rules: brand, SEO, and motion. `PLAN.md` is the build
plan this was made from. `LAUNCH.md` has the deploy steps, the assets still
needed, and three decisions waiting on Josh.

`npm run lint:brand` enforces the mechanical half automatically: retired words,
invented statistics, emoji, em dashes, raw hex, British spellings, heading
order, missing alt text, title and description lengths, and the exact workshop
titles. It reads the built HTML rather than the source, so it checks what a
visitor actually receives.

## Motion

Layer 1 is CSS only. Layer 2 is the six signature moments, and four of the six
also cost nothing: the mark scene, the flow line, the number counters, and every
scroll reveal are CSS scroll-driven animations. The living gradient, the
before-and-after slider, the listing demo, and the hours calculator use a few
hundred bytes of hand-written JavaScript each, well inside the 40KB budget.

Everything falls back to its finished state under `prefers-reduced-motion` and
in browsers without scroll-driven animations. Review each effect in isolation at
`/dev/motion`, which is noindex and excluded from the sitemap.

## Performance

Lighthouse, mobile emulation, at the last check:

| Route | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 |
| `/workshops` | 100 | 100 | 100 | 100 |
| `/consulting` | 99 | 100 | 100 | 100 |
| `/realtors` | 98 | 100 | 100 | 100 |
| `/about` | 96 | 100 | 100 | 100 |
| `/contact` | 99 | 100 | 100 | 100 |
| `/blog` | 99 | 100 | 100 | 100 |
| Blog post | 100 | 100 | 100 | 100 |

CI runs Lighthouse on every pull request and fails under 90.
