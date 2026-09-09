# Business context

Single reference so website copy and printed materials stay consistent. For solo use when drafting flyers, one-pagers, emails, and slides.

**Code sources of truth (change these first):**

| What | File |
|---|---|
| Workshop titles, prices, blurbs, consulting rates | `src/data/offers.ts` |
| Brand name, tagline, one-liner, boilerplate, contact, proof points | `src/data/contact.ts` |
| Full brand system (color, type, layout) | `docs/brand-guide.md` |

---

## 1. How to use this file

1. Need a name, price, title, contact line, or proof point? Look here first.
2. Changing an offering, price, or contact detail? Update `offers.ts` or `contact.ts`, then update this file to match.
3. Do not invent workshop titles, stats, client counts, or testimonials. If it is not here and not in those files, leave it out.
4. Print and web should use the same wording for titles, tagline, contact block, and proof points.

---

## 2. Company identity

| Form | Use |
|---|---|
| **Idea Collaborative** | Legal / formal name. Contracts, invoices, proposals, first reference in body copy, LinkedIn, domain |
| **ideacollab** (wordmark) | Visual only: flyers, slide corners, social avatars, merchandise. One lowercase word: **idea** at 700, **collab** at 300, tracking -0.02em |
| **Idea Collab** | Informal conversation and email signatures only. Never in contracts |
| Do not use | IC, IdeaCo, Idea Collaborative LLC AI |

Any external piece introduces **Idea Collaborative** on first reference. The wordmark may sit in the header of the same piece. The shortened form never replaces the full name in body copy.

Voice is **we** / the company. Do not name a founder in marketing headlines or flyer body. Founder bio exists in the brand guide for About / proposals when a personal bio is required.

---

## 3. Positioning / promise / one-liner / boilerplate

**Positioning (from brand guide):** For owners and operators of 5 to 100 person businesses in Loveland, Fort Collins, and Windsor who know AI matters but do not know where to start, Idea Collaborative is a local AI consultancy that turns AI from a headline into a working process. Unlike national training vendors and generalist IT shops, we bring 25+ years of enterprise solutions experience and stay accountable for results after the workshop ends.

**Brand promise / tagline:** Practical AI that pays for itself.

**One-liner:** Idea Collaborative helps Northern Colorado businesses put AI to work in weeks, not years.

**Boilerplate:** Idea Collaborative is a Loveland-based AI consultancy serving small and mid-sized businesses across Northern Colorado. Through hands-on workshops and practical implementation, we help owners and operators turn AI from a headline into a working process, with 25+ years of enterprise solutions experience behind every recommendation.

**Four pillars:** Practical. Local. Proven. Honest.

**Audience:** Owners, department heads, and operations managers at businesses with 5 to 100 employees. Secondary entry: realtors and small professional services firms.

**Area served (named towns):** Loveland, Fort Collins, Windsor, Greeley, Longmont.

---

## 4. Voice and non-negotiables

- Sentence case headlines (not Title Case).
- American spelling.
- No em dashes. Use a period, a comma, or a colon.
- Oxford comma: yes.
- Left-aligned body. No emoji.
- Speak as **we**. Address the reader as **you**.
- Short sentences. Concrete nouns. Claims tie to numbers, timeframes, or named examples.
- Transparent pricing when a price exists. Do not hide Level 2 / 3 behind "call for more info."
- No invented statistics, client counts, case studies, or testimonials until they are real and listed here.

### Words that carry the brand

Practical. Working. Measurable. Local. Hours saved. Monday. Weeks, not years. Show you. Right-sized. Pays for itself.

### Retired words (never use)

leverage (as a verb), robust, seamless, game-changer, disrupt, unlock, empower, journey, solutioning, best-in-class, paradigm, "in today's fast-paced world", cutting-edge, next-generation, revolutionary, AI-powered / AI-driven as filler, transform as the hero verb.

### We say / we do not say (short)

| We say | We do not say |
|---|---|
| Tools you can use Monday | Cutting-edge, next-generation, revolutionary |
| Save 5 to 10 hours a week | Unlock exponential productivity |
| Here is what it costs | Contact us for a custom quote (when a price exists) |
| This will not work for your situation | Every business needs AI |
| Northern Colorado businesses | Businesses nationwide |
| Practical AI | AI-powered, AI-driven, AI-first (as filler) |

---

## 5. Contact block

**Order never changes:** web, email, phone, city.

