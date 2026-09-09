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
2. Changing an offering, price, or contact detail? Update `offers.ts` or `contact.ts`, then update this file (including the detailed descriptions in section 6) to match.
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
| 1 | AI Essentials: Three Capabilities You Keep | AI Essentials | `ai-essentials` → `/workshops/ai-essentials` | 90 minutes | $129/person | $2,200 | Ninety minutes: what is real, three capabilities run on your work, and a 30-day action plan. For the owner who has heard about AI and wants to know what is real. Leave with three capabilities you can use this week. |
| 2 | AI Implementation Bootcamp | AI Implementation Bootcamp | `implementation-bootcamp` → `/workshops/implementation-bootcamp` | 4 hours | $349/person | $5,850 | Half day, hands on. Team builds workflows on real processes and leaves with something running. For the team that is ready to build. Leave with working workflows and a 90-day plan. (Recommended tier.) |
| 3 | AI Leadership Intensive | AI Leadership Intensive | `leadership-intensive` → `/workshops/leadership-intensive` | Full day | $749/person | $11,250 | Full day with decision-makers on where AI fits, cost, and how you will measure it. For leadership deciding where AI fits. Leave with a roadmap and a way to measure it. |

**Private capacity:** Level 1 up to 25; Level 2 up to 20; Level 3 up to 15.

### Detailed workshop descriptions

Source: `src/data/offers.ts`. Sync blurbs, leave-with lines, and agenda headings from there.

#### Level 1 — AI Essentials: Three Capabilities You Keep

| | |
|---|---|
| **Short title** | AI Essentials |
| **URL** | `/workshops/ai-essentials` |
| **Duration / capacity** | 90 minutes; up to 25 people in a private session |
| **Pricing** | $129/person public; $2,200 private |
| **Who it is for** | The owner who has heard about AI and wants to know what is real. |
| **What they leave with** | Three capabilities you can use this week. |
| **Blurb** | Ninety minutes, no slideware marathon. We show you what these capabilities actually do on your own work, and you leave able to run three of them on Monday. |

**The three capabilities (run live on their work):** drafting, summarizing, and cleaning up messy information. These are capabilities, not named vendor products. Participants bring laptops and accounts they already have; part of the session is deciding which paid tools are worth it and which free tiers are enough.

**Agenda:**

| Time | Heading | Detail |
|---|---|---|
| 0:00 | What is real and what is marketing | A plain tour of what the current tools do well, where they fail, and how to tell the difference without a technical background. |
| 0:20 | Three capabilities, run live on your work | We take a real task from someone in the room and do it in front of everyone. Drafting, summarizing, and cleaning up messy information. |
| 0:55 | Where your hours are going | A short exercise that finds the repetitive work in your week. Most rooms surface 5 to 10 hours per person. |
| 1:15 | Your 30-day action plan | You write it, we help. One workflow, one owner, one date. You keep the prompt library we used. |

#### Level 2 — AI Implementation Bootcamp

| | |
|---|---|
| **Short title** | AI Implementation Bootcamp |
| **URL** | `/workshops/implementation-bootcamp` |
| **Duration / capacity** | 4 hours; up to 20 people in a private session |
| **Pricing** | $349/person public; $5,850 private |
| **Who it is for** | The team that is ready to build. |
| **What they leave with** | Working workflows and a 90-day plan. |
| **Blurb** | Half a day, hands on keyboards. Your team builds the workflows on your real processes, tests them, and leaves with something running rather than something planned. |
| **Flag** | Recommended tier. |

**Agenda:**

| Time | Heading | Detail |
|---|---|---|
| 0:00 | Pick the work worth automating | We map your current process on the wall and mark the steps where a tool helps and the steps where it will not. Some steps stay human. |
| 0:45 | Build the first workflow | Everyone builds. We work on your documents, your templates, and your data, not a sample dataset. |
| 2:00 | Review, break it, fix it | The review step is the part most teams skip and the part that decides whether this holds up. We build yours and practice it. |
| 3:00 | Your prompt library and your 90-day plan | You leave with a documented library your team owns, named owners for each workflow, and a written plan with dates. |

#### Level 3 — AI Leadership Intensive

| | |
|---|---|
| **Short title** | AI Leadership Intensive |
| **URL** | `/workshops/leadership-intensive` |
| **Duration / capacity** | Full day; up to 15 people in a private session |
| **Pricing** | $749/person public; $11,250 private |
| **Who it is for** | Leadership deciding where AI fits in the business. |
| **What they leave with** | A roadmap and a way to measure it. |
| **Blurb** | A full day with the people who decide. We work through where this belongs in your business, what it costs, what it saves, and how you will know whether it worked. |

**Agenda:**

| Time | Heading | Detail |
|---|---|---|
| 0:00 | Where you actually are | An honest read on your data, your processes, and your team, with the parts that are not ready named out loud. |
| 1:30 | The shortlist | We size the candidate workflows by hours saved, revenue affected, and errors reduced, then cut the list to the few worth doing first. |
| 3:00 | Cost, risk, and the parts to leave alone | What the tools cost, what your team costs, where the review burden sits, and which processes should stay exactly as they are. |
| 4:30 | The roadmap and the measures | A sequenced roadmap with owners and dates, and the small set of numbers you will watch to know whether it is working. |

