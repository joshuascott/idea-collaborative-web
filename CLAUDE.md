# Idea Collaborative site: working rules

Read `PLAN.md` and `docs/brand-guide.md` before touching anything. `LAUNCH.md`
carries the open decisions and the steps that live outside this repo.

## Stack

Astro 5, Tailwind 4, self-hosted Inter and Newsreader, Lucide icons, Netlify
Forms, Cal.com embed, static output. No React, no client framework, no builder.

## Brand rules (hard)

- Colors only from the tokens in `src/styles/global.css`. Never a raw hex in a
  component. `npm run lint:brand` fails the build on one.
- No Signal Teal text on white, and no white text on Signal Teal below 24px.
  See amendment 7 in `LAUNCH.md`: the primary button fill is Deep Teal.
- No navy on teal. No teal on navy.
- Two-color logo only on white, Cloud, or Mist. `logo-white.svg` on gradient,
  navy, Ink, or photography.
- Wordmark: `idea` at 700, `collab` at 300, one word, lowercase, -0.02em.
- Dark-first: Ink and Deep Navy surfaces with Cloud text. Display headlines in
  Newsreader 500 with **exactly one** italic word. Chapter labels on long pages.
  Photography only from the approved set, always with an Ink fade under type.
- Sentence case headlines. Left-aligned body. No emoji. No em dashes.
- American spelling. The brand check greps for the common British forms.
- Retired words (never use): leverage (verb), robust, seamless, game-changer,
  disrupt, unlock, empower, journey, solutioning, best-in-class, paradigm,
  "in today's fast-paced world", cutting-edge, next-generation, revolutionary,
  AI-powered / AI-driven as filler, transform as the hero verb.
- Workshop titles exactly: "AI Advantage: Your Business, Amplified",
  "AI Implementation Bootcamp", "AI Leadership Intensive". They live in
  `src/data/offers.ts` and that is the only place they are written down.
- Contact block order: web, email, phone, city. Never reorder. It lives in
  `src/data/contact.ts`.
- No invented statistics, client counts, or testimonials. Only the five proof
  points in brand guide section 8. There are no case studies yet and the About
  page says so in as many words.

## SEO rules (hard)

- Every page: unique title under 60 characters, description under 155, one H1,
  canonical, OG tags, JSON-LD. `Seo.astro` throws at build time on a violation,
  so a too-long title fails the build rather than shipping truncated.
- Breadcrumbs with `BreadcrumbList` on every inner page.
- Every page links to at least two others with descriptive anchor text.
- `LocalBusiness` JSON-LD is emitted once, on Home, from `src/data/schema.ts`.

## Motion rules (hard)

- Only the techniques in `PLAN.md` section 4b. CSS first, JS only where listed.
- Every animation has a `prefers-reduced-motion` variant, and the reduced state
  is the finished state, never a missing one.
- Animate opacity and transform only. All content is in the DOM at load.
- Layer 1 (polish) is CSS only. Layer 2 (the six signature moments) may use JS,
  lazy, under 40KB gzipped total. It currently uses about 2KB of hand-written
  rAF rather than a library, so there is headroom.
- A reveal that fades in must reach full opacity inside the first 20% of its
  range. Anything sitting at a partial opacity is unreadable and gets flagged.
- Every signature moment has a static fallback and demonstrates something the
  business actually does.
- No particles, matrix rain, glow, cursor trails, scroll-jacking, autoplay
  video, or loaders.
- Semantic HTML. Native `<details>` for accordions. Real form controls for
  anything draggable, so it is keyboard operable for free.
- Review every effect at `/dev/motion` before it goes on a page.

## Process

- One phase per PR. Run `npm run build && npm run lint:brand` before opening it.
- Copy is drafted for Josh's edit. Mark drafts with
  `<!-- DRAFT: needs Josh review -->`; the brand check fails on any that reach
  the built output.
- When unsure whether a claim is true, leave it out and add a TODO for Josh.
- Lighthouse must stay at 95+ on all four categories, mobile. If a change drops
  it, simplify the change, then remove it. The score wins.
