# Idea Collaborative Website: Build Plan for Claude Code

Version 1.0 | September 2026
Inputs: current single-page site (`Idea_Collaborative_-_Practical_AI_Solutions_for_Northern_Colorado.html`), `idea-collaborative-brand-guide.md`, `logo.png`, `logo_transparent.svg`

This document is written to be dropped into a repo as `PLAN.md` and worked through phase by phase with Claude Code. Each phase ends with acceptance criteria. Do not start a phase until the prior one passes.

---

## 0. What the current site gets wrong (fix list, not a rebuild reason by itself)

The existing page is a reasonable v1. The rebuild is justified by three things it cannot do: rank for local searches (single page, no metadata, no structure), support the realtor entry vertical (no landing page for the flyer QR), and pass the brand guide's own checklist. Specific problems Claude Code must not carry forward:

| Problem | Where | Fix |
|---|---|---|
| Zero SEO metadata: no `<meta description>`, no Open Graph, no canonical, no schema, no sitemap | `<head>` | Section 6 of this plan |
| Fabricated proof: "50+ Businesses Transformed," "8hrs Avg. Weekly Time Saved," "20% Avg. Efficiency Gain," "Join 50+ Northern Colorado businesses" | About stats, contact CTA | Remove. Brand guide Section 10 says do not claim a client base until there is one. Replace with the proof points in guide Section 8 |
| Testimonial attributed to "Industry Partner" | Testimonials | Either attribute by name and company with permission, or remove. Anonymous praise reads as invented |
| Retired words: "AI revolution," "Start Your AI Journey," "Transform" as the hero verb, "AI-Powered" as filler | Hero, About, CTA | Rewrite per guide Section 7 |
| Emoji icons (🚀 💰 ⚙️ 🤝 📧 📱 📍) | Feature cards, contact | Replace with a single-weight line icon set (Lucide) in Deep Teal. The guide says "not cute" |
| Title Case headlines ("Practical AI That Pays for Itself") | Everywhere | Sentence case per guide Section 5 |
| Level 1 named without the full title | Workshops | Use exact titles from `src/data/offers.ts`: "AI Essentials: Three Tools You Keep," "AI Implementation Bootcamp," "AI Leadership Intensive" |
| Public pricing only ($129 / $349 / $749). Private pricing absent | Workshops | Show both columns. Private pricing ($2,200 / $5,850 / $11,250) is the actual sales motion |
| Level 3 promises "18-month transformation plan," "Enterprise architecture," "Competitive analysis" | Workshops | Replace with the guide's outcome language: a roadmap and a way to measure it |
| Anchor-only navigation (`/#workshops`) | Nav | Real routes. Anchor links cannot rank independently |
| Copyright 2025 | Footer | Dynamic year |
| Font not locked (system stack) | CSS | Inter, self-hosted, per guide Section 5 |

---

## 1. Goals and success criteria

**Primary goal:** a Northern Colorado business owner or managing broker who searches for AI training, AI consulting, or AI workshops in Loveland, Fort Collins, or Windsor finds this site and books a preview, a briefing, or a workshop.

**Secondary goal:** the realtor flyer's QR code lands on a page that books the free 20-minute preview in one step.

**Measurable targets for the first 90 days after launch:**
- Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO (mobile)
- Indexed in Google Search Console for all primary routes within 14 days
- Ranking on page 1 for at least two of: "AI workshop Fort Collins," "AI consultant Loveland," "AI training Northern Colorado," "AI for realtors Colorado"
- Every route has one primary CTA and a working form that delivers to hello@ideacollaborative.com

---

## 2. Stack

Chosen for SEO, speed, and a solo operator with no engineering staff.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static output) | Zero JS by default, best-in-class Lighthouse, content collections for the blog, Markdown-native so Josh can write posts in Notion and paste |
| Styling | **Tailwind CSS 4** with brand tokens in `@theme` | Enforces the palette; no ad-hoc hex values in components |
| Fonts | **Inter** (body, UI) plus **Newsreader** (display) self-hosted via `@fontsource-variable/inter` and `@fontsource-variable/newsreader`, subset to Latin | Guide v1.1 (Section 4c); self-hosting avoids Google Fonts render-blocking and a third-party request |
| Icons | **Lucide** (`lucide-astro`) | Single-weight line icons, replaces emoji |
| Forms | **Netlify Forms** (if hosted on Netlify) or **Formspree** | No backend, spam filtering included, email delivery to hello@ |
| Booking | **Cal.com** embed (free tier) or Calendly | Preview and briefing bookings without email back-and-forth |
| Hosting | **Netlify** or **Cloudflare Pages** | Free tier, global CDN, automatic HTTPS, deploy from GitHub |
| Analytics | **Plausible** (paid, privacy-first) or **Cloudflare Web Analytics** (free) | No cookie banner needed |
| Images | Astro `<Image />` with `sharp` | Automatic WebP/AVIF, responsive sizes |
| Sitemap / robots | `@astrojs/sitemap` | Generated on build |
| Repo | GitHub, `main` deploys to production, PRs get preview URLs | |

Do not use: WordPress, Wix, Squarespace, a React SPA, or any builder that emits div soup. The site must be readable as plain HTML by a crawler.

---

## 3. Repo structure

