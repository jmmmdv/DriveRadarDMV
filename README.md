# DriveRadarDMV

> **Driver intelligence for Washington, DC, Maryland, and Virginia.**

DriveRadarDMV helps rideshare, delivery, and professional drivers in the DMV plan smarter shifts—weather, events, airport activity, and demand zones in one regional view.

### [**→ View live demo**](https://drive-radar-dmv.vercel.app/)

[![Live demo](https://img.shields.io/badge/demo-live-0f766e?style=for-the-badge)](https://drive-radar-dmv.vercel.app/)
[![Static MVP](https://img.shields.io/badge/MVP-static%20preview-blue?style=for-the-badge)](#current-mvp-status)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

| | |
|---|---|
| **Stage** | Weather MVP · live NWS data · other modules static |
| **Live site** | [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) |
| **Region** | DC · Northern Virginia · Maryland suburbs |
| **Repo** | [github.com/jmmmdv/driveradardmv](https://github.com/jmmmdv/driveradardmv) |

---

## Table of contents

- [Product overview](#product-overview)
- [Screenshots](#screenshots)
- [Target users](#target-users)
- [Current MVP status](#current-mvp-status)
- [Planned features](#planned-features)
- [Tech stack](#tech-stack)
- [Local development](#local-development)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [Project structure](#project-structure)

---

## Product overview

DriveRadarDMV is an early-stage SaaS product for the DC metropolitan area. It aggregates weather, events, traffic patterns, airport activity, and road conditions so drivers can plan smarter shifts—not guess.

**What ships today:** a professional landing page with **live DMV weather intelligence** from the National Weather Service (no API key), plus static sample cards for events, airports, and demand zones. No user accounts or payments yet.

**Try it now:** [https://drive-radar-dmv.vercel.app/](https://drive-radar-dmv.vercel.app/)

---

## Screenshots

Captured from the [live demo](https://drive-radar-dmv.vercel.app/).

### Desktop

![DriveRadarDMV homepage — desktop](docs/assets/screenshots/homepage-desktop.png)

### Mobile

![DriveRadarDMV homepage — mobile](docs/assets/screenshots/homepage-mobile.png)

To regenerate after homepage changes: `npm run screenshots` (see [Local development](#local-development)).

---

## Target users

| Segment | Why DriveRadarDMV |
|---|---|
| **Rideshare drivers** (Uber, Lyft) | Spot high-demand windows and airport pickup opportunities |
| **Delivery drivers** (DoorDash, Instacart, Amazon Flex) | Plan routes around weather, events, and congestion |
| **Independent / gig drivers** | One regional view instead of juggling multiple apps |
| **Fleet operators & dispatchers** *(future)* | Shareable briefings for drivers across the DMV |

---

## Current MVP status

### Shipped

- [x] Mobile-friendly marketing homepage ([`app/page.jsx`](app/page.jsx))
- [x] **Live weather intelligence** — NWS API via [`lib/weather.js`](lib/weather.js) (static fallback on failure)
- [x] Static preview cards (events, airports, demand zones)
- [x] Product narrative: problem, features, coverage, roadmap, MVP checklist
- [x] Next.js 14 App Router with production build support
- [x] Live Vercel deployment — [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)
- [x] Product documentation in [`docs/`](docs/)
- [x] README screenshots ([`docs/assets/screenshots/`](docs/assets/screenshots/))

### Not yet included

- [ ] Live API integrations for events, traffic, and airports
- [ ] User accounts or authentication
- [ ] Database or persistent storage
- [ ] Payments or subscriptions
- [ ] Real-time dashboards or alerts beyond basic weather

---

## Planned features

| Feature | Description |
|---|---|
| **Weather impact** | Rain, snow, heat, and wind context for local driving |
| **Local events** | Concerts, games, festivals, and public events near busy corridors |
| **Traffic demand** | Commute-period and peak-travel demand indicators |
| **Airport demand** | Pickup/drop-off context for DCA, IAD, and BWI |
| **Road closures** | Planned closures when verified public sources are connected |
| **Best driving zones** | Regional views for promising areas |
| **High-demand times** | Time-of-day guidance across the DMV |

Details: [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md)

---

## Tech stack

| Layer | Choice |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **UI** | React 18, CSS (no component library) |
| **Language** | JavaScript (JSX) |
| **Linting** | ESLint + `eslint-config-next` |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Version control** | Git / GitHub |

Future phases may add TypeScript, a database, and more free/public data APIs — see [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md). Weather uses the free NWS API with no key. No paid APIs or secrets in the current MVP.

---

## Local development

### Prerequisites

- **Node.js** 18.17+ ([nodejs.org](https://nodejs.org/))
- **npm** (included with Node)

### Setup

```bash
git clone https://github.com/jmmmdv/driveradardmv.git
cd driveradardmv
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint
npm run screenshots  # Capture README screenshots (dev only)
```

No environment variables or API keys are required.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo at [vercel.com](https://vercel.com/).
3. Use default Next.js settings (`next build`).
4. Deploy — no environment variables needed.

**Production URL:** [https://drive-radar-dmv.vercel.app/](https://drive-radar-dmv.vercel.app/)

Custom domain *(optional):* connect `www.driveradardmv.com` in Vercel → Project → Settings → Domains.

### Other platforms

```bash
npm install
npm run build
npm run start
```

Listens on port `3000` by default.

---

## Roadmap

| Phase | Focus | Target |
|---|---|---|
| **Phase 0** *(now)* | Landing page, live weather (NWS), docs, deploy | ✅ Mostly complete |
| **Phase 1** | Free/public data + read-only dashboard | Q3 2026 |
| **Phase 2** | Accounts, saved locations, email alerts | Q4 2026 |
| **Phase 3** | Premium insights & monetization | 2027 |

Full breakdown: [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md)

---

## Documentation

| Document | Purpose |
|---|---|
| [docs/PRODUCT_STRATEGY.md](docs/PRODUCT_STRATEGY.md) | Vision, users, positioning, success metrics |
| [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md) | Phased build plan and milestones |
| [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md) | Planned free/public sources (no paid APIs yet) |
| [docs/MONETIZATION.md](docs/MONETIZATION.md) | Revenue model and pricing hypotheses |

All docs describe the **static MVP stage** unless a phase is explicitly labeled future work.

---

## Project structure

```
driveradardmv/
├── app/
│   ├── components/
│   │   └── WeatherIntelligence.jsx   # Live weather section (server component)
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── docs/
│   ├── assets/screenshots/
│   ├── PRODUCT_STRATEGY.md
│   ├── MVP_ROADMAP.md
│   ├── DATA_SOURCES.md
│   └── MONETIZATION.md
├── lib/
│   └── weather.js                    # NWS fetch + driver guidance + fallback
├── scripts/
│   └── capture-screenshots.js
├── next.config.mjs
├── package.json
└── README.md
```

---

## Contributing

Issues and feedback are welcome. Before opening a PR:

```bash
npm run lint
npm run build
```

---

## License

Private / all rights reserved unless a license file is added later.

---

**DriveRadarDMV** · [**Live demo**](https://drive-radar-dmv.vercel.app/) · [**GitHub**](https://github.com/jmmmdv/driveradardmv) · Built for DMV drivers
