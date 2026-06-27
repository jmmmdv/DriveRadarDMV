# Data Sources

Planned data integrations for DriveRadarDMV. This document describes **what we intend to use**, not what is wired up today.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

**Current MVP:** Live weather via the [National Weather Service API](https://www.weather.gov/documentation/services-web-api). Events use **static demo cards** in [`lib/events.js`](../lib/events.js). Airports and demand zones remain static sample cards on the homepage.

**Policy:** Phase 1 uses **free and public sources only**. No paid API subscriptions until product-market fit justifies cost and a billing layer exists.

---

## Live integrations

### Weather — National Weather Service *(shipped)*

| Item | Detail |
|---|---|
| **Source** | [NWS API](https://api.weather.gov/) |
| **Cost** | Free |
| **API key** | Not required |
| **Implementation** | [`lib/weather.js`](../lib/weather.js) + [`app/components/WeatherIntelligence.jsx`](../app/components/WeatherIntelligence.jsx) |
| **Cache** | 15 minutes (`revalidate: 900`) |
| **Fallback** | Static sample cards per location if fetch fails |
| **Locations** | Washington DC, Arlington VA, Dulles / NoVA, Baltimore / BWI |

**Request flow:**

1. `GET https://api.weather.gov/points/{lat},{lon}` with a `User-Agent` header
2. `GET` the `properties.forecast` URL from the points response
3. Map the current forecast period to driver impact and suggested action

**Not included yet:** hourly forecast, weather alerts banner, historical trends.

---

### Events — static MVP preview *(shipped as demo)*

| Item | Detail |
|---|---|
| **Source** | Static data in [`lib/events.js`](../lib/events.js) |
| **Cost** | Free (no API) |
| **API key** | Not required |
| **Implementation** | [`app/components/EventsIntelligence.jsx`](../app/components/EventsIntelligence.jsx) |
| **Status** | MVP preview only — **not live event data** |
| **Zones** | Downtown DC / Convention Center, Capital One Arena, Nationals Park / Navy Yard, DCA area, Arlington / Tysons corridor |

**Planned free/public sources for live events (Phase 1+):**

| Source | Type | Cost | Coverage | Notes |
|---|---|---|---|---|
| [National Park Service API](https://www.nps.gov/subjects/developer/) | REST | Free | DC monuments, parks | Tourism-driven traffic |
| [WMATA / Metro alerts](https://www.wmata.com/) | Public feeds | Free | DC metro | Service disruptions affecting commutes |
| Curated local calendar (internal) | Manual JSON | Free | DMV venues | Caps, Nats Park, Anthem, etc. |
| DC / venue open data | Various | Free | Major venues | When stable feeds are available |

**Phase 1 approach:** Replace static cards with a maintained seed list of major venues, then add public feeds incrementally. Until then, event cards are clearly labeled **Sample preview**.

---

## Design principles

1. **Prefer official open data** — government and agency feeds over scraped third-party sites.
2. **Attribute everything** — every card shows source name and last-updated time.
3. **Fail gracefully** — one broken feed must not blank the entire dashboard.
4. **Cache by default** — respect rate limits; reduce upstream load.
5. **No secrets in the repo** — API keys (when needed later) live in deployment env vars only.

---

## Phase 1 sources (planned — additional modules)

| Source | Type | Cost | Coverage | Notes |
|---|---|---|---|---|
| [DC Open Data / DDOT](https://opendata.dc.gov/) | Various | Free | Washington, DC | Closures, permits, construction |
| [VDOT open data](https://www.virginiadot.org/) | Feeds / APIs | Free | Virginia | Highway incidents and closures |
| [MDOT CHART / Maryland open data](https://data.maryland.gov/) | Various | Free | Maryland | State road events |

**Use cases:** Planned closures, construction zones, major incident awareness (not turn-by-turn rerouting).

**Caution:** Formats differ by agency; normalize into an internal `RoadEvent` schema.

---

### Airports (DCA, IAD, BWI)

| Source | Type | Cost | Coverage | Notes |
|---|---|---|---|---|
| [FAA NAS Status](https://nasstatus.faa.gov/) | Web / API | Free | US airports | Delays and ground-stop context |
| Airport authority public pages | HTML / RSS | Free | DCA, IAD, BWI | Flight volume proxies where available |

**Use cases:** "Busy airport day" indicators, delay summaries—not individual flight tracking for passengers.

**Note:** Real-time gate-level data is often licensed; Phase 1 stays at summary level.

---

### Events & demand drivers *(planned — live feeds)*

**Current status:** Static demo cards only. See [Live integrations → Events](#events--static-mvp-preview-shipped-as-demo) above.

| Source | Type | Cost | Coverage | Notes |
|---|---|---|---|---|
| [National Park Service API](https://www.nps.gov/subjects/developer/) | REST | Free | DC monuments, parks | Tourism-driven traffic |
| [WMATA / Metro alerts](https://www.wmata.com/) | Public feeds | Free | DC metro | Service disruptions affecting commutes |
| Curated local calendar (internal) | Manual JSON | Free | DMV venues | Caps, Nats Park, Anthem, etc. |

**Use cases:** Concerts, games, festivals, rallies—events that cluster riders and traffic.

**Phase 1 approach:** Start with a **maintained seed list** of major venues and recurring patterns, then add feeds incrementally.

---

### Time & geography baselines

| Source | Type | Cost | Notes |
|---|---|---|---|
| US Census / OpenStreetMap boundaries | Static / OSS | Free | DMV zone definitions |
| Internal heuristics | Code | — | Commute peaks (AM/PM), weekend nightlife windows |

**Use cases:** "High-demand times" card without claiming access to proprietary rideshare demand data.

---

## Explicitly not in Phase 1

| Source type | Reason |
|---|---|
| Paid weather APIs (Tomorrow.io, etc.) | Cost; public alternatives sufficient for MVP |
| Paid traffic APIs (INRIX, TomTom, Google Routes) | Licensing cost; navigation is out of scope |
| Rideshare platform APIs | Not available to third parties at useful granularity |
| Scraped social media or crowd reports | Legal/reliability risk |
| Real-time flight schedules (commercial) | Expensive; summary-level FAA data is enough initially |

Paid integrations may be evaluated in **Phase 3** if they materially improve premium features and unit economics work. See [MONETIZATION.md](./MONETIZATION.md).

---

## Internal data model (sketch)

Future API layer will normalize upstream feeds:

```text
WeatherSnapshot   → region, temp, conditions, alerts[], fetchedAt
RoadEvent         → id, type, location, start, end, source, fetchedAt
AirportSummary    → code (DCA|IAD|BWI), status, delayLevel, fetchedAt
RegionalEvent     → name, venue, start, end, impactLevel, source
DemandHint        → region, timeWindow, level (low|medium|high), basis
```

---

## Caching strategy (planned)

| Data type | Suggested TTL | Rationale |
|---|---|---|
| Weather | 10–15 min | Balance freshness vs. rate limits |
| Road events | 5–10 min | Incidents change quickly |
| Airport summary | 15–30 min | FAA updates are not second-level |
| Events calendar | 1–6 hours | Schedules change slowly |
| Static zones | 24 hours | Rarely changes |

Implementation target: Next.js `fetch` with `revalidate` or edge-friendly cache layer.

---

## Compliance & attribution

- Display **source name and link** on each dashboard module
- Respect each API's terms of use and attribution requirements
- Do not store personal driver location in Phase 1
- Publish a privacy policy before collecting emails (Phase 2)

---

## Adding a new source (checklist)

- [ ] Confirm license and terms allow our use case
- [ ] Document endpoint, rate limits, and example response
- [ ] Add normalization mapper and unit tests
- [ ] Add degraded UI state for timeout / 4xx / 5xx
- [ ] Update this file and README if user-facing

---

## Related documents

- [README](../README.md) — Project overview, setup, screenshots, and live demo
- [MVP_ROADMAP.md](./MVP_ROADMAP.md) — When each source ships
- [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) — Why data quality matters to users
- [MONETIZATION.md](./MONETIZATION.md) — When paid data may be justified