```
idea-collaborative-site/
├── CLAUDE.md                     # working rules for Claude Code (Section 10)
├── PLAN.md                       # this file
├── astro.config.mjs
├── tailwind.config / global.css  # brand tokens
├── public/
│   ├── logo.svg                  # master mark
│   ├── logo-white.svg            # reversed one-color (commission or derive)
│   ├── favicon.svg / .ico / apple-touch-icon.png
│   ├── og-default.png            # 1200x630 branded share image
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   ├── Base.astro            # <head>, SEO component, nav, footer
│   │   └── Post.astro            # blog post layout
│   ├── components/
│   │   ├── Seo.astro             # title, description, canonical, OG, Twitter, JSON-LD slot
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro            # gradient split panel
│   │   ├── TierCards.astro       # Level 1/2/3, public + private toggle
│   │   ├── ProofPoints.astro     # guide Section 8 proof points
│   │   ├── Process.astro         # Discover / Design / Deploy / Optimize
│   │   ├── CtaBand.astro         # one CTA, one contact path
│   │   ├── BookingEmbed.astro    # Cal.com
│   │   ├── ContactForm.astro
│   │   ├── FaqAccordion.astro    # emits FAQPage schema
│   │   └── Icon.astro
│   ├── content/
│   │   ├── config.ts             # collection schemas
│   │   ├── posts/                # blog markdown
│   │   └── faqs/                 # per-page FAQ markdown
│   ├── data/
│   │   ├── offers.ts             # single source of truth for tier names, durations, prices
│   │   ├── contact.ts            # web, email, phone, city (guide order)
│   │   └── schema.ts             # LocalBusiness base JSON-LD
│   └── pages/
│       ├── index.astro
│       ├── workshops/index.astro
│       ├── workshops/ai-essentials.astro
│       ├── workshops/implementation-bootcamp.astro
│       ├── workshops/leadership-intensive.astro
│       ├── consulting.astro
│       ├── realtors.astro        # flyer QR target
│       ├── about.astro
│       ├── ai-readiness-assessment.astro
│       ├── ai-briefing-breakfast.astro
│       ├── contact.astro
│       ├── blog/index.astro
│       ├── blog/[slug].astro
│       ├── privacy.astro
│       ├── thanks.astro          # form success, conversion event
│       └── 404.astro
└── scripts/
    └── og-image.ts               # optional: generate per-post OG images
```

---

## 4. Brand implementation (non-negotiable tokens)

Encode the guide once in `global.css` and forbid raw hex anywhere else.

```css
@theme {
  --color-navy: #1C3E54;
  --color-teal: #3C8E8E;
  --color-teal-deep: #2C6671;
  --color-ink: #0F2836;
  --color-teal-light: #7FC5C5;
  --color-teal-pale: #A8DADA;
  --color-mist: #E6F2F2;
  --color-cloud: #F4F7F8;
  --color-slate: #4F5D68;
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-display: 'Newsreader Variable', Georgia, serif;
}
.display-xl { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.035em; line-height: 1.02; font-size: clamp(2.6rem, 6.2vw, 5rem); }
.display-lg { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.03em; line-height: 1.08; font-size: clamp(2.1rem, 4.2vw, 3.25rem); }
.display-md { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.02em; line-height: 1.15; font-size: clamp(1.5rem, 2.4vw, 2rem); }
.display-xl em, .display-lg em, .display-md em { font-style: italic; }
.bg-signature { background: linear-gradient(135deg, #1C3E54 0%, #2C6671 55%, #3C8E8E 100%); }
```

Rules Claude Code enforces in every component:
- Body text on white is Navy or Slate. Never Signal Teal on white (fails AA). Teal-toned text on white uses Deep Teal.
- Never navy text on teal or teal text on navy.
- Two-color logo mark only on white, Cloud, or Mist backgrounds. On Ink, navy, gradient, or photography, use `logo-white.svg`. The site is dark-first (Section 4c), so the white version is a Phase 1 deliverable, not a nice-to-have.
- Wordmark: `idea` weight 700, `collab` weight 300, one word, lowercase, tracking -0.02em. On light: idea Navy, collab Deep Teal. On dark: idea White, collab Teal Light.
- Display headings in the serif scale above (`display-xl` for hero H1, `display-lg` for section H2, `display-md` for H3), one `<em>` italic word per headline, never more. Body, small, and label sizes from guide Section 5 in Inter.
- Sentence case headlines. Left-aligned body. No justified text. No centered paragraphs over two lines.
- Checkmark bullets in Signal Teal for benefit lists only.
- Buttons: primary is Signal Teal fill, white 600-weight label, 8px radius, hover Deep Teal. Labels are verbs from guide Section 8.
- Color proportion roughly 60% neutral, 30% navy, 10% teal.
- No emoji anywhere.
- No em dashes in copy. Oxford comma. Numerals for countable things.

### Icon system
The current site's emoji (🚀 💰 ⚙️ 🤝 📧 📱 📍) are the single cheapest-looking thing on the page. Replace with one consistent set, used sparingly.

- **Set:** Lucide, single weight, `stroke-width: 1.75`, 24px on cards, 20px inline. Never mix sets, never use filled or duotone variants, never a second icon library.
- **Color:** Deep Teal on white, Teal Light on navy. Never Signal Teal on white (fails AA).
- **Container:** on feature cards, the icon sits in a 44px Mist circle with no border. Nowhere else does an icon get a background.
- **Mapping for the existing content:**
  - Quick implementation: `Zap` or `Timer`
  - Immediate ROI: `TrendingUp` (never a dollar sign; the brand shows real numbers, not a money icon)
  - Process automation: `Workflow`
  - Local support: `MapPin`
  - Discover / Design / Deploy / Optimize: `Search`, `PenTool`, `Rocket` is banned, use `Play`, then `RefreshCw`
  - Contact: `Mail`, `Phone`, `MapPin`
  - Fair Housing flag: `Flag`
  - Checkmarks in benefit lists stay as the brand's teal ✓ text glyph, not an icon component
- **Restraint:** a section gets icons only when every item in it has one. No icon on headlines, buttons (except a trailing `ArrowRight` on the primary CTA), or body copy.
- **Better than icons where possible:** the three proof points on Home use large numerals (25+, 25+, 30) in Display weight, not icons. A number carries the brand; an icon just decorates.
- Inline SVG via `lucide-astro`, `aria-hidden="true"`, no icon fonts.

---

## 4b. Motion, movement, and responsiveness

Two layers of motion, with different rules.