```
ideacollaborative.com
hello@ideacollaborative.com
(970) 286-0922
Loveland, Colorado
```

| Field | Value |
|---|---|
| Web | ideacollaborative.com |
| Web URL | https://ideacollaborative.com |
| Email | hello@ideacollaborative.com |
| Phone | (970) 286-0922 |
| City | Loveland, Colorado |
| Postal | 80537 |

---

## 6. Offerings

Titles are exact. Never paraphrase a workshop title. Change titles only in `src/data/offers.ts`, then sync this section.

### Workshops

| Level | Exact title | Short title | Slug / URL | Duration | Public | Private | One-line description |
|---|---|---|---|---|---|---|---|
| 1 | AI Essentials: Three Tools You Keep | AI Essentials | `ai-essentials` → `/workshops/ai-essentials` | 90 minutes | $129/person | $2,200 | Ninety minutes: what is real, three tools run on your work, and a 30-day action plan. For the owner who has heard about AI and wants to know what is real. Leave with three tools you can use this week. |
| 2 | AI Implementation Bootcamp | AI Implementation Bootcamp | `implementation-bootcamp` → `/workshops/implementation-bootcamp` | 4 hours | $349/person | $5,850 | Half day, hands on. Team builds workflows on real processes and leaves with something running. For the team that is ready to build. Leave with working workflows and a 90-day plan. (Recommended tier.) |
| 3 | AI Leadership Intensive | AI Leadership Intensive | `leadership-intensive` → `/workshops/leadership-intensive` | Full day | $749/person | $11,250 | Full day with decision-makers on where AI fits, cost, and how you will measure it. For leadership deciding where AI fits. Leave with a roadmap and a way to measure it. |

**Private capacity:** Level 1 up to 25; Level 2 up to 20; Level 3 up to 15.

### Consulting rates

| Label | Rate |
|---|---|
| Standard implementation | $175 to $225 per hour |
| Executive advisory | $250 to $300 per hour |
| Nonprofit rate | $125 to $150 per hour (registered nonprofits doing work in Northern Colorado) |

Two-hour minimum in person.

### Soft / free paths (CTAs)

| Label | Path |
|---|---|
| Start a conversation | `/contact` |
| Book Your Workshop | `/contact` |
| Get Your Free AI Readiness Assessment | `/ai-readiness-assessment` |
| Come to an AI Briefing Breakfast | `/ai-briefing-breakfast` |
| See our pricing | `/workshops` |
| Book the free preview (realtors) | `/realtors#book` |

One primary CTA per surface.

---

## 7. Realtor / vertical offering names

**Page label:** AI for Real Estate  
**URL:** `/realtors`

**Service framing (do not call it a compliance course):** AI review workflow session for real estate brokerages. Shared review habit and checklist for AI-written listing copy and client communication. Not legal advice; broker and attorney still decide what goes out.

**Office session names** (vertical packaging of the three workshop levels):

| Office session name | Length | Price | Notes |
|---|---|---|---|
| Sales meeting session | 90 minutes | $2,200 | About $110 an agent in a 20-agent office. Most common starting point. |
| Half-day office workshop | 4 hours | $5,850 | About $293 an agent in a 20-agent office. Recommended next step. |
| Full-day leadership session | Full day | $11,250 | For the leadership team, not the whole office. Policy and measurement. |

**Realtor CTA:** Book the free 20-minute preview (for the broker, not the agents).

Title companies and lenders may sponsor a session at the same price the office would pay. Sponsor is named at start and end; no product pitch inside the session.

---

## 8. Approved proof points only

Rotate. Do not stack all five in one piece. Do not invent others.

1. 25+ years in enterprise technology and solutions architecture
2. Digital products delivered across 25+ industries
3. Enterprise-grade methods, priced for a 20-person company
4. Based in Loveland, serving Fort Collins, Windsor, and the Front Range
5. Every workshop ends with a written 30-day action plan

There are no case studies yet. Do not imply a client roster until named clients exist.

---

## 9. Workshop title rule

1. Workshop titles live in **`src/data/offers.ts` only**. That is the place they are written down for the site.
2. Change a title, short title, slug, price, or blurb there first.
3. Immediately sync this file (section 6) and any flyer / slide masters you control.
4. Never paraphrase a title on print or web. Exact string match.

Current Level 1 approved name: **AI Essentials: Three Tools You Keep** (short: **AI Essentials**, slug: `ai-essentials`). Do not use the retired "AI Advantage" wording.
