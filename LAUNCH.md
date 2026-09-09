# Launch runbook

Everything in this file is outside the codebase. The site is built and passing;
these are the steps only you can do, and the decisions only you can make.

---

## 1. Decisions I need from you

### Open brand decision 1: the primary button color

**What I changed and why.** Brand guide section 6 specifies the primary button
as a Signal Teal fill with a white label. Section 4 says, correctly, that white
on Signal Teal is 3.85:1 and only clears AA for large display type. Button
labels are 16px. Those two rules cannot both hold, and section 4 is the one that
says "these are not suggestions," so the primary fill is now **Deep Teal
`#2C6671`** at 6.47:1, hovering to Ink.

Signal Teal keeps every role where it is not carrying small white text: the
checkmarks, the recommended-tier border, the flow line, the underline in the
listing demo, rules and icon accents on dark. Teal still reads at roughly 10%
of the surface.

**Your options.** Accept it, or keep the Signal Teal fill and set every primary
button label to 18.66px bold, which is the threshold where it passes. The second
makes the buttons noticeably heavier. My recommendation is to accept.

### Open brand decision 2: the checkmark glyph

The brand's teal ✓ (U+2713) does not exist in Inter and does not exist in
Newsreader. It never has, which means the flyer's checkmark has always come from
whatever symbol font the reader's machine falls back to. I have made that stack
explicit in `global.css` rather than leaving it to chance, so it is at least
consistent per platform.

**Your options.** Leave it (the glyph is simple enough that platform differences
are minor), or let a single inline SVG check be the exception to the no-icon
rule. `PLAN.md` currently forbids the second. Tell me which and I will make it
consistent everywhere.

### Open brand decision 3: the wordmark and the full name

Two changes, made for readability, both inside the guide as written.

**"collab" is now weight 400, not 300.** Guide section 5 allows "weight 300 or
400". At nav size 300 went thin and pale, which is exactly where the wordmark is
smallest and has to work hardest. Everything else holds: one continuous word, no
space, no separation, lowercase, -0.02em.

**The full name now sits under the wordmark** in the nav (on screens wide enough
for it) and in the footer, set as a Label: 12px-equivalent, uppercase, 0.12em
tracking. Guide section 2 says the full name introduces the brand on first
reference and the wordmark may appear in the header of the same document, and
that they coexist. This is that rule expressed as a lockup rather than as two
separate elements. Nothing here needs an amendment, but you should look at it
and confirm you like the lockup.

### Open decision 4: forms and booking

The build assumes **Netlify Forms** and **Cal.com**, per the plan's first
choices. Both are wired and both are free. Say the word if you would rather have
Formspree or Calendly and it is a small change in two components.

---

## 2. Navigation

The brokerage session sits under Workshops rather than beside it, in both the
nav and the footer, because it is a workshop. That also gave the three workshop
levels somewhere to live: they were previously reachable only from the workshops
index. The nav group is a real link plus a separate disclosure control, so
Workshops itself stays clickable and the group opens on hover, click, or
keyboard.

---

## 3. Assets still needed

These are the things I could not produce, with what the site does in the
meantime.

| Asset | Status | What is there now |
|---|---|---|
| 6 to 8 Front Range photographs, blue hour or overcast, cool grade, no people | **Needed** | `Photo.astro` renders a generated ridgeline in the palette, at the right dimensions and with the Ink fade. Deliberate placeholder art, not free stock. Drop 2400px graded JPEGs in `src/assets/images/` and pass them as the `src` prop |
| Founder photo, environmental, in Loveland | **Needed** | A gradient panel on `/about` reading "Photograph to come" |
| Horizontal lockup (mark plus wordmark) | Composed in CSS | Nav and footer compose the mark and wordmark side by side. A real lockup file would be better for print |
| Reversed white logo | **Done** | `logo-mono-white.svg` from your zip, at `public/logo-white.svg` |
| Favicon set | **Done** | `favicon.svg`, reframed square, plus a 180px `apple-touch-icon.png` |
| Default OG image | **Done** | `public/images/og-default.jpg`, generated on brand |
| Per-page OG images | **Done** | Three workshops plus `/realtors` |

A note on the logo files: the README in your zip says they were traced from
`ic_logo_transparent.png`, so they are traces of a raster, not the original
vector master. They reproduce the PNG at 99% and they are what the site ships.
If the true vector master turns up, swap it in and rerun `npm run build`.

---

## 4. Deploy

1. Create a GitHub repo and push this directory to `main`.
2. In Netlify, **Add new site → Import an existing project**, pick the repo.
   `netlify.toml` already sets the build command, the publish directory, and
   Node 22, so accept the defaults.
3. Add the custom domain `ideacollaborative.com`, let Netlify provision the
   certificate, and set the apex plus `www` redirect.
4. **Forms.** They work with no configuration because the markup carries
   `data-netlify="true"`. In **Site configuration → Forms → Form notifications**,
   add an email notification to `hello@ideacollaborative.com` for each of:
   `contact`, `assessment`, `breakfast`, `sponsor`, `brokerage`. Turn on the
   built-in spam filtering; the honeypot field is already in place.
5. **Analytics.** Set `PUBLIC_PLAUSIBLE_DOMAIN=ideacollaborative.com` in the
   Netlify environment variables to switch it on. Nothing loads until you do,
   which keeps preview deploys clean. No cookie banner is needed either way.
6. **Booking.** Create the Cal.com event types, then pass the link to
   `BookingEmbed` on `/realtors`, `/contact`, and each workshop page. Until you
   do, the panel shows your phone and email rather than an empty box, so no page
   is a dead end.

---

## 5. Verify after the first deploy

- [ ] Submit each of the five forms from a phone and confirm the email arrives
- [ ] Confirm `/thanks` fires and is `noindex`
- [ ] Google Search Console: verify the domain, submit
      `https://ideacollaborative.com/sitemap-index.xml`
- [ ] Confirm `/dev/motion` and `/thanks` are absent from the sitemap
- [ ] Analytics goals: preview booked, assessment requested, workshop booked,
      contact form sent
- [ ] Email deliverability for `hello@`: SPF, DKIM, and DMARC records
- [ ] Walk every route with `prefers-reduced-motion: reduce` enabled
- [ ] Test matrix: iPhone SE, iPhone 15, Pixel 8, iPad portrait, 1366 laptop,
      1920 desktop, in both Safari and Chrome

---

## 6. Outside the codebase, highest leverage first

1. **Google Business Profile.** Create or claim it. Category "Business
   management consultant" plus "Training centre" or the closest available.
   Service area set to Loveland, Fort Collins, Windsor, Greeley, and Longmont.
   Link to `/`. Post workshop dates and the briefing breakfast as GBP events.
   NAP must match `src/data/contact.ts` exactly, character for character. This
   is the single biggest local SEO action available to you.
2. **Directories.** Loveland Chamber, Fort Collins Chamber, and the NoCo tech
   and business directories. Each is a local backlink.
3. **The flyer QR.** Regenerate it to
   `https://ideacollaborative.com/realtors?utm_source=flyer&utm_medium=print&utm_campaign=realtor-2026`
   and reprint before the next distribution.
4. **Public workshop dates.** When one is scheduled, add it to `publicDate` in
   `src/pages/workshops/[slug].astro` and switch that page from `Service` to
   `Event` schema. Same for `nextEvent` in `ai-briefing-breakfast.astro`.

---

## 7. After the first paid workshop

Replace the "There is no results section here yet" block on `/about` with a
named case study and a real testimonial, with written permission. That paragraph
exists to be deleted. Brand guide section 10 is the reason it reads the way it
does now.