**Layer 1, ambient polish:** hovers, reveals, transitions. Quick, quiet, CSS-only. This is the floor, and it is covered in the technique inventory below.

**Layer 2, signature moments:** six deliberate, fluid, interactive moments that make a visitor stop and play for a few seconds. These are the reason someone remembers the site. Each one is tied to something the business actually does, so the delight is also a demonstration. They get real engineering effort and a real JS budget.

The brand line still holds: "the experienced operator at the table, not the evangelist on stage." So the delight is craft, not spectacle. Fluid physics, responsive gradients, things that answer the cursor and the scroll. Not neon, not particles for their own sake, not a loader.

### Principles
- **Every signature moment demonstrates something.** If the animation could be lifted onto any other company's site unchanged, it is decoration and does not ship.
- **Fluid, not bouncy.** Spring physics with high damping (Motion `type: "spring", stiffness: 120, damping: 20`), or ease-out-expo curves. Nothing overshoots more than a few pixels.
- **Interactive over autoplay.** The best moments respond to the visitor: pointer, scroll, a toggle, a slider. Autoplay is reserved for one hero entrance and one demo.
- **Everything respects `prefers-reduced-motion`.** Signature moments fall back to their final, static state. Non-negotiable.
- **Content is never hostage to motion.** Text is in the DOM at load; animation changes opacity, transform, clip-path, and gradient position. Crawlers and screen readers see the full page.
- **Budget:** Layer 1 is CSS. Layer 2 may use the Motion library (`motion`, about 5KB core, tree-shakeable) and, only for the flow line on the process section, its scroll module. Total motion JS under 40KB gzipped, lazy-loaded per moment on intersection, never in the critical path. Lighthouse stays at 95+ on mobile; if a moment cannot hit that, it is simplified until it does.

### Signature moments

| # | Moment | Where | What happens | Why it is this and not something else |
|---|---|---|---|---|
| 1 | **The mark scene** | Home, section 02, pinned | Scroll-linked. The navy loop draws first, the teal loop follows and interlocks, the bubble tail closes last. Three short lines appear in sequence beside it (Section 4c), then the mark settles into the horizontal lockup with the tagline. Scroll back and it unwinds. Motion scroll module drives `stroke-dashoffset` and the line opacity; 100vh pin on desktop, stacked and unpinned on mobile | The reference site tells the story of its name with a pinned scene; ours tells the story of the mark, which is the business in one gesture (guide Section 3). It is the only long moment on the site and it is about identity, so it earns the length |
| 2 | **Living gradient** | Home hero, `/realtors` hero, CTA bands | Layered at 25 to 35% opacity over the hero photograph and its Ink fade. Three soft radial blobs (navy, deep teal, teal) on the gradient base. They drift slowly on their own (40 to 60s cycles) and lean gently toward the pointer with heavy damping, so the surface feels like it is breathing rather than chasing the cursor. On touch, they respond to scroll position instead. Implemented as layered CSS radial-gradients with `@property` custom properties, positions updated by a 20-line rAF loop; no WebGL | It makes the brand's most recognizable surface feel alive instead of flat, and it is the whole "AI" mood the site needs. Any AI site that needs to say "AI" with visuals has failed at copy |
| 3 | **Before and after slider** | Home (below hero), `/consulting` | A draggable divider over a real business artifact: the left side is the manual version (a listing description with four flagged phrases, or a 40-line Monday morning to-do list), the right side is the AI-assisted version (clean copy, the three tasks that remain). Drag with pointer or finger, snaps softly, keyboard accessible with arrow keys. The divider handle is the logo's speech-bubble tail | "Show you how" is the brand's verb. A slider is the most direct way a visitor can feel the difference themselves, in two seconds, with their own hand |
| 4 | **The listing demo** | `/realtors` | An AI-written listing types in (CSS `steps()` clip reveal, 2s). Pause. The four Fair Housing phrases receive their teal underline one at a time, each with a soft 4px lift and settle. The "4 phrases a complaint could cite" badge scales in from 0.9 with a spring. A "See it again" control replays it. Then a toggle: "Show the rewrite" crossfades to the clean version, with the four phrases morphing (via View Transitions `transition:name` on each span) into their neutral replacements | This is the product. A broker who watches this once understands the workshop better than any paragraph could |
| 5 | **The flow line** | Home process section, workshop pages | Discover, Design, Deploy, Optimize sit along a curved SVG path that draws itself as the visitor scrolls (scroll-linked `stroke-dashoffset`, Motion scroll module). Each step's card lifts and its icon settles in as the line reaches it. Scroll back and it retracts. The line is the loop from the mark, unwound | The process is the differentiator against training vendors who deliver a deck and leave. A line the visitor pulls through the steps makes it feel like a path they are already on |
| 6 | **The hours-back calculator** | `/ai-readiness-assessment`, also as a compact module on Home | Two sliders: team size (1 to 100) and hours per person per week on repetitive tasks (1 to 20). A large number counts up fluidly as they drag (Motion `animate` on a numeric value, tabular figures): hours back per month, and what that is worth at a rate they can edit. The number's color shifts from Slate to Deep Teal as it grows. Below it, one line: "Here is what it costs" with the workshop that fits, updating live. Ends in the assessment CTA | "Practical AI that pays for itself" is a payback claim. This is the payback math, in the visitor's own numbers, with their hand on the slider. It also converts: the CTA is the natural next tap |

Two smaller touches that belong to the brand:
- **Tier cards tilt** 3 degrees toward the pointer with a soft specular highlight that follows it (CSS perspective, `transform` via pointer position, damped). On the recommended tier only, so it reads as emphasis, not gimmick.
- **The scroll progress indicator** on blog posts is the logo loop filling, navy then teal, in the nav, instead of a bar.