### Consulting

**URL:** `/consulting`  
**Framing:** Hands-on AI implementation when a workshop is not enough. No locked retainers; work is quoted in hours. Estimates are given as a range with assumptions written down, and we call before crossing an estimate.

**Rates** (two-hour minimum in person; remote billed in the same increments with no minimum):

| Label | Rate | Detail |
|---|---|---|
| Standard implementation | $175 to $225 per hour | Building the workflow, wiring up the tools, training the person who will own it. |
| Executive advisory | $250 to $300 per hour | Working with owners and leadership on where this fits, what it costs, and what to skip. |
| Nonprofit rate | $125 to $150 per hour | For registered nonprofits doing work in Northern Colorado. |

**Engagement shapes:**

| Shape | Description | Typical size |
|---|---|---|
| Post-workshop implementation | Your team left the workshop with a plan and then the quarter happened. We come back and build the two workflows that mattered, with the person who will own them. | Usually 8 to 20 hours across a month |
| Process automation build | One process, start to finish. We map it, cut the steps that should not exist, build what is left, and hand over documentation your team can actually maintain. | Usually 20 to 60 hours across six to ten weeks |
| Fractional AI advisory | A standing half-day a month with your leadership. You bring the decisions, we bring the read on what is real, what it costs, and what to leave alone this quarter. | Monthly, cancel with 30 days notice |

**What clients can hold us to:** a written estimate with assumptions before work starts; a call before we cross an estimate; documentation the team can maintain without us; an honest answer when the right recommendation is to stop.

### Soft / free paths

| Offering | Path | Price | Description |
|---|---|---|---|
| Free AI readiness assessment | `/ai-readiness-assessment` | Free | Six questions, about four minutes. Written assessment back within two business days. No call, no pitch. Returns: where hours are likely going; one workflow worth doing first; a rough cost range whether or not they use us; what to leave alone this year. Written by a person, not generated. |
| AI Briefing Breakfast | `/ai-briefing-breakfast` | Free | An hour for Northern Colorado owners. Deliberately small. Covers what current tools do well, three common workflows, real cost (including unquoted parts), where AI is the wrong answer, and open questions. No future-of-work slides, no pitch, nothing to sign. Next date may be unset; join the list to hear first. |
| Start a conversation / Book Your Workshop | `/contact` | — | Primary contact path for paid work. |
| See our pricing | `/workshops` | — | Workshop comparison and booking path. |
| Book the free preview (realtors) | `/realtors#book` | Free | 20-minute preview for the broker, not the agents. |

One primary CTA per surface.

---

## 7. Realtor / vertical offering

**Page label:** AI for Real Estate  
**URL:** `/realtors`

**Service framing (do not call it a compliance course):** AI review workflow session for real estate brokerages. Shared review habit and checklist for AI-written listing copy and client communication. Not legal advice; broker and attorney still decide what goes out.

**Promise in plain terms:** Agents already use AI. Nobody is checking the output. A 90-minute session in the regular sales meeting gives the whole office one review workflow. Runs on tools the office already has. Zero new subscriptions required. We take no commission from any vendor.

**What agents walk out with (sales meeting session):** a one-page review checklist for AI-written copy; three prompts that work on listing descriptions, follow-up, and market updates; a short list of what not to put into these tools.

**Office session names** (vertical packaging of the three workshop levels):

| Office session name | Length | Price | Per-agent note | Description |
|---|---|---|---|---|
| Sales meeting session | 90 minutes | $2,200 | About $110 an agent in a 20-agent office | Most common starting point. Your regular sales meeting, used properly. The review workflow, three tools worth their subscription, and every agent leaves with the checklist. We arrive early so the meeting starts on time. |
| Half-day office workshop | 4 hours | $5,850 | About $293 an agent in a 20-agent office | Recommended next step. Agents build on their own listings and their own follow-up. You leave with the office prompt library and named owners for it. |
| Full-day leadership session | Full day | $11,250 | Leadership team, not the whole office | For brokerages deciding policy. What agents may use, what has to be reviewed, what gets documented, and how you will know it is being followed. |

**Realtor CTA:** Book the free 20-minute preview (for the broker, not the agents).

**Sponsorship:** Title companies and lenders may sponsor a session at the same price the office would pay. Sponsor is named at start and end; no product pitch inside the session.

**HUD / fair housing note (background only, not legal advice):** May 2024 HUD guidance on AI and automated systems in housing; listing copy still sits under the older fair housing advertising rules. A tool that writes a beautiful sentence has no idea it just stated a preference. Somebody in the office has to catch it.

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
3. Immediately sync this file (section 6 summary table and detailed descriptions) and any flyer / slide masters you control.
4. Never paraphrase a title on print or web. Exact string match.

Current Level 1 approved name: **AI Essentials: Three Capabilities You Keep** (short: **AI Essentials**, slug: `ai-essentials`). Do not use the retired "AI Advantage" wording.
