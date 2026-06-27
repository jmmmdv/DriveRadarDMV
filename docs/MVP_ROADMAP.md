# MVP Roadmap

Phased delivery plan for DriveRadarDMV. Each phase has a clear exit criteria so the team can ship incrementally without over-building.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Stage:** Daily briefing + live weather · static intelligence previews

**Last updated:** June 2026

---

## Overview

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3
Briefing    Live data    Accounts     Premium
+ modules   dashboard    & alerts     & scale
 (now)      (Q3 2026)    (Q4 2026)    (2027)
```

The **Daily Driver Briefing** is the decision layer that combines Weather, Events, Airports, and Demand Zones into one shift summary. Phase 0 ships a static demo; later phases auto-compose from live and personalized data.

**Detailed issue planning:** [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) — GitHub-style backlog for Phases 1–5 (MVP hardening through scale).

---

## Phase 0 — Foundation & narrative MVP

**Status:** In progress  
**Goal:** Credible product presence for drivers, investors, and collaborators.

### Deliverables

- [x] Next.js project scaffold
- [x] Responsive homepage with product story
- [x] README and product documentation (`docs/`)
- [x] Production deploy on Vercel — [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)
- [x] Live weather intelligence (NWS API)
- [x] Events intelligence preview (static zone cards)
- [x] Airport intelligence preview (static DCA / IAD / BWI cards)
- [x] Demand zones intelligence preview (static zone cards)
- [x] Daily driver briefing (static synthesis of all modules)
- [x] Waitlist form UI (frontend-only preview — validation step before backend)
- [x] Homepage screenshots in `docs/assets/screenshots/` (`npm run screenshots`)
- [ ] Custom domain (`www.driveradardmv.com`)
- [ ] Basic analytics (privacy-friendly — see [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md); plan done, not enabled)

### Exit criteria

- Public URL loads in < 3s on mobile
- A new visitor can explain the product in one sentence after 30 seconds on the site
- Repository is fork/clone friendly with no secrets required
- README includes desktop and mobile screenshots

### Validation preview (pre-Phase 2)

Early product validation before accounts, email digests, or payments:

| Step | Status | Notes |
|---|---|---|
| Waitlist UI on homepage | **Shipped** | Name, email, driver type — frontend-only; no data stored |
| Waitlist backend / storage | Planned | Phase 2 — free-tier form backend or database; env vars documented, never committed |
| Driver feedback (“Was this useful?”) | Planned | Phase 3 backlog — see [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) |

---

## Phase 1 — Read-only intelligence dashboard

**Target:** Q3 2026  
**Goal:** First version with **real data** from free/public sources only.

### Features

| Feature | Priority | Notes |
|---|---|---|
| Daily driver briefing | P0 | ✅ Static synthesis shipped; auto-compose from live modules in Phase 1 |
| Regional weather summary | P0 | ✅ Shipped on homepage via NWS |
| Today's notable events | P0 | Static preview shipped; live feeds + seed list next |
| Airport day overview | P1 | Static preview shipped (DCA, IAD, BWI); live FAA summaries next |
| Commute demand hints | P1 | Static zone preview shipped; live heuristics + public signals next |
| Road closure feed | P2 | State DOT open data when stable |
| Source freshness labels | P0 | "Updated X min ago" on every card |

### Engineering

- Add `/dashboard` route (read-only, no auth)
- Server-side data fetching with caching (ISR or route handlers)
- Error boundaries when a source is down
- TypeScript migration (recommended before API layer grows)

### Data policy

- **No paid APIs** in Phase 1 — see [DATA_SOURCES.md](./DATA_SOURCES.md)
- No scraping of terms-prohibited sites
- Store minimal cached JSON; no PII

### Exit criteria

- Dashboard loads with at least 3 live data categories
- Degraded mode works when one source fails
- Documented refresh intervals and source attribution

---

## Phase 2 — Accounts, personalization, alerts

**Target:** Q4 2026  
**Goal:** Drivers return daily because the product remembers their preferences.

### Features

| Feature | Priority |
|---|---|
| Email or magic-link sign-in | P0 |
| Waitlist backend (persist sign-ups from homepage form) | P0 |
| Saved home zone / preferred airports | P0 |
| Daily email or push digest ("Today's DMV brief") | P1 |
| Favorite corridors or neighborhoods | P2 |
| Driver feedback ("Was this useful?") | P1 |

### Engineering

- Auth provider (e.g. Clerk, Auth.js, or Supabase Auth)
- PostgreSQL or Supabase for user prefs
- Background job for scheduled digests
- Rate limiting and abuse protection

### Exit criteria

- 100+ registered users with at least one saved preference
- Digest send success rate > 98%
- Privacy policy and terms draft published

---

## Phase 3 — Premium tier & growth

**Target:** 2027  
**Goal:** Sustainable revenue while keeping a valuable free tier.

### Features

| Feature | Tier |
|---|---|
| Regional daily briefing | Free |
| Weather + events + airports | Free |
| Hourly demand outlook | Premium |
| Zone-level heat map | Premium |
| Custom alerts (airport, weather, events) | Premium |
| Historical patterns ("best Tuesday windows") | Premium |

See [MONETIZATION.md](./MONETIZATION.md) for pricing hypotheses.

### Engineering

- Stripe (or similar) subscription billing
- Feature flags for tier gating
- Usage analytics for conversion funnel
- Performance budget for map/visualization features

### Exit criteria

- Paid tier live with self-serve checkout
- Free tier remains useful without paywalling safety-critical info
- Unit economics documented (CAC, LTV assumptions)

---

## Backlog (post-Phase 3)

Ideas not committed to a phase:

- Native mobile app (PWA first)
- Fleet / multi-driver admin view
- Integration with driver community forums or Discord
- Expansion to Baltimore or Richmond (only after DMV depth is proven)
- API for third-party tools

---

## How to use this roadmap

1. **Do not skip Phase 0** — credibility matters before data complexity.
2. **Ship Phase 1 with fewer features** rather than delaying for perfection.
3. **Revisit quarterly** — dates are targets, not contracts.
4. **Link PRs to phase items** — e.g. `Phase 1: weather card` in PR title.
5. **Track execution** — create GitHub issues from [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md).

---

## Related documents

- [README](../README.md) — Project overview, setup, screenshots, and live demo
- [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) — Detailed issue backlog (Phases 1–5)
- [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md)
- [DATA_SOURCES.md](./DATA_SOURCES.md)
- [MONETIZATION.md](./MONETIZATION.md)