### What is explicitly out
Particle fields, matrix rain, glowing orbs, cursor trails, scroll-jacking, horizontal scroll sections, autoplay video, full-screen loaders, 3D product spins, and anything that moves text while someone is trying to read it. Motion that would look at home on a crypto landing page does not belong here.

### Technique inventory (use these, nothing else without a reason in the PR)

| Effect | Where | Technique |
|---|---|---|
| Page-to-page transitions | Every navigation | Astro `<ClientRouter />` (View Transitions API). Cross-fade body, `transition:name` on the wordmark and nav so they persist. Falls back to a normal load in unsupported browsers |
| Section reveal on scroll | Proof points, tier cards, process steps, blog cards | CSS scroll-driven animations: `animation-timeline: view()` with `animation-range: entry 0% entry 40%`. Fade up 16px, stagger children via `--i` custom property and `animation-delay: calc(var(--i) * 60ms)`. Fallback for browsers without `animation-timeline`: content simply visible |
| Hero headline entrance | Home, `/realtors` | `@starting-style` opacity and translate on the H1, sub, and CTA group, 80ms stagger. Runs once on load, no JS |
| Gradient life in the hero | Home, `/realtors`, CTA band | Slow CSS `background-position` drift on the signature gradient (60s, linear, alternate) at low amplitude, or a second gradient layer at 8% opacity with `mix-blend-mode: soft-light`. Disabled under reduced motion. Not a particle field, not a video |
| Flagged listing demo | `/realtors` | The AI-written listing types in with a CSS `steps()` clip-path reveal (2s), then the four flagged phrases receive their teal underline one at a time (150ms stagger) and the "4 phrases a complaint could cite" badge fades in. Pure CSS with `animation-delay`. Replayable via a small "See it again" button that toggles a class. This is the one place the site is allowed to perform, because it demonstrates the product |
| Number counters | The three stats on `/realtors` ($110, 1, 0) | CSS `@property --n` with `counter-reset` and `content: counter(n)`, animated on view. No JS. Reduced motion shows the final value |
| Tier card hover | Workshop and realtor tiers | `translateY(-4px)` plus shadow from Mist to a soft navy at 8% opacity, 200ms. Border to Signal Teal on the recommended tier |
| Button hover and press | All primary buttons | Fill Signal Teal to Deep Teal 150ms; `scale(0.98)` on `:active`. Focus ring Teal Light 2px offset for keyboard users |
| Nav on scroll | All pages | Nav starts transparent over the hero, gains white background and a 1px Mist border after 24px scroll. `IntersectionObserver` on a 1px sentinel above the hero, 10 lines of JS. Mobile nav is a `<dialog>` that slides in from the right, 250ms |
| FAQ accordion | Workshops, `/realtors` | Native `<details>`; animate open height with `interpolate-size: allow-keywords` and `transition: height 250ms` where supported, instant elsewhere |
| Form feedback | All forms | Submit button shows an inline spinner (CSS), success state replaces the form with a check icon drawn via SVG `stroke-dashoffset` over 400ms |
| Link underline | Body links | Underline grows from left on hover via `background-size` transition, 200ms |
| Images | Blog, About | Blur-up placeholder from Astro's `<Image />` with a 300ms opacity fade on load |

### Responsiveness

- **Mobile-first, three breakpoints:** base (360 to 639px), `md` 640px, `lg` 1024px, `xl` 1280px. Design at 390px and 1440px; test the in-betweens.
- **Fluid type:** every size in the type scale is a `clamp()` between its mobile and desktop value, e.g. Display `clamp(2rem, 1.2rem + 3.5vw, 2.5rem)`. No breakpoint jumps in type.
- **Container queries** for components that live in different widths: `TierCards` stack in a narrow container and go three-across in a wide one, regardless of viewport. `@container (min-width: 40rem)`.
- **The split panel** (gradient left, white right) becomes stacked on mobile: gradient hero on top, white proof panel below. The QR code is dropped on mobile and replaced with a tap-to-book button, since nobody scans their own screen.
- **Touch targets** 44px minimum. Hover-only affordances always have a visible non-hover state.
- **Sticky mobile CTA** on `/realtors` and workshop pages: a bottom bar with the single primary action appears after the hero scrolls out, hides when the booking embed is in view.
- **Booking embed** loads lazily on intersection, never above the fold cost on mobile.
- **Test matrix:** iPhone SE, iPhone 15, Pixel 8, iPad portrait, 1366 laptop, 1920 desktop. Safari and Chrome. Every route.

### Guardrails
- Layer 1 stays CSS-only. Layer 2 uses Motion only, lazy-loaded, within the 40KB budget.
- If a Lighthouse run drops below 95 after adding a moment, the moment is simplified, then removed if it still fails. The score wins.
- Each signature moment is built as an isolated component with a static fallback and reviewed at `/dev/motion` before it is placed on a page.
- Every animated component has a Storybook-style demo page at `/dev/motion` (noindex, excluded from sitemap) so Josh can review each effect in isolation before it ships.

---

## 4c. Design direction: editorial, dark-first, photographic

Reference: vardefi.com (Varde Financial, Loveland). Adopt its grammar, not its clothes. What makes that site work is four decisions, and each one needs an Idea Collaborative equivalent rather than a copy.

