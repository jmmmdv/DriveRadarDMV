# DriveRadarDMV

**Driver intelligence for Washington, DC, Maryland, and Virginia.**

DriveRadarDMV helps DMV-area drivers understand local conditions, demand signals, and regional driving opportunities in one simple view—before they get on the road.

| | |
|---|---|
| **Status** | Static MVP · Sample data only · No live APIs yet |
| **Live demo** | [**drive-radar-dmv.vercel.app**](https://drive-radar-dmv.vercel.app/) |
| **Region** | DC · Northern Virginia · Maryland suburbs |

---

## Product overview

DriveRadarDMV is an early-stage SaaS product focused on the DC metropolitan area. It brings together weather, events, traffic patterns, airport activity, and road conditions so drivers can plan smarter shifts—not guess.

The current repository ships a **static MVP preview**: a professional landing page that explains the product vision, planned features, and DMV coverage. No live data feeds, accounts, or payments are wired up yet.

---

## Target users

| Segment | Why DriveRadarDMV |
|---|---|
| **Rideshare drivers** (Uber, Lyft) | Spot high-demand windows and airport pickup opportunities |
| **Delivery drivers** (DoorDash, Instacart, Amazon Flex) | Plan routes around weather, events, and congestion |
| **Independent / gig drivers** | One regional view instead of juggling multiple apps and sources |
| **Fleet operators & dispatchers** *(future)* | Shareable briefings for drivers across the DMV |

---

## Current MVP status

What exists today:

- [x] Mobile-friendly marketing homepage (`app/page.jsx`)
- [x] Static intelligence preview cards (weather, events, airports, demand zones)
- [x] Product narrative: problem, features, coverage, roadmap, and MVP status
- [x] Next.js 14 App Router scaffold with production build support
- [x] Live Vercel deployment — [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

What is **not** included yet:

- [ ] User accounts or authentication
- [ ] Database or persistent storage
- [ ] Live API integrations (weather, traffic, events)
- [ ] Payments or subscriptions
- [ ] Real-time dashboards or alerts

---

## Planned features

These match the product roadmap and the feature cards on the homepage:

| Feature | Description |
|---|---|
| **Weather impact** | Rain, snow, heat, and wind context for local driving |
| **Local events** | Concerts, games, festivals, and public events near busy corridors |
| **Traffic demand** | Commute-period and peak-travel demand indicators |
| **Airport demand** | Pickup/drop-off signals for DCA, IAD, and BWI |
| **Road closures** | Planned closures and construction when verified sources are connected |
| **Best driving zones** | Regional heat-style views for promising areas |
| **High-demand times** | Time-of-day guidance across the DMV |

See [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md) for phased delivery details.

---

## Tech stack

| Layer | Choice |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **UI** | React 18, CSS (no component library yet) |
| **Language** | JavaScript (JSX) |
| **Linting** | ESLint + `eslint-config-next` |
| **Hosting** | [Vercel](https://vercel.com/) (recommended) |
| **Version control** | Git / GitHub |

Future phases may add TypeScript, a database, background jobs, and curated public data APIs—documented in [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md).

---

## Local development

### Prerequisites

- **Node.js** 18.17 or later ([nodejs.org](https://nodejs.org/))
- **npm** (bundled with Node)

### Setup

```bash
# Clone the repository
git clone https://github.com/jmmmdv/driveradardmv.git
cd driveradardmv

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve production build locally
npm run lint    # Run ESLint
```

No environment variables are required for the current MVP preview.

---

## Deployment

### Deploy to Vercel (recommended)

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and **Import Project**.
3. Select the `driveradardmv` repository.
4. Accept the default Next.js settings (build: `next build`, output: Next.js).
5. Deploy. No environment variables are needed for the static preview.

Custom domain (optional): point `www.driveradardmv.com` to your Vercel project in **Project → Settings → Domains**.

### Deploy elsewhere

Any platform that supports Next.js 14 works:

```bash
npm install
npm run build
npm run start
```

The app listens on port `3000` by default.

---

## Roadmap

| Phase | Focus | Target |
|---|---|---|
| **Phase 0** *(now)* | Landing page, static demo cards & product docs | ✅ In progress |
| **Phase 1** | Free/public data sources + read-only dashboard | Q3 2026 |
| **Phase 2** | Accounts, saved locations, email alerts | Q4 2026 |
| **Phase 3** | Premium insights & monetization | 2027 |

Full breakdown: [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md)

---

## Live demo

| Environment | URL |
|---|---|
| **Production (Vercel)** | [**https://drive-radar-dmv.vercel.app/**](https://drive-radar-dmv.vercel.app/) |
| Custom domain *(planned)* | [www.driveradardmv.com](https://www.driveradardmv.com) |

The live site is a **static MVP** with sample intelligence cards. No live API data is connected yet.

---

## Screenshots

> **Placeholder** — add screenshots after deploy. Suggested path: `docs/assets/screenshots/`

| View | Preview |
|---|---|
| Homepage hero | *Add `homepage-hero.png`* |
| Intelligence preview cards | *Add `preview-cards.png`* |
| Mobile layout | *Add `mobile-home.png`* |

Example markdown once images exist:

```markdown
![DriveRadarDMV homepage](docs/assets/screenshots/homepage-hero.png)
```

---

## Documentation

| Document | Purpose |
|---|---|
| [docs/PRODUCT_STRATEGY.md](docs/PRODUCT_STRATEGY.md) | Vision, users, positioning, success metrics |
| [docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md) | Phased build plan and milestones |
| [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md) | Planned free/public data sources (no paid APIs yet) |
| [docs/MONETIZATION.md](docs/MONETIZATION.md) | Revenue model and pricing hypotheses |

---

## Project structure

```
driveradardmv/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.jsx       # Root layout & metadata
│   └── page.jsx         # Homepage (MVP preview)
├── docs/                # Product & engineering docs
├── next.config.mjs
├── package.json
└── README.md
```

---

## Contributing

This is an early-stage product repository. Issues and feedback are welcome. Before opening a PR, run `npm run lint` and `npm run build`.

---

## License

Private / all rights reserved unless a license file is added later.

---

**DriveRadarDMV** · [Live demo](https://drive-radar-dmv.vercel.app/) · [GitHub](https://github.com/jmmmdv/driveradardmv) · Built for DMV drivers
