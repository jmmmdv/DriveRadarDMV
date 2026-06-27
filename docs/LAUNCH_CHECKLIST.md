# Launch Checklist

Pre-launch and re-launch checklist for DriveRadarDMV Phase 0 MVP. Use this before sharing the live demo publicly, posting on social media, or presenting to drivers and collaborators.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Planned domain:** [driveradardmv.com](https://driveradardmv.com)

**Related:** [MVP_ROADMAP.md](./MVP_ROADMAP.md) · [SEO_PLAN.md](./SEO_PLAN.md) · [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) · [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) · [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## How to use this document

1. Work through each section top to bottom before a launch or major announcement.
2. Check boxes as you complete items (`[x]` in git when the whole launch passes).
3. Re-run **Pre-launch technical checks** after any homepage, deploy, or dependency change.
4. A “soft launch” (friends, 5 drivers) can skip custom domain and OG image; a **public launch** should complete [SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md) and score higher on the [readiness scorecard](#launch-readiness-scorecard).

---

## Pre-launch technical checks

| # | Check | Done |
|---|---|---|
| 1 | `npm run lint` passes with no errors | ☐ |
| 2 | `npm run build` passes locally | ☐ |
| 3 | No new npm dependencies added unless reviewed and necessary | ☐ |
| 4 | No `.env`, `.env.local`, or credential files in git (`git status` clean of secrets) | ☐ |
| 5 | No API keys, tokens, or passwords committed anywhere in the repo | ☐ |
| 6 | No paid APIs added without explicit approval and documentation | ☐ |
| 7 | Weather uses free NWS **forecast** API only — demo fallback labeled when unavailable ([`lib/weather.js`](../lib/weather.js)) | ☐ |
| 8 | App runs locally: `npm run dev` → [http://localhost:3000](http://localhost:3000) | ☐ |

**Commands:**

```bash
cd ~/Documents/driveradardmv   # or your clone path
npm run lint
npm run build
git status
```

---

## GitHub / repository checks

| # | Check | Done |
|---|---|---|
| 1 | `git status` shows clean working tree (or only intentional launch changes staged) | ☐ |
| 2 | `main` branch pushed to GitHub; Vercel deploys from expected branch | ☐ |
| 3 | README live demo link points to working URL | ☐ |
| 4 | All documentation links in README resolve (no broken relative paths) | ☐ |
| 5 | `docs/` index complete: strategy, roadmap, backlog, data sources, analytics, SEO, domain, OG, launch | ☐ |
| 6 | Screenshots in `docs/assets/screenshots/` match current UI **or** README notes they are pending refresh | ☐ |
| 7 | LICENSE / contributing notes acceptable for how you share the repo | ☐ |
| 8 | No secrets in commit history on latest push (spot-check diff) | ☐ |

**Screenshot refresh (when UI changed):**

```bash
npm run dev          # terminal 1
npm run screenshots  # terminal 2
```

---

## Vercel deployment checks

| # | Check | Done |
|---|---|---|
| 1 | Latest Git push triggered a **successful** Vercel production deployment | ☐ |
| 2 | [https://drive-radar-dmv.vercel.app/](https://drive-radar-dmv.vercel.app/) loads without 5xx errors | ☐ |
| 3 | Production build settings: `next build` (default Next.js) | ☐ |
| 4 | No environment variables required for current MVP (none in Vercel dashboard unless intentionally added later) | ☐ |
| 5 | Deploy logs show no unexpected build failures (weather NWS fetch may log fallback during build — OK if site renders) | ☐ |
| 6 | Vercel preview URLs work for PRs if using branch previews | ☐ |

---

## Custom domain checks *(when ready — optional for first soft launch)*

| # | Check | Done |
|---|---|---|
| 1 | Follow [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) — domains added in Vercel | ☐ |
| 2 | DNS records verified; Vercel shows **Valid configuration** | ☐ |
| 3 | `https://driveradardmv.com` loads with valid HTTPS | ☐ |
| 4 | `https://www.driveradardmv.com` loads or redirects to canonical URL | ☐ |
| 5 | `metadataBase` in [`app/layout.jsx`](../app/layout.jsx) updated to canonical domain | ☐ |
| 6 | README primary live demo link updated after cutover | ☐ |
| 7 | Vercel default URL still works as fallback | ☐ |

Skip this section until DNS is configured.

---

## SEO / social sharing checks

| # | Check | Done |
|---|---|---|
| 1 | [`app/layout.jsx`](../app/layout.jsx) has title, description, Open Graph, Twitter, robots, canonical | ☐ |
| 2 | Metadata copy is honest (MVP, no fake live data, no earnings guarantees) | ☐ |
| 3 | Share link in Slack or iMessage — title and description look correct | ☐ |
| 4 | OG image: if **not** shipped, metadata does **not** reference a missing image ([OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)) | ☐ |
| 5 | OG image: if shipped, `/og/driveradardmv-og.png` returns 200 and preview tools show image | ☐ |
| 6 | [SEO_PLAN.md](./SEO_PLAN.md) reflects current `metadataBase` URL | ☐ |

Optional validation: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Privacy and safety checks

| # | Check | Done |
|---|---|---|
| 1 | No analytics or tracking scripts in the app ([ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) — not installed unless intentionally enabled later) | ☐ |
| 2 | No cookies banner needed for current MVP (no tracking cookies) | ☐ |
| 3 | Waitlist form clearly states **frontend-only**; no data stored ([WaitlistForm.jsx](../app/components/WaitlistForm.jsx)) | ☐ |
| 4 | Driver feedback form clearly states **frontend-only**; no feedback stored ([DriverFeedbackForm.jsx](../app/components/DriverFeedbackForm.jsx)) | ☐ |
| 5 | No collection of driver location, trips, passengers, or PII beyond optional future waitlist/feedback backend | ☐ |
| 6 | No `.env` files committed; no secrets in client-side code | ☐ |
| 7 | Product does not impersonate Uber, Lyft, government, or law enforcement | ☐ |

---

## Product copy checks

| # | Check | Done |
|---|---|---|
| 1 | Homepage explains **who** it is for (rideshare, delivery, Uber Black/SUV, private, professional DMV drivers) | ☐ |
| 2 | **Daily Driver Briefing** visible near top of page (after hero) | ☐ |
| 3 | **Weather** section visible — NWS **forecast** or clearly labeled demo fallback; trust disclaimer present | ☐ |
| 4 | Weather manually verified on production: conditions plausible for DMV; no “Live” label on demo fallback cards | ☐ |
| 5 | **Events**, **Airports**, **Demand Zones** sections visible in intelligence stack | ☐ |
| 6 | Static modules labeled as preview / sample / MVP — not “live prediction” | ☐ |
| 7 | Global MVP disclaimer visible (intelligence stack or briefing) | ☐ |
| 8 | Briefing and modules do **not** claim official traffic advice or guaranteed earnings | ☐ |
| 9 | Waitlist invites early access without promising features or dates | ☐ |
| 10 | Driver feedback section visible near waitlist; frontend-only note present | ☐ |
| 11 | Roadmap and MVP status sections align with [MVP_ROADMAP.md](./MVP_ROADMAP.md) | ☐ |

---

## Mobile QA checks

| # | Check | Done |
|---|---|---|
| 1 | Homepage reviewed on a real phone (or DevTools mobile viewport) | ☐ |
| 2 | Navigation / in-page anchors work (Briefing, Weather, Events, Airports, Zones) | ☐ |
| 3 | Text readable without horizontal scroll | ☐ |
| 4 | Buttons, waitlist, and feedback forms usable on touch (44px-ish tap targets) | ☐ |
| 5 | Intelligence cards stack cleanly on narrow screens | ☐ |
| 6 | Footer links tappable (live demo, GitHub, domain) | ☐ |
| 7 | Compare to `docs/assets/screenshots/homepage-mobile.png` if screenshots were refreshed | ☐ |

---

## Driver validation checks *(soft launch)*

**Full plan:** [SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md) — complete **before public launch**, not optional for wide outreach.

| # | Check | Done |
|---|---|---|
| 1 | Soft launch plan reviewed; 3–5 driver sessions scheduled or completed | ☐ |
| 2 | At least **3–5 DMV drivers** (mix: rideshare, delivery, Black/SUV, or private) viewed the live site | ☐ |
| 3 | Asked: “What is this product in one sentence?” — answers match intent | ☐ |
| 4 | Core questions asked: clarity, usefulness, best/confusing section, missing, weekly use, waitlist interest | ☐ |
| 5 | Scoring table filled: clarity, usefulness, trust, visual, willingness to return | ☐ |
| 6 | Daily briefing read as useful or confusing — capture quotes | ☐ |
| 7 | Waitlist UI understood as not connected yet | ☐ |
| 8 | Feedback UI understood as not connected yet | ☐ |
| 9 | Red flags checked — no misleading live-data or earnings claims reported | ☐ |
| 10 | Findings logged; [decision rules](./SOFT_LAUNCH_VALIDATION.md#decision-rules-after-feedback) applied | ☐ |

See backlog issue: *Run soft launch validation (3–10 drivers)*.

---

## Post-launch monitoring *(first 48 hours)*

| # | Check | Done |
|---|---|---|
| 1 | Live URL loads from cellular network (not just home Wi‑Fi) | ☐ |
| 2 | Spot-check weather section — NWS forecast labels, trust disclaimer, and demo fallback if NWS fails | ☐ |
| 3 | Watch Vercel deploy dashboard for failed builds after hotfixes | ☐ |
| 4 | GitHub Issues open for bugs found by early users | ☐ |
| 5 | If analytics enabled later: confirm privacy plan in [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) before install | ☐ |
| 6 | Social posts / messages use honest MVP language | ☐ |
| 7 | Note traffic or share feedback qualitatively until analytics ships | ☐ |

---

## Next 7-day action plan

Use after Phase 0 public soft launch:

| Day | Focus | Actions |
|---|---|---|
| **1** | Stability | Confirm deploy green; fix any mobile/copy bugs; share link with 3 drivers |
| **2** | Feedback | Run 2 short driver interviews; log top 3 confusions |
| **3** | Docs | Update backlog priorities from feedback; refresh screenshots if UI fixed |
| **4** | SEO / share | Test social previews; start OG image design if not done ([OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)) |
| **5** | Domain | Begin custom domain DNS if ready ([CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md)) |
| **6** | Validation | Expand to 5–10 driver views; note waitlist interest (informal, until backend) |
| **7** | Plan Phase 1 | Pick first live data module beyond weather; update [MVP_ROADMAP.md](./MVP_ROADMAP.md) |

---

## Launch readiness scorecard

Rate each area **Red / Yellow / Green** before a public launch. Soft launch can proceed with Yellow in non-critical rows if called out explicitly.

| Area | Green = launch OK | Current (self-assess) |
|---|---|---|
| **Technical readiness** | `lint` + `build` pass; Vercel prod green; no secrets in git | ☐ R ☐ Y ☐ G |
| **Product clarity** | New visitor explains product in one sentence; briefing near top | ☐ R ☐ Y ☐ G |
| **Design readiness** | Mobile OK; screenshots current or noted pending; OG image planned or shipped | ☐ R ☐ Y ☐ G |
| **Data readiness** | NWS forecast or honest demo fallback; static modules clearly labeled preview | ☐ R ☐ Y ☐ G |
| **Monetization readiness** | No payments promised; waitlist honest; [MONETIZATION.md](./MONETIZATION.md) aligned | ☐ R ☐ Y ☐ G |
| **Validation readiness** | 3+ drivers seen site; disclaimers understood; no misleading claims reported | ☐ R ☐ Y ☐ G |

**Public launch suggestion:** all **Technical**, **Product clarity**, and **Data readiness** at Green; no **Red** in Privacy-related items; **[SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md)** completed with acceptable scores.

---

## Do not launch until

Hard stops — fix these before sharing widely:

| Blocker | Why |
|---|---|
| **Broken deployment** | Production URL 5xx or blank page destroys trust |
| **Committed secrets** | Rotate keys; remove from git history if exposed |
| **Misleading claims** | “Guaranteed earnings”, “official traffic data”, “live surge prediction” when not true |
| **Fake live data claims** | Static previews and demo weather fallback must say preview/sample/demo — never “Live NWS” on fallback |
| **Unverified weather on production** | Manually confirm NWS forecast loads or demo fallback is clearly labeled before public sharing |
| **Privacy-invasive tracking** | No hidden analytics, fingerprinting, or driver location tracking without consent and documentation |
| **`npm run build` fails** | Do not push broken main to production |
| **Waitlist implies storage** | Form must say frontend-only until backend ships |

---

## Quick command reference

```bash
npm run lint
npm run build
npm run dev
git status
git push
npm run screenshots   # after UI changes, dev server running
```

---

## Related backlog

| Item | Doc |
|---|---|
| Launch checklist issue | [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) |
| Soft launch validation | [SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md) |
| Custom domain | [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) |
| OG image | [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) |
| Analytics (future) | [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) |

---

*Last updated: Phase 0 MVP. Re-run this checklist before every major release or public announcement.*