| What the reference does | Why it works | Idea Collaborative equivalent |
|---|---|---|
| Dark "basalt" surfaces with pale "glacier" text, light sections used sparingly as relief | Confidence. Dark reads as established, not startup | Dark-first on **Ink** `#0F2836` and **Deep Navy** `#1C3E54`, text in **Cloud** `#F4F7F8`. Light sections in Cloud/Mist for pricing and process. This inverts the guide's 60/30/10 proportion on the web only: roughly 55% navy/ink, 35% neutral, 10% teal. Print stays as the guide specifies |
| Editorial serif display (Fraunces, weight 500, tight tracking) with one italic word per headline | The italic word is where the voice lives. It turns a headline into a sentence someone said | Add a display serif to the brand. **Not Fraunces**, which is the reference's signature. Candidates: **Instrument Serif** (sharper, more modern), **Newsreader** (warmer, closer to Fraunces without copying it), or **Source Serif 4** (quietest). Recommendation: Newsreader at 500, italic for the one emphasized word. Inter stays for body, labels, and UI. This is a guide amendment; see the list at the end of this section |
| Numbered chapters: "01 / Loveland, Colorado", "02 / The name", small caps label above every section | Turns a landing page into a document with a spine. The reader always knows where they are | Same device. Home runs 01 through 06: 01 / Northern Colorado, 02 / The mark, 03 / Who we work with, 04 / What we decided on purpose, 05 / Pricing, 06 / Next step. Label in Inter 12px, tracking 0.08em, Teal Light on dark, Deep Teal on light (guide Label style) |
| Full-bleed landscape photography (basalt coast, fjord, cairn) in one consistent mood, with gradient fades into the dark surface | Photography carries emotion the copy does not have to. One mood across every image makes it feel curated, not stock | **Front Range photography, blue hour and overcast**: Devil's Backbone, Horsetooth, the Big Thompson, the foothills from Loveland at dawn. Same cool, desaturated grade, tinted toward navy so it sits inside the palette. Never a sunset, never golden hour, never a person at a laptop. Commission or license 6 to 8 images; do not use free stock, it will be recognized. Every image fades into Ink via a gradient so type never sits on a busy area |
| A pinned scroll scene that tells the story of the name (the cairn stacks as you scroll) | The one moment of theater, and it is about identity, so it earns its length | The **mark scene**: the two loops draw and interlock as you scroll, with three short lines. "Most AI advice is a lecture." "Ours is a loop: you show us the work, we build the tool, you run it, we adjust." "That loop is the mark." Then it resolves into the wordmark. Replaces signature moment 1 below |
| Stat band with oversized numerals (EA, 100%, $0, 1) | Proof in numbers, no icons | Already in the plan: 25+, 25+, 30 in display serif. Add "0 software to buy" and "$0 surprise scope" once pricing pages exist |
| Published pricing with "Most firms won't" | Transparency as the differentiator | Same posture, already in the guide. Headline for 05: "We publish our prices. Most AI consultants won't." |
| Nav transparent over dark hero, blurred surface after scroll; "Start a conversation" as the persistent CTA | Calm, unfussy | Same. Primary CTA text becomes "Start a conversation" site-wide, with "Book Your Workshop" as the button on workshop pages only |
| Copper accent, used once or twice per screen | One warm note against the cool palette | Signal Teal already plays this role. Do not add copper; two accents would break the palette. Teal stays at 10% |
| Aurora-drift gradient animations, page-enter fade, caret blink on the hero line | Ambient life without spectacle | Maps directly to signature moment 2 (living gradient), now layered over the hero photograph at low opacity |

### Home, section by section (replaces the Section 5.1 sequence)

**01 / Northern Colorado. Hero.** Full-bleed foothills photograph at blue hour, fading to Ink at the bottom. Display serif headline, one italic word: "Practical AI that *pays for itself*." Sub in Inter: the guide one-liner. Two CTAs: "Start a conversation" (teal fill) and "See our pricing" (ghost). Keep-scrolling cue at the bottom edge.

**02 / The mark. Pinned scene.** Dark. The loops draw in as you scroll; three lines appear in sequence; resolves to the wordmark and "Practical AI that pays for itself." This is the identity moment. 100vh pinned on desktop, unpinned and stacked on mobile.

**03 / Who we work with.** Light (Cloud). "People *building* something real, with no time to become technical." Four rows, not cards: Owners and operators of 5 to 100 person businesses. Managing brokers and real estate teams. Professional services firms. Nonprofits. One line each, in the guide's plain voice.

**04 / What we decided on purpose.** Dark, with the second photograph behind at 30% and a fade. "Four things we *decided* on purpose." 01 Practical: every session ends with something you use Monday. 02 Local: a neighbor, not a vendor. 03 Proven: 25 years, 25 industries, stated plainly. 04 Honest: we will tell you when AI is not the answer. Then the numeral band.

**05 / Pricing.** Light. "We *publish* our prices. Most AI consultants won't." Three numbers with the tier names beneath, link to the full pricing page. The hours-back calculator (signature moment 6) sits here as a compact module.

**06 / Next step.** Dark, third photograph. "Let's find your *first* workflow." Short form, or the booking embed. Full contact block.

Footer: dark, wordmark, tagline, site links, contact in guide order, dynamic year.

### Interior pages
Same grammar, lighter weight. Interior heroes are a dark band with the chapter label, serif H1, and one italic word, no photograph except on `/about` and `/realtors`. Body sections alternate Cloud and white. `/realtors` keeps its own hero photograph (a Front Range neighborhood at dusk, no house numbers, no people) because it is a standalone landing page.

### Brand guide amendments this direction requires
Record these in the guide as v1.1 before the build starts, so the site and the guide do not disagree.

1. **Display serif added:** Newsreader (or the chosen alternative) weight 500, italic for emphasis, web display type only. Inter remains for everything else and for all print.
2. **Dark-first on the web:** Ink and Deep Navy as primary surfaces; color proportion on the web becomes ~55% navy/ink, 35% neutral, 10% teal.
3. **Photography added:** Front Range landscapes, blue hour and overcast, cool grade, no people, no golden hour. Always with a gradient fade to Ink where type sits.
4. **Chapter numbering** as a standing layout device on long pages.
5. **Reversed white logo** is now required, not optional, since the mark sits on dark surfaces throughout.
6. **Primary CTA wording:** "Start a conversation" joins the approved list.

Nothing else in the guide changes. Colors, wordmark treatment, voice, and the retired-words list all hold.


---

## 5. Site map and page specs

Every page: one H1, one primary CTA, `Seo` component with unique title (under 60 chars) and description (under 155 chars), breadcrumb schema on inner pages, internal links to at least two other routes.

