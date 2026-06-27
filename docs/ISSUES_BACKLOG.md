# Issues Backlog

Professional development backlog for DriveRadarDMV. Use this document to create GitHub issues, plan sprints, and track progress after Phase 0 (current MVP).

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Roadmap:** [MVP_ROADMAP.md](./MVP_ROADMAP.md)

**Last updated:** June 2026

---

## How to use this backlog

1. Copy an issue block into a GitHub issue when ready to work on it.
2. Label issues with phase (`phase-1`, `phase-2`, etc.) and type.
3. Do not add paid APIs or secrets — see [DATA_SOURCES.md](./DATA_SOURCES.md).
4. Close issues only when **acceptance criteria** are met.

**Priority legend**

| Priority | Meaning |
|---|---|
| **High** | Blocks launch quality, user trust, or next phase |
| **Medium** | Important but can ship without it |
| **Low** | Nice to have; schedule when capacity allows |

---

## Phase 1 — MVP hardening

Stabilize the current homepage, briefing, and intelligence previews before expanding live data.

---

### Issue: Improve mobile layout QA

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Design |

**Description**  
Systematically test the polished homepage on common mobile viewports (320px, 390px, 414px). Fix overflow, tap targets, sticky header behavior, and intelligence card readability.

**Acceptance criteria**

- [ ] No horizontal scroll on iPhone SE, iPhone 14, and Pixel 5 widths
- [ ] All nav anchor links scroll to correct sections
- [ ] Briefing and intelligence cards remain readable without zoom
- [ ] Status pills and badges do not overlap titles on small screens
- [ ] Findings documented in a short QA checklist (can live in this repo’s docs or issue comments)

**Notes**  
Test live Vercel deploy, not only local dev. Re-run after any CSS change to intelligence stack.

---

### Issue: Add accessibility review

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Design |

**Description**  
Audit homepage for WCAG basics: heading order, color contrast, focus states, aria labels, and disclaimer `role="note"` usage.

**Acceptance criteria**

- [ ] Single `h1` on homepage; logical `h2`/`h3` hierarchy in each section
- [ ] Focus visible on links and buttons
- [ ] Color contrast meets WCAG AA for body text and badges (spot-check with browser tools)
- [ ] Screen reader spot-check: section titles and card content announced clearly
- [ ] List of fixes applied or deferred items documented

**Notes**  
No need for full WCAG certification at this stage — aim for sensible baseline.

---

### Issue: Add SEO metadata improvement

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |
| **Status** | **Shipped** — see [SEO_PLAN.md](./SEO_PLAN.md) and [`app/layout.jsx`](../app/layout.jsx) |

**Description**  
Enhance `app/layout.jsx` metadata for search and sharing: title template, description, keywords (light touch), canonical URL, and Twitter card tags.

**Acceptance criteria**

