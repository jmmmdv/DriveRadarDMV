# MVP Roadmap

Phased delivery plan for DriveRadarDMV. Each phase has a clear exit criteria so the team can ship incrementally without over-building.

**Last updated:** June 2026

---

## Overview

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3
Landing     Live data    Accounts     Premium
& docs      dashboard    & alerts     & scale
 (now)      (Q3 2026)    (Q4 2026)    (2027)
```

---

## Phase 0 — Foundation & narrative MVP

**Status:** In progress  
**Goal:** Credible product presence for drivers, investors, and collaborators.

### Deliverables

- [x] Next.js project scaffold
- [x] Responsive homepage with product story
- [x] README and product documentation (`docs/`)
- [ ] Production deploy on Vercel with custom domain
- [ ] Homepage screenshots in `docs/assets/screenshots/`
- [ ] Basic analytics (privacy-friendly, e.g. Vercel Analytics)

### Exit criteria

- Public URL loads in < 3s on mobile
- A new visitor can explain the product in one sentence after 30 seconds on the site
- Repository is fork/clone friendly with no secrets required

---

## Phase 1 — Read-only intelligence dashboard

**Target:** Q3 2026  
**Goal:** First version with **real data** from free/public sources only.

### Features

| Feature | Priority | Notes |
|---|---|---|
| Regional weather summary | P0 | NWS or Open-Meteo; DMV-wide + sub-regions |
| Today's notable events | P0 | Manual seed list + public event feeds where available |
| Airport day overview | P1 | DCA, IAD, BWI — delays and general activity context |
| Commute demand hints | P1 | Time-of-day heuristics; not live rideshare data |
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

---

## Related documents

- [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md)
- [DATA_SOURCES.md](./DATA_SOURCES.md)
- [MONETIZATION.md](./MONETIZATION.md)