### 5.1 `/` Home

**Title:** Practical AI workshops and consulting in Northern Colorado | Idea Collaborative
**H1:** Practical AI that pays for itself.
**Hero sub:** Idea Collaborative helps Northern Colorado businesses put AI to work in weeks, not years. (guide one-liner)
**Primary CTA:** Start a conversation. **Secondary:** See our pricing. Workshop pages use Book Your Workshop.

Sections: see Section 4c for the six-chapter sequence, which supersedes the list below. Kept for the content each chapter must carry.
1. Hero: photograph with Ink fade and living gradient, headline left, a short benefit list (max four, guide pattern: verb, outcome, timeframe), CTA pair. Right side: a white panel with the three proof points from guide Section 8 (rotate, never all five).
2. Who this is for: three short cards. Owners and operators of 5 to 100 person businesses. Managing brokers and real estate teams (links to `/realtors`). Professional services firms.
3. Three workshops: `TierCards` with public and private pricing, exact titles, outcome descriptions from guide Section 8. Link each to its page.
4. How we work: Discover, Design, Deploy, Optimize, rewritten in guide voice. Keep the four-step structure from the current site; it is good.
5. The honest line: a single pull quote in the brand's voice. "AI will not fix a broken process. It will make a broken process faster." (guide Section 7)
6. Latest from the blog: three most recent posts.
7. CTA band: Book Your Workshop, with the full contact block.

Schema: `LocalBusiness` (or `ProfessionalService`) with name, URL, telephone, email, address locality Loveland CO, `areaServed` Loveland, Fort Collins, Windsor, Greeley, Longmont, Front Range; `founder` Person Joshua Scott; `sameAs` LinkedIn.

### 5.2 `/workshops` Index

**Title:** AI workshops for Northern Colorado businesses: three levels | Idea Collaborative
**H1:** Three workshops. Pick where your business actually is.
Full tier comparison, public vs private, who each level is for, what they leave with. FAQ accordion (emits `FAQPage` schema): "Do you come to us?", "What tools do we need?", "Is this a software pitch?", "Do you offer CE credit?" (answer honestly: not yet).

### 5.3 `/workshops/ai-essentials`, `/workshops/implementation-bootcamp`, `/workshops/leadership-intensive`

One page per level so each can rank on its own long-tail terms. Each page:
- H1 is the exact workshop title
- Who it is for and what they leave with (guide Section 8 outcome language)
- Agenda by time block
- Public and private pricing, capacity, duration
- Next public date if scheduled; otherwise "Private sessions scheduled on request"
- `Event` schema when a public date exists; `Service` schema otherwise
- Booking embed or contact form
- Related: the other two levels, and `/consulting`

### 5.4 `/consulting`

**Title:** AI consulting and implementation for small businesses in Loveland and Fort Collins
**H1:** When the workshop is not enough.
Standard rate $175 to $225/hour, executive advisory $250 to $300/hour, nonprofit $125 to $150/hour, two-hour minimum in person (guide Section 8). Explain the engagement shapes: post-workshop implementation, process automation build, fractional AI advisory. Transparent pricing is a stated differentiator; put the numbers on the page.

### 5.5 `/realtors` (flyer QR target)

This page has exactly one job: book the free 20-minute sales-meeting preview.

**Title:** AI for real estate brokerages in Northern Colorado: free sales-meeting preview
**H1:** Your agents already use AI. Nobody is checking the output.
Content mirrors the v6 flyer: the flagged-listing demo (rendered as an HTML component, not an image, so the text is crawlable), the three numbers ($110 an agent, 1 shared system, 0 new software), the HUD May 2024 line, the three-level office pricing, the "our terms" guarantee, and the broker FAQ. Booking embed above the fold on mobile. Sponsor line for title companies and lenders with its own short form ("Sponsor a session").

No mention of anyone's name, per the current flyer. Fair Housing language sells the skill, never a compliance pass or guarantee. Include a one-line disclaimer that the workshop teaches a review workflow and is not legal advice.

Schema: `Service` with `audience` Real estate brokerages, `areaServed` Northern Colorado.

### 5.6 `/about`

**H1:** A neighbor, not a vendor.
Founder bio from guide Section 8 (75 words) with a real photo. The four pillars (Practical, Local, Proven, Honest). How faith shows up: per guide Section 7, it does not appear in copy; it shows up in transparent pricing, honest scoping, and follow-through. Do not write a faith paragraph.

Remove all invented statistics. Use only the five proof points from guide Section 8. When the first three case studies exist, add a Results section here.

### 5.7 `/ai-readiness-assessment`

The secondary CTA. A short form (business, size, biggest time sink, what they have tried) that delivers a written assessment by email within two business days. This is the lead magnet; it is "the voice made operational" (guide Section 7). Thank-you page fires the conversion event.

### 5.8 `/ai-briefing-breakfast`

The soft CTA. Next date, venue, what is covered, registration form. `Event` schema. When no date is scheduled, show "Join the list for the next one."

### 5.9 `/contact`

Contact block in guide order (web, email, phone, city), a short form, the booking embed, and a map embed for Loveland only if it does not hurt performance (lazy-load or link out).

### 5.10 `/blog` and `/blog/[slug]`

The SEO engine. Content collection with frontmatter: title, description, date, updated, tags, ogImage. Post layout emits `Article` schema with author Joshua Scott. Follow the guide's LinkedIn post pattern: open with a real scenario, before and after with a number, name the tool, one takeaway the reader can act on without hiring anyone. 400 to 700 words. Seed the collection with eight posts before launch (Section 7).

### 5.11 `/privacy`, `/thanks`, `/404`

Standard. `/thanks` is noindex.

---

## 6. SEO implementation

