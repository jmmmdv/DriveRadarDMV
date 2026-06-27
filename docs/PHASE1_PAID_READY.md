# Phase 1 — Paid-ready minimum

What must ship **before** you ask drivers to pay — and **before** App Store / Play Store submission with subscriptions.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

**Related:** [MVP_ROADMAP.md](./MVP_ROADMAP.md) · [MONETIZATION.md](./MONETIZATION.md) · [SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md) · [WEB_FIRST_MOBILE.md](./WEB_FIRST_MOBILE.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## Goal

Move from **credible demo** → **habit-forming free product** → **premium worth $8–10/mo**.

You are **not** paid-ready until a driver can say: *“I checked this before my shift and it helped — I’d pay for alerts and my zones.”*

---

## Paid-ready checklist

### Tier A — Must have (free tier, before any payment)

| # | Feature | Status | Why it matters for money |
|---|---|---|---|
| A1 | **Daily briefing auto-composed from live weather** | ✅ Weather shipped; events/airports next | First “only here” moment; habit driver |
| A2 | **Live events** (at least curated + public feed for major DMV venues) | ❌ Static | Events drive surge — core value |
| A3 | **Live airport context** (DCA / IAD / BWI — public FAA-style summaries) | ❌ Static | Airport drivers are a paying segment |
| A4 | **Honest source labels** on every card | ✅ Mostly done | Trust = retention |
| A5 | **Waitlist + feedback backends** (store emails/responses) | ❌ UI only | Audience before premium |
| A6 | **10 driver interviews** with payment intent question | ❌ Manual | Validates price before Stripe |
| A7 | **Weekly return intent** — 3+ drivers say they’d check weekly | ❌ Validate | Subscription needs habit |

### Tier B — Must have (premium tier, before Stripe)

| # | Feature | Why drivers pay |
|---|---|---|
| B1 | **Accounts** (email or magic link) | Personalization + billing |
| B2 | **Push or email shift brief** at driver-chosen time | Convenience — top premium driver |
| B3 | **Saved home zone + favorite airports** | Personalization |
| B4 | **Custom alerts** (weather threshold, event near zone, airport) | Clear ROI vs free tier |
| B5 | **Privacy policy + terms draft** | Required for App Store + Stripe |
| B6 | **Stripe (or RevenueCat) subscription** | $8.99/mo or $79/yr per [MONETIZATION.md](./MONETIZATION.md) |

### Tier C — Nice to have (not blocking first $500 MRR)

| Feature | Notes |
|---|---|
| Zone heat map | Visual premium upsell |
| Historical “best Tuesday windows” | Needs data accumulation |
| Native iOS/Android app | After web retention — [WEB_FIRST_MOBILE.md](./WEB_FIRST_MOBILE.md) |
| Custom domain + OG image | Trust for sharing |
| Demand zone live heuristics | Harder data problem |

---

## Free vs premium boundary (recommended)

| Free — “DMV Daily Brief” | Premium — “DriveRadar Pro” |
|---|---|
| Today’s composed briefing (1x/day) | Same briefing + **scheduled email/push** |
| NWS forecast weather (all zones) | **Alerts** when forecast crosses your thresholds |
| Top events + airport summary | **Your zones** + favorite airports prioritized |
| Read-only web dashboard | Ad-free + saved preferences (future) |
| General demand zone hints | Hourly window hints (12–24h) when data supports it |

**Rule:** Never paywall basic NWS forecast or severe-weather awareness.

---

## Exit criteria — “OK to turn on payments”

All must be true:

- [ ] **A1–A4** complete
- [ ] At least **2 of A2–A3** live (events + airports)
- [ ] **A6** done — 10 interviews; ≥3 “would pay $8/mo if alerts worked”
- [ ] **A7** — ≥3 drivers used site twice in one week without you reminding them
- [ ] **B1–B4** shipped in staging
- [ ] **B5** published and linked from footer
- [ ] Soft launch validation green on **Trust** and **Usefulness** ([SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md))

---

## Revenue milestones (from [MONETIZATION.md](./MONETIZATION.md))

| Milestone | Subscribers (≈$8 net) | Signal |
|---|---|---|
| First dollar | 1 | Billing works |
| Early validation | 50 | ~$400/mo — worth continuing |
| Product-market fit hint | 250 | ~$2,000/mo — consider mobile app |
| Scale review | 1,000+ | Paid APIs may be justified |

---

## Recommended build order (next 90 days)

| Week | Focus |
|---|---|
| 1–2 | Driver interviews ([DRIVER_INTERVIEW_SCRIPT.md](./DRIVER_INTERVIEW_SCRIPT.md)) + waitlist backend |
| 3–4 | Live events MVP (seed list + 1 public source) |
| 5–6 | Live airport summaries + briefing auto-compose all modules |
| 7–8 | Accounts + email digest (free tier habit) |
| 9–10 | Premium alerts (beta with 5 paying friends) |
| 11–12 | Stripe live + soft public launch in one driver Facebook group |

---

## What not to build yet

- App Store submission before Tier A complete
- One-time purchase SKU (poor fit for daily product)
- Paid weather/traffic APIs before 50+ weekly actives
- National expansion
- Surge prediction claims without real data

---

*Update this doc when A1–A7 items change status.*
