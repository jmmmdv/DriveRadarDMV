# Data Sources

Planned data integrations for DriveRadarDMV. This document describes **what we intend to use**, not what is wired up today.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

**Current MVP:** **NWS forecast weather** when the public API is reachable via [`lib/weather.js`](../lib/weather.js) — **not real-time observations**. Demo fallback cards when NWS is unavailable. Events, airports, and demand zones use **static demo cards** in [`lib/events.js`](../lib/events.js), [`lib/airports.js`](../lib/airports.js), and [`lib/demandZones.js`](../lib/demandZones.js).

**Policy:** Phase 1 uses **free and public sources only**. No paid API subscriptions until product-market fit justifies cost and a billing layer exists.

---

## Live integrations

### Weather — National Weather Service forecast *(shipped with limitations)*

| Item | Detail |
|---|---|
| **Source** | [NWS API](https://api.weather.gov/) — `/points` + `/forecast` endpoints |
| **Data type** | **Forecast periods** (e.g. “This Afternoon”) — **not** current observations or radar |
| **Cost** | Free |
| **API key** | Not required |
| **Implementation** | [`lib/weather.js`](../lib/weather.js) + [`app/components/WeatherIntelligence.jsx`](../app/components/WeatherIntelligence.jsx) |
| **Cache** | 15 minutes (`revalidate: 900`) on fetch |
| **Fallback** | Clearly labeled **demo preview** cards per location if NWS fetch fails |
| **Locations** | Washington DC (`38.9072, -77.0369`), Arlington VA (`38.8816, -77.091`), Dulles / NoVA (`38.9531, -77.4565`), Baltimore / BWI (`39.1754, -76.6684`) |

**Request flow:**

1. `GET https://api.weather.gov/points/{lat},{lon}` with a required `User-Agent` header
2. `GET` the `properties.forecast` URL from the points response (grid-based forecast)
3. Use the **first forecast period** (`periods[0]`) for condition, temperature, period name, and valid window
4. Derive cautious driver hints from forecast text — **not official safety advice**

**UI source status labels:**

| Status | Meaning |
|---|---|
| **NWS forecast loaded** | All zones returned NWS forecast data |
| **Mixed · some zones on demo fallback** | Some zones failed; others show NWS forecast |
| **Demo fallback · NWS unavailable** | NWS unreachable; all zones show sample cards |

**MVP limitations (important):**

- **Not real-time** — shows NWS forecast periods, not live conditions or observations
- **Build / deploy gaps** — if NWS is unreachable at build or request time, demo fallback is shown with explicit labels
- **Per-zone failures** — one zone can show NWS forecast while another shows demo fallback
- **Driver impact text** — algorithmic hints from forecast keywords; verify with official sources before driving
- **No alerts banner** — NWS weather alerts are not wired yet
- **15-minute cache** — data may be up to ~15 minutes stale plus forecast period granularity
- **`fetchedAt` timestamp** — shown only when at least one NWS forecast loaded; means app fetch time, not NWS observation time
- **Forecast valid window** — from NWS `startTime` / `endTime` when available

**Trust disclaimer (homepage):**  
“Weather information is MVP-level NWS forecast data when available — not real-time observations. Verify conditions with official weather sources before making driving decisions.”

**Not included yet:** hourly forecast, weather alerts banner, observation stations, historical trends, precipitation probability display.

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

### Airports — static MVP preview *(shipped as demo)*

| Item | Detail |
|---|---|
| **Source** | Static data in [`lib/airports.js`](../lib/airports.js) |
| **Cost** | Free (no API) |
| **API key** | Not required |
| **Implementation** | [`app/components/AirportIntelligence.jsx`](../app/components/AirportIntelligence.jsx) |
| **Status** | MVP preview only — **not live flight data** |
| **Airports** | DCA (Reagan National), IAD (Dulles), BWI (Baltimore-Washington) |

**Planned free/public sources for live airport summaries (Phase 1+):**

| Source | Type | Cost | Coverage | Notes |
|---|---|---|---|---|
| [FAA NAS Status](https://nasstatus.faa.gov/) | Web / API | Free | US airports | Delays and ground-stop context |
| Airport authority public pages | HTML / RSS | Free | DCA, IAD, BWI | Flight volume proxies where available |

**Use cases:** "Busy airport day" indicators, delay summaries—not individual flight tracking for passengers.

**Note:** Real-time gate-level data is often licensed; Phase 1 stays at summary level. Until live feeds ship, airport cards are labeled **Sample preview**.

---

### Demand zones — static MVP preview *(shipped as demo)*

| Item | Detail |
|---|---|
| **Source** | Static data in [`lib/demandZones.js`](../lib/demandZones.js) |
| **Cost** | Free (no API) |
| **API key** | Not required |
| **Implementation** | [`app/components/DemandZones.jsx`](../app/components/DemandZones.jsx) |
| **Status** | MVP preview only — **not live demand prediction** |
| **Zones** | Downtown DC, Georgetown / Foggy Bottom, Navy Yard, Arlington / Rosslyn, Tysons, National Harbor / MGM |

**Planned free/public sources for live demand hints (Phase 1+):**

| Source | Type | Cost | Notes |
|---|---|---|---|
| US Census / OpenStreetMap boundaries | Static / OSS | Free | DMV zone definitions |
| Internal heuristics | Code | — | Commute peaks, event correlation, time-of-day windows |
| Public event & traffic feeds | Various | Free | Indirect demand signals when correlated with zones |

**Use cases:** Zone-level opportunity highlights for rideshare, delivery, Uber Black/SUV, and private drivers — without claiming access to proprietary rideshare demand data.

**Phase 1 approach:** Combine time-of-day heuristics with public event and traffic context. Until then, demand cards are labeled **Sample preview**.

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

### Airports (DCA, IAD, BWI) *(planned — live feeds)*

**Current status:** Static demo cards only. See [Live integrations → Airports](#airports--static-mvp-preview-shipped-as-demo) above.

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

### Time & geography baselines *(planned — live demand hints)*

**Current status:** Static demo cards only. See [Live integrations → Demand zones](#demand-zones--static-mvp-preview-shipped-as-demo) above.

| Source | Type | Cost | Notes |
|---|---|---|---|
| US Census / OpenStreetMap boundaries | Static / OSS | Free | DMV zone definitions |
| Internal heuristics | Code | — | Commute peaks (AM/PM), weekend nightlife windows |

**Use cases:** "High-demand times" and zone highlights without claiming access to proprietary rideshare demand data.

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