### On-page
- `Seo.astro` renders: `<title>`, meta description, canonical, `og:title/description/image/url/type`, `twitter:card`, and a JSON-LD slot. Every page passes its own values; no defaults leak into production.
- One H1 per page, H2 for sections, H3 within. No skipped levels.
- Descriptive alt text on every image. Decorative images get `alt=""`.
- Internal linking: every page links to at least two others with descriptive anchor text ("AI Implementation Bootcamp," not "click here").
- Breadcrumbs on every inner page with `BreadcrumbList` schema.
- URL slugs: lowercase, hyphenated, no dates, no trailing slashes (configure `trailingSlash: 'never'`).

### Local SEO
- `LocalBusiness` JSON-LD on Home with NAP identical to Google Business Profile.
- City names in copy where natural: Loveland, Fort Collins, Windsor, Greeley, Longmont. Do not create thin per-city doorway pages; write one strong service page and let the blog carry city-specific scenarios.
- Google Business Profile: create or claim, category "Business management consultant" plus "Training centre" or closest available, service area set to the five cities, link to `/`, post the briefing breakfast and workshop dates as GBP events. This is outside the codebase but it is the single highest-leverage local SEO action. Put it in the launch checklist.
- Get listed with the Loveland Chamber, Fort Collins Chamber, and NoCo tech and business directories. Each is a local backlink.

### Technical
- Static output, no client JS except the booking embed, the mobile nav toggle, and the FAQ accordion (use native `<details>` so it works without JS).
- Images through Astro `<Image />`, WebP, explicit width and height, `loading="lazy"` below the fold.
- Self-hosted Inter with `font-display: swap`, subset to Latin.
- `@astrojs/sitemap` with `/thanks` and `/404` excluded. `robots.txt` allows all, references the sitemap.
- Security headers via `netlify.toml` or `_headers`: HSTS, X-Content-Type-Options, Referrer-Policy, a CSP that allows the booking and analytics origins only.
- 301 redirects from every old anchor (`/#workshops`, `/#about`, `/#process`, `/#contact`) to the new routes, in case any are bookmarked or linked.
- Lighthouse CI in GitHub Actions on every PR, fail under 90 on any category.

### Measurement
- Search Console verified, sitemap submitted at launch.
- Analytics goals: preview booked, assessment requested, workshop booked, contact form sent.
- UTM convention for print: flyer QR points to `/realtors?utm_source=flyer&utm_medium=print&utm_campaign=realtor-2026`. Regenerate the QR code once this URL is live.

---

## 7. Content to write before launch

Claude Code drafts, Josh edits, nothing publishes in Josh's voice without his pass.

**Pages:** all copy in Section 5, written against the guide's "We say / we do not say" table and the retired-words list. Run the pre-publish checklist (guide Section 11) on every page.

**Blog seed (eight posts, 400 to 700 words each):**
1. The three ways AI has already cost real estate agents money
2. What HUD's May 2024 guidance means for AI-written listing copy
3. AI will not fix a broken process. It will make a broken process faster.
4. Five to ten hours a week: where the time actually comes from
5. How a 20-person Fort Collins company should choose its first AI workflow
6. The prompt library your business should own (and why every employee has a private one)
7. What a 30-day AI action plan looks like
8. Practical AI for professional services firms: three workflows that pay for themselves

Each post ends with one CTA. Alternate between the assessment and the briefing breakfast.

**Assets:**
- Founder photo, environmental, in Loveland, not a headshot on gray.
- Six to eight Front Range landscape photographs, blue hour or overcast, cool grade, no people (Section 4c). Commissioned or licensed, not free stock. Deliver at 2400px wide, graded consistently before they enter the repo.
- Reversed white logo (commission or derive cleanly from the SVG; the guide lists it as still needed).
- Favicon set from the mark.
- Default OG image (1200x630): gradient, wordmark, tagline.
- Per-page OG images for the three workshops and `/realtors`.

---

## 8. Build phases

Each phase is one or more Claude Code sessions. Commit at the end of each. Do not skip acceptance.

### Phase 1: Foundation (1 session)
- Scaffold Astro 5 + Tailwind 4 + sitemap + fontsource Inter + lucide.
- `global.css` with brand tokens, fluid type scale, motion tokens (durations, easing, reduced-motion reset), and the scroll-reveal utilities from Section 4b.
- `data/offers.ts`, `data/contact.ts`.
- `<ClientRouter />` view transitions wired in `Base.astro`.
- Display serif and chapter-label components; dark-first surface tokens; photograph component with the Ink fade.
- `logo-white.svg` produced cleanly from the master SVG.
- `/dev/motion` demo page with every Layer 1 effect and stubs for the six signature moments.
- `Base.astro`, `Seo.astro`, `Nav.astro`, `Footer.astro`.
- Deploy pipeline: GitHub → Netlify, preview URLs on PRs.
- **Accept when:** a placeholder Home deploys over HTTPS with correct fonts, wordmark, nav, footer, and a passing Lighthouse run; `/dev/motion` shows every effect working and every effect disabled under `prefers-reduced-motion`; page transitions cross-fade between two placeholder routes.

### Phase 2: Core pages (2 sessions)
- Home, Workshops index, three workshop pages, Consulting, About, Contact.
- `TierCards`, `ProofPoints`, `Process`, `CtaBand`, `ContactForm`, `FaqAccordion`.
- Forms delivering to hello@ideacollaborative.com with a `/thanks` redirect.
- **Accept when:** every page has unique title, description, H1, schema, and a working CTA; no raw hex in components; no emoji; no retired words (grep the list); Lighthouse 95+ mobile on every page.

### Phase 2b: Signature moments (2 sessions)
- Build moments 1, 2, 3, 5, and 6 as isolated components with static fallbacks, reviewed at `/dev/motion` on a phone and a laptop.
- Place them on Home, `/consulting`, and `/ai-readiness-assessment`.
- **Accept when:** each moment works with pointer, touch, and keyboard; each falls back cleanly under reduced motion; Lighthouse mobile stays 95+ on Home with all moments live; total motion JS under 40KB gzipped.