- [x] Unique, descriptive `<title>` and meta description
- [x] `metadataBase` set to production URL
- [x] Canonical link for homepage
- [x] Twitter / Open Graph title and description aligned with README positioning
- [x] Documented in [SEO_PLAN.md](./SEO_PLAN.md)
- [ ] Validates with [Google Rich Results Test](https://search.google.com/test/rich-results) or similar without errors for required fields *(manual check after deploy)*

**Notes**  
Keep copy honest: static previews vs live NWS weather. OG share image is a separate backlog item.

**Next SEO tasks**

- [ ] Add Open Graph image (`public/og/driveradardmv-og.png`) — see [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)
- [ ] `sitemap.xml` / `robots.js` when more routes ship
- [ ] Update `metadataBase` when custom domain connects

---

### Issue: Add Open Graph image plan

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Design / Documentation |
| **Status** | **Plan documented** — PNG not in repo; see [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) |

**Description**  
Plan and add a share preview image for Slack, iMessage, LinkedIn, X, and startup link sharing.

**Depends on:** SEO metadata improvement (shipped)

**Planning complete**

- [x] [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) — what OG is, why it matters, 1200×630 spec, content guide, checklist
- [x] Placeholder folder `public/og/` (`.gitkeep`)
- [x] Canonical asset path: `public/og/driveradardmv-og.png` → `/og/driveradardmv-og.png`
- [x] [SEO_PLAN.md](./SEO_PLAN.md) updated with future image path
- [x] `layout.jsx` does **not** reference missing image (honest text-only previews)

**Acceptance criteria (asset + metadata — future)**

- [ ] Design and export `driveradardmv-og.png` at 1200×630 per OPEN_GRAPH_PLAN.md
- [ ] File committed to `public/og/driveradardmv-og.png`
- [ ] `openGraph.images` and `twitter.images` added to [`app/layout.jsx`](../app/layout.jsx)
- [ ] Twitter card updated to `summary_large_image`
- [ ] Preview verified with [opengraph.xyz](https://www.opengraph.xyz/) or similar after deploy

**Notes**  
Static PNG only — no image npm deps, no external OG services. Wire metadata only after file exists.

---

### Issue: Create and ship official Open Graph image

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Design |
| **Depends on** | Open Graph plan (documented) |

**Description**  
Produce the official `driveradardmv-og.png` asset and enable rich link previews in production.

**Acceptance criteria**

- [ ] PNG matches brand and content guidelines in [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)
- [ ] Product name, tagline, DMV driver intelligence theme, module hints (weather / events / airports / zones)
- [ ] “Live MVP preview” or equivalent honest label — no earnings guarantees
- [ ] `npm run build` passes after metadata update
- [ ] Share test on at least one platform (Slack, iMessage, LinkedIn, or X)

**Notes**  
Use Figma, Canva, or similar — do not add repo dependencies for image generation.

---

### Issue: Add screenshot refresh workflow notes

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Documentation |

**Description**  
Document when and how to regenerate README screenshots after UI changes using the existing Playwright script.

**Acceptance criteria**

- [ ] README Screenshots section references exact commands (`npm run screenshots`)
- [ ] Checklist: run after layout/CSS changes, before release PRs
- [ ] File naming convention documented (`homepage-desktop.png`, `homepage-mobile.png`)
- [ ] Note to uncomment/update README image embeds if needed

**Notes**  
Script already exists at `scripts/capture-screenshots.js`. No new dependencies required.

---

### Issue: Add custom domain setup plan

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Documentation |
| **Status** | **Plan documented** — see [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md); DNS not configured in repo |

**Description**  
Write a step-by-step plan to connect `driveradardmv.com` and `www.driveradardmv.com` to the Vercel project without downtime.

**Acceptance criteria (documentation)**

- [x] [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) — goal, DNS, HTTPS, verification, troubleshooting, rollback
- [x] Beginner steps: Vercel domains, registrar DNS, propagation, test both URLs
- [x] “Do not commit secrets” section
- [x] “After domain is live” post-cutover checklist (README, metadataBase, SEO, build)
- [x] DNS record types documented (A for apex, CNAME for www — confirm values in Vercel dashboard)
- [x] Vercel domain verification steps listed
- [x] Redirect strategy noted (apex ↔ www)

**Acceptance criteria (implementation — manual, outside repo)**

- [ ] Domains added in Vercel project settings
- [ ] DNS records live at registrar; Vercel shows **Valid configuration**
- [ ] `https://driveradardmv.com` and `https://www.driveradardmv.com` tested
- [ ] Post-cutover: update README live demo link, `metadataBase` in [`app/layout.jsx`](../app/layout.jsx), [SEO_PLAN.md](./SEO_PLAN.md)

**Notes**  
Domain purchase and DNS changes are manual — no secrets in repo. Vercel URL remains fallback until cutover.

---

### Issue: Add launch checklist

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Documentation |
| **Status** | **Shipped** — see [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) |

**Description**  
Create a pre-launch / re-launch checklist covering build, deploy, docs, disclaimers, and smoke tests.

**Acceptance criteria**

- [x] [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) — technical, GitHub, Vercel, domain, SEO, privacy, copy, mobile, driver validation, post-launch, 7-day plan
- [x] Launch readiness scorecard (technical, product, design, data, monetization, validation)
- [x] “Do not launch until” blockers documented
- [x] Checklist includes: `npm run build`, `npm run lint`, clean git, Vercel deploy, README links, screenshots, no `.env`/secrets, no paid APIs, waitlist and feedback frontend-only, MVP labels, analytics not installed unless intentional
- [x] Linked from README documentation table
- [ ] Team runs full checklist before next **public** launch announcement *(manual)*

**Notes**  
Quick summary remains below; full checklist is the canonical doc.

---

### Issue: Reduce homepage copy duplication

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Technical Debt |

**Description**  
Review hero, briefing, global MVP note, and MVP status panel for repeated disclaimers. Consolidate where possible without losing honesty.

**Acceptance criteria**

- [ ] Each disclaimer appears once at the most logical layer (global note + briefing if needed)
- [ ] MVP status panel still accurate
- [ ] No regression to accessibility or mobile layout

**Notes**  
Copy-only change; no new features.

---

## Phase 2 — Live data expansion

Connect free/public sources and improve intelligence modules beyond static previews. **No paid APIs.**

---

### Issue: Add live event data research

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Research |

**Description**  
Research free/public event feeds for DMV venues (NPS, WMATA, curated seed list, DC/venue open data). Document endpoints, rate limits, and normalization approach.

**Acceptance criteria**

- [ ] Findings added to [DATA_SOURCES.md](./DATA_SOURCES.md) or linked research doc
- [ ] At least 3 candidate sources evaluated with pros/cons
- [ ] Sample API response shape sketched for internal `RegionalEvent` model
- [ ] Clear note: no scraping of terms-prohibited sites
- [ ] Recommendation for Phase 2 implementation order

**Notes**  
Research only — no API keys or live integration in this issue.

---

### Issue: Add airport data research

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Research |

**Description**  
Research free/public airport summary sources for DCA, IAD, and BWI (FAA NAS Status, airport authority pages). Define “summary level” acceptable for drivers vs licensed gate data.

**Acceptance criteria**

- [ ] FAA NAS Status access method documented
- [ ] DCA / IAD / BWI public page patterns noted
- [ ] Proposed `AirportSummary` fields: code, status, delayLevel, fetchedAt
- [ ] Fallback behavior defined when source unavailable
- [ ] Updated [DATA_SOURCES.md](./DATA_SOURCES.md) airport section

**Notes**  
Stay at delay/summary level — not individual flight tracking.

---

### Issue: Improve demand-zone model logic

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |

**Description**  
Design heuristics for demand zones: time-of-day windows, event correlation, and zone scoring — without claiming proprietary rideshare data.

**Acceptance criteria**

- [ ] Document scoring inputs (commute peaks, event proximity, weather modifier)
- [ ] `DemandHint` schema sketched in DATA_SOURCES or code comment
- [ ] Static preview cards updated OR mapping function stubbed in `lib/demandZones.js`
- [ ] Copy remains honest: estimates, not live platform demand

**Notes**  
Phase 2 can start with rules-based logic before any external feed.

---

### Issue: Auto-compose Daily Briefing from live weather

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Feature |

**Description**  
Extend `lib/dailyBriefing.js` to pull weather summary from `getDmvWeatherIntelligence()` for the weather caution block while keeping other briefing fields static until more feeds exist.

**Acceptance criteria**

- [ ] Weather caution reflects live NWS when available; fallback when not
- [ ] Briefing still renders if weather fetch fails entirely
- [ ] `DailyBriefing.jsx` remains a server component if async required
- [ ] Disclaimer unchanged: briefing is not official advice
- [ ] `npm run build` passes

**Notes**  
First step toward a real decision layer — no new dependencies.

---

### Issue: Add dedicated Daily Briefing page

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |

**Description**  
Create `/briefing` route with expanded daily summary, print-friendly layout, and link from homepage hero CTA.

**Acceptance criteria**

- [ ] New route `app/briefing/page.jsx` (or equivalent App Router path)
- [ ] Reuses `DailyBriefing` component or shared briefing data helper
- [ ] Homepage links to `/briefing` (“View full briefing”)
- [ ] Mobile-readable; same MVP disclaimers present
- [ ] Listed in README project structure

**Notes**  
Single page — no auth or database.

---

### Issue: Add source freshness labels to intelligence cards

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |

**Description**  
Show “Updated X min ago” and source name on each intelligence module when live data exists.

**Acceptance criteria**

- [ ] Weather section shows fetch timestamp (partially done — extend pattern)
- [ ] Static modules show “Sample preview · not live data”
- [ ] Consistent format across Weather, Events, Airports, Zones
- [ ] Documented in DATA_SOURCES caching strategy

**Notes**  
Builds user trust; aligns with Phase 1 roadmap exit criteria.

---

## Phase 3 — Product validation

Learn whether drivers find value before building payments or heavy infrastructure.

---

### Issue: Add waitlist email form

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Feature |
| **Status** | **UI preview shipped** — backend integration remains |

**Description**  
Add a simple waitlist capture on homepage or `/briefing` for drivers interested in live data and email digests. Use a free tier-friendly approach (e.g. Formspree, Google Form embed, or Vercel-compatible form backend) — **no secrets in repo**.

**Shipped (Phase 0 preview)**

- [x] Homepage waitlist section before final CTA ([`app/components/WaitlistForm.jsx`](../../app/components/WaitlistForm.jsx))
- [x] Form fields: name, email, driver type (rideshare / delivery / Uber Black·SUV / private / other)
- [x] Frontend-only success message — no API, no storage, no env vars
- [x] MVP disclaimer: “Frontend-only MVP preview. No data is stored yet.”

**Acceptance criteria (backend — future)**

- [ ] Persist submissions via free-tier form backend or database
- [ ] Clear privacy note: what email will be used for
- [ ] Submission works on production deploy with documented env setup (values never committed)
- [ ] MVP disclaimer: waitlist ≠ guaranteed features

**Notes**  
UI preview is intentionally disconnected. When adding a backend, document variable names in README without values.

---

### Issue: Connect waitlist form to storage / email provider

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Engineering |
| **Depends on** | Waitlist UI preview (shipped) |

**Description**  
Wire the homepage waitlist to a free-tier-friendly backend (Formspree, Supabase, Resend audience, etc.) so sign-ups are stored and optionally trigger a confirmation email.

**Acceptance criteria**

- [ ] Submissions persist in production
- [ ] No secrets in repo; env vars documented in README setup only
- [ ] Graceful error state if backend unavailable
- [ ] Privacy policy draft linked from form section

**Notes**  
Do not ship until Phase 2 auth/storage decisions are made.

---

### Issue: Add driver feedback form

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |
| **Status** | **UI preview shipped** — backend integration remains |

**Description**  
Lightweight feedback form for product validation: driver type, driving area, most useful feature, gaps, and weekly use intent.

**Shipped (Phase 0 preview)**

- [x] Homepage feedback section near waitlist ([`app/components/DriverFeedbackForm.jsx`](../../app/components/DriverFeedbackForm.jsx))
- [x] Fields: driver type, main driving area, most useful feature, what is missing, weekly use (Yes / Maybe / No)
- [x] Frontend-only success message — no API, no storage, no env vars
- [x] MVP disclaimer: “Frontend-only MVP preview. No feedback is stored yet.”

**Acceptance criteria (backend — future)**

- [ ] Submissions persist via shared validation backend or database (with waitlist)
- [ ] Optional export or dashboard for product review
- [ ] Privacy note on how feedback is used
- [ ] No secrets in git; env vars documented in README setup only if needed

**Notes**  
Pair with driver interviews for qualitative depth. See **Connect validation forms to storage** below.

---

### Issue: Connect validation forms to storage (waitlist + feedback)

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Engineering |
| **Depends on** | Waitlist UI preview (shipped), Driver feedback UI preview (shipped) |

**Description**  
Wire homepage waitlist and driver feedback forms to a free-tier-friendly backend (Formspree, Supabase, Airtable, Google Sheets API, etc.) so sign-ups and feedback are stored securely.

**Acceptance criteria**

- [ ] Waitlist submissions persist in production
- [ ] Feedback submissions persist in production (same or separate endpoint)
- [ ] No secrets in repo; env vars documented in README setup only
- [ ] Graceful error states if backend unavailable
- [ ] Privacy policy draft linked from both form sections
- [ ] Forms updated to remove “frontend-only” copy once backend is live

**Notes**  
Do not ship until Phase 2 storage decisions are made. Consider one shared “validation” table with form type discriminator.

---

### Issue: Add privacy-safe analytics

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Feature |
| **Status** | **Plan documented** — see [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md); not implemented in app |

**Description**  
Add privacy-friendly analytics to understand traffic and section engagement without invasive tracking. Planning is complete; implementation waits until Phase 0 exit or early Phase 1.

**Planning complete**

- [x] [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) — goals, safe metrics, forbidden data, event examples, risk checklist, phases
- [x] Product principle: privacy-first analytics ([PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md))

**Acceptance criteria (implementation)**

- [ ] Provider chosen per plan (default recommendation: Vercel Analytics — dashboard enable, no repo secrets)
- [ ] No tracking scripts added until this issue is actively worked; no cookies unless documented with consent plan
- [ ] Safe MVP metrics only: homepage visits, section engagement, waitlist UI interactions, CTA clicks, device category, region-level interest
- [ ] Explicitly **no** trip data, passenger data, license plates, precise GPS, waitlist PII in analytics payloads
- [ ] Privacy note added to README or future privacy policy draft
- [ ] Page views visible for homepage (and `/briefing` if added)
- [ ] Event names documented in ANALYTICS_PLAN.md when live

**Notes**  
Do not install Plausible, PostHog, or other SDKs until provider decision is recorded in ANALYTICS_PLAN.md. Vercel Analytics free tier is the sensible first step for this stack — enable in Vercel dashboard without npm dependencies.

---

### Issue: Run driver interview script (5–10 drivers)

| Field | Value |
|---|---|
| **Priority** | High |
| **Type** | Research |

**Description**  
Conduct short interviews with DMV gig drivers. Validate problem, briefing usefulness, and willingness to return daily.

**Acceptance criteria**

- [ ] Interview script with 8–10 questions documented
- [ ] At least 5 conversations completed
- [ ] Findings summarized: top 3 requested features, confusion points
- [ ] Updates recommended to PRODUCT_STRATEGY success metrics section

**Notes**  
Qualitative validation — no code required unless copy changes follow.

---

### Issue: Add `/dashboard` read-only route (spike)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Feature |

**Description**  
Spike a dedicated dashboard page that mirrors homepage intelligence in a denser layout for returning users.

**Acceptance criteria**

- [ ] Route exists and reuses existing components
- [ ] No auth required for spike
- [ ] Decision documented: merge into homepage vs keep separate
- [ ] Build passes

**Notes**  
Aligns with MVP_ROADMAP Phase 1 engineering item.

---

## Phase 4 — Monetization readiness

Prepare for premium tier without enabling payments in MVP.

---

### Issue: Add monetization experiment plan

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Business |

**Description**  
Define how to test willingness to pay before building Stripe. See [MONETIZATION.md](./MONETIZATION.md).

**Acceptance criteria**

- [ ] Survey questions for waitlist: price sensitivity ($8–10/mo)
- [ ] “Founding member” offer draft
- [ ] Free vs premium feature boundary confirmed
- [ ] Success metrics: % who say they would pay, return visit rate
- [ ] Experiment timeline (e.g. 4 weeks post-waitlist launch)

**Notes**  
Business doc update — no payment code.

---

### Issue: Draft Terms of Service and Privacy Policy

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Documentation |

**Description**  
Create plain-language draft ToS and Privacy Policy suitable for waitlist and future accounts.

**Acceptance criteria**

- [ ] Disclaimer: not official traffic/weather/safety advice
- [ ] Data collected (email, analytics) described
- [ ] Third-party services listed (Vercel, form provider, NWS attribution)
- [ ] Links ready to add to footer when legal review complete

**Notes**  
Mark as draft — recommend human review before launch.

---

### Issue: Define premium feature flags (design only)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Design |

**Description**  
Wireframe which briefing sections and intelligence modules would be free vs premium per MONETIZATION.md.

**Acceptance criteria**

- [ ] Table: feature → free / premium
- [ ] No paywall on safety-critical weather alerts
- [ ] UI mockup optional (markdown table sufficient)
- [ ] Engineering note: feature flags future work, not Phase 4 requirement

**Notes**  
Avoid implementing Stripe until Phase 3 validation passes.

---

## Phase 5 — Scale and automation

Operations, CI, and growth infrastructure after product-market fit signals.

---

### Issue: Add GitHub Actions CI workflow

| Field | Value |
|---|---|
| **Priority** | Medium |
| **Type** | Technical Debt |

**Description**  
Run `npm run lint` and `npm run build` on every pull request.

**Acceptance criteria**

- [ ] Workflow file in `.github/workflows/`
- [ ] Runs on push to `main` and on PRs
- [ ] Fails PR if build or lint fails
- [ ] Documented in README Contributing section

**Notes**  
No deployment secrets required for lint/build job.

---

### Issue: Automate screenshot refresh in CI (optional)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Technical Debt |

**Description**  
Evaluate running `npm run screenshots` in CI and committing artifacts — or opening bot PRs on UI changes.

**Acceptance criteria**

- [ ] Playwright Chromium install documented for CI
- [ ] Decision: manual vs automated documented with pros/cons
- [ ] If automated: does not block PRs on flaky visual diffs without review

**Notes**  
Manual screenshots may stay sufficient for solo maintainer.

---

### Issue: Add email digest pipeline (design)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Feature |

**Description**  
Design daily email digest using waitlist emails + composed briefing. Provider: Resend, SendGrid free tier, or similar.

**Acceptance criteria**

- [ ] Architecture diagram or bullet flow: compose → queue → send
- [ ] Unsubscribe requirement noted
- [ ] Cost estimate at 100 / 1000 subscribers
- [ ] Blocked until Phase 2 live data quality is stable

**Notes**  
Requires accounts module from MVP_ROADMAP Phase 2.

---

### Issue: Regional expansion research (Baltimore / Richmond)

| Field | Value |
|---|---|
| **Priority** | Low |
| **Type** | Research |

**Description**  
Document what it would take to expand beyond core DMV — only after DMV depth is proven.

**Acceptance criteria**

- [ ] List of zones, airports, and data sources per region
- [ ] Recommendation: defer until DAU and driver feedback justify expansion
- [ ] No code changes in this issue

**Notes**  
Explicitly out of scope for near term per PRODUCT_STRATEGY.

---

## Launch checklist (summary)

Quick reference — **full checklist:** [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)

- [ ] `npm run lint` and `npm run build` pass locally
- [ ] Vercel production deploy successful
- [ ] [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) loads on mobile and desktop
- [ ] Daily briefing near top; Weather / Events / Airports / Zones visible
- [ ] Global MVP disclaimer visible; static modules labeled preview
- [ ] Waitlist marked frontend-only (no storage)
- [ ] Driver feedback marked frontend-only (no storage)
- [ ] No analytics/tracking unless intentionally enabled per ANALYTICS_PLAN.md
- [ ] README live demo link correct; doc links work
- [ ] Screenshots refreshed or marked pending in README
- [ ] No secrets or `.env` in git; no paid APIs added
- [ ] Custom domain verified when ready (CUSTOM_DOMAIN_SETUP.md)
- [ ] Scorecard reviewed before public launch (LAUNCH_CHECKLIST.md)

---

## Related documents

- [README](../README.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
- [MVP_ROADMAP.md](./MVP_ROADMAP.md)
- [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md)
- [DATA_SOURCES.md](./DATA_SOURCES.md)
- [MONETIZATION.md](./MONETIZATION.md)