### Phase 3: Realtor landing page and booking (1 session)
- `/realtors` per Section 5.5 with signature moment 4 (the listing demo, including the rewrite morph), moment 2 in the hero, and the booking embed.
- Sponsor form.
- UTM-tagged URL live; regenerate flyer QR.
- **Accept when:** a phone user can reach the booking embed within one scroll; the flagged listing text is present in the HTML source; the listing demo animation plays once on view and replays from the button; the sticky mobile CTA appears and hides correctly.

### Phase 4: Blog and lead magnets (1 to 2 sessions)
- Content collections, post layout, `Article` schema, RSS feed.
- Eight seed posts drafted for Josh's edit.
- `/ai-readiness-assessment` and `/ai-briefing-breakfast`.
- **Accept when:** posts render from Markdown with correct schema; RSS validates; assessment form delivers.

### Phase 5: Launch hardening (1 session)
- Redirects from old anchors, security headers, 404, privacy.
- Lighthouse CI in Actions.
- Search Console, sitemap submission, analytics goals.
- Run the brand guide pre-publish checklist on every route.
- **Accept when:** Search Console shows the sitemap accepted; all goals fire in analytics; Lighthouse CI green.

### Phase 6: Post-launch (ongoing, not a build phase)
- Google Business Profile live and linked.
- Chamber and directory listings.
- Two posts a month.
- After the first paid workshop: replace the About proof points with a named case study and a real testimonial with permission.

---

## 9. Launch checklist

- [ ] Every page passes the brand guide Section 11 checklist
- [ ] No invented statistics anywhere (grep for "50+", "Businesses Transformed", "Avg.")
- [ ] Testimonial either attributed with permission or removed
- [ ] Workshop titles match guide Section 8 word for word
- [ ] Contact block in guide order on every page that shows it
- [ ] Public and private pricing both shown; consulting rates shown
- [ ] Two-color logo never on Ink, navy, gradient, or photography
- [ ] Brand guide v1.1 amendments (Section 4c) recorded before launch
- [ ] Lighthouse 95+ mobile, all routes
- [ ] Every route reviewed with `prefers-reduced-motion: reduce` enabled
- [ ] Test matrix from Section 4b passed (six devices, two browsers)
- [ ] Sitemap submitted, robots.txt correct
- [ ] Old anchors redirect
- [ ] Forms tested end to end from a phone
- [ ] Flyer QR regenerated to the UTM-tagged `/realtors` URL and re-printed
- [ ] Google Business Profile created with matching NAP
- [ ] Domain email (hello@) deliverability verified with SPF, DKIM, DMARC

---

## 10. `CLAUDE.md` for the repo

Paste this into the repo root so every Claude Code session starts with the rules.

```markdown
# Idea Collaborative site: working rules

Read `PLAN.md` and `brand-guide.md` before touching anything.

## Stack
Astro 5, Tailwind 4, self-hosted Inter and Newsreader, Lucide icons, Motion (lazy), Netlify Forms, Cal.com embed, static output.

## Brand rules (hard)
- Colors only from the tokens in global.css. Never a raw hex in a component.
- No Signal Teal text on white. No navy on teal. No teal on navy.
- Two-color logo only on white/cloud/mist. White logo on gradient/navy.
- Wordmark: idea (700) + collab (300), lowercase, one word.
- Dark-first: Ink and Deep Navy surfaces, Cloud text. Display headlines in Newsreader 500 with exactly one italic word. Chapter labels on long pages. Photography only from the approved set, always with an Ink fade under type.
- Sentence case headlines. Left-aligned body. No emoji. No em dashes.
- Retired words (never use): leverage (verb), robust, seamless, game-changer, disrupt, unlock, empower, journey, solutioning, best-in-class, paradigm, "in today's fast-paced world", cutting-edge, next-generation, revolutionary, AI-powered/AI-driven as filler.
- Workshop titles exactly: "AI Essentials: Three Tools You Keep", "AI Implementation Bootcamp", "AI Leadership Intensive".
- Contact block order: web, email, phone, city. Never reorder.
- No invented statistics, client counts, or testimonials. Only the five proof points in brand-guide Section 8.

## SEO rules (hard)
- Every page: unique title <60 chars, description <155 chars, one H1, canonical, OG tags, JSON-LD.

## Motion rules (hard)
- Only techniques listed in PLAN.md Section 4b. CSS first; JS only where listed.
- Every animation has a `prefers-reduced-motion` variant.
- Animate opacity and transform only. Content is in the DOM at load.
- Layer 1 (polish) is CSS-only. Layer 2 (six signature moments in PLAN.md 4b) may use the Motion library, lazy-loaded, 40KB gzipped total.
- Every signature moment has a static fallback and demonstrates something the business does.
- No particles, matrix rain, glow, cursor trails, scroll-jacking, autoplay video, or loaders.
- Semantic HTML. Native <details> for accordions. No client JS unless listed in PLAN.md.
- Images via Astro <Image /> with alt text and dimensions.

## Process
- One phase per PR. Run `npm run build` and Lighthouse before opening a PR.
- Copy is drafted for Josh's edit. Mark drafts with a `<!-- DRAFT: needs Josh review -->` comment; the build fails if any remain on main.
- When unsure whether a claim is true, leave it out and add a TODO for Josh.
```

---

## 11. Opening prompt for the first Claude Code session

> Read PLAN.md, CLAUDE.md, and brand-guide.md. Execute Phase 1 only. Scaffold the Astro project as specified, encode the brand tokens and type scale, build Base, Seo, Nav, and Footer, wire the Netlify deploy, and put up a placeholder Home that uses the signature gradient hero with the correct wordmark treatment. Stop at the Phase 1 acceptance criteria and report what passed and what did not. Do not write marketing copy yet.
