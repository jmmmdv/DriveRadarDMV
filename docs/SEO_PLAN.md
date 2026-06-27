# SEO Plan

Search and social sharing strategy for DriveRadarDMV. This document describes **current metadata** in the app and **planned improvements** — not a guarantee of search rankings.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Implementation:** [`app/layout.jsx`](../app/layout.jsx)

**Related:** [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) · [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) · [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) · [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## Goals

1. Help DMV gig and professional drivers **discover** DriveRadarDMV through search and shared links.
2. Present **honest, accurate** previews on Google, Slack, iMessage, LinkedIn, and X — no hype about live predictions or guaranteed earnings.
3. Build a foundation for **local SEO** (DC, Maryland, Virginia) as live data and content pages ship in Phase 1+.

---

## Current SEO metadata (shipped)

Configured in [`app/layout.jsx`](../app/layout.jsx) via the Next.js App Router `metadata` export:

| Field | Value / behavior |
|---|---|
| **metadataBase** | `https://drive-radar-dmv.vercel.app/` today — update to `https://driveradardmv.com/` after custom domain is live ([CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md)) |
| **title** | Default: `DriveRadarDMV \| DMV Driver Intelligence MVP`; template: `%s \| DriveRadarDMV` for future pages |
| **description** | DMV driver intelligence for rideshare, delivery, Uber Black/SUV, private, and professional drivers; notes MVP scope |
| **keywords** | Light-touch array (DMV driver intelligence, rideshare DC, delivery MD, airports DCA/IAD/BWI, etc.) |
| **authors / creator / publisher** | DriveRadarDMV |
| **openGraph** | Title, description, URL, siteName, locale `en_US`, type `website` |
| **twitter** | `summary` card with aligned title and description |
| **robots** | `index, follow` with sensible Googlebot snippet/image preview settings |
| **alternates.canonical** | `/` (homepage) |

### Honesty rules (always apply)

Copy must **not** claim:

- Live demand prediction or guaranteed earnings
- Official traffic, safety, or law-enforcement advice
- Full live data when a module is still a static preview

Current description explicitly mentions **MVP preview**, **live NWS weather**, and **static intelligence cards** where relevant.

### Not yet configured

| Item | Status |
|---|---|
| Open Graph share image | Planned — [`/og/driveradardmv-og.png`](../public/og/) — see [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md) |
| `twitter:images` | Waiting on OG asset |
| Custom domain canonical (`driveradardmv.com`) | Planned — DNS steps in [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md); then update `metadataBase` and canonical in `app/layout.jsx` |
| `sitemap.xml` / `robots.txt` | Future Phase 1 |
| Structured data (JSON-LD) | Future when pages and FAQs exist |
| Per-page metadata | Future routes (`/briefing`, blog, zone pages) |

---

## Target keywords

Primary (homepage / brand):

| Keyword theme | Example phrases |
|---|---|
| **Product** | DriveRadarDMV, DMV driver intelligence |
| **Audience** | rideshare driver DMV, delivery driver Washington DC, Uber Black SUV driver |
| **Region** | DC Maryland Virginia driver app, DMV gig driver |
| **Use case** | driver daily briefing, airport pickup DCA IAD BWI, weather for delivery drivers |

Secondary (future content pages):

| Keyword theme | Example phrases |
|---|---|
| **Airports** | DCA uber pickup tips, Dulles driver demand, BWI rideshare |
| **Weather** | DC delivery weather today, snow driving Maryland gig |
| **Events** | Capital One Arena rideshare, Nats game uber demand |
| **Zones** | best area to drive DC tonight, Silver Spring delivery zones |

Avoid keyword stuffing. One clear primary phrase per page when content expands.

---

## Future SEO improvements

### Phase 0 — Foundation *(mostly complete)*

- [x] Root layout metadata (title, description, OG, Twitter, robots, canonical)
- [x] Document plan in this file
- [ ] Add static OG image at `public/og/driveradardmv-og.png` and wire `openGraph.images` / `twitter.images` — [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)
- [ ] Connect custom domain; update `metadataBase` and canonical URLs — follow [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) **After domain is live** section

### Phase 1 — Discoverability

- [ ] `app/sitemap.js` for homepage and new intelligence routes
- [ ] `app/robots.js` referencing sitemap
- [ ] Dedicated landing snippets for airports (DCA, IAD, BWI) and major corridors
- [ ] FAQ section with honest MVP boundaries (helps long-tail search)
- [ ] Internal links from homepage sections to future `/airports/dca`-style pages

### Phase 2 — Content and local SEO

- [ ] Weekly “DMV driver briefing” public page (indexable summary)
- [ ] City/suburb pages: Arlington, Bethesda, Silver Spring, Alexandria, Baltimore corridor
- [ ] Google Business Profile **only if** a real local business presence exists — not required for MVP
- [ ] Backlinks from driver communities, forums, and local gig-economy groups (organic, not paid link farms)

### Phase 3 — Rich results

- [ ] JSON-LD `WebSite` + `Organization` on homepage
- [ ] `FAQPage` schema for common driver questions
- [ ] Article schema for blog or briefing posts

---

## Content ideas

Honest, driver-useful pages that support search without overpromising:

| Content idea | SEO angle | MVP note |
|---|---|---|
| **Daily briefing explainer** | “What is a DMV driver briefing?” | Link to live homepage section |
| **Airport guides** | DCA vs IAD vs BWI for rideshare | Start as static tips; add live FAA later |
| **Weather + driving** | Rain/snow impact on delivery times | Leverage live NWS module |
| **Event calendar preview** | Games and concerts affecting downtown DC | Static preview → live feeds |
| **Driver type guides** | Rideshare vs delivery vs private chauffeur | Supports waitlist driver-type field |
| **Glossary** | Surge, demand zone, briefing — plain language | Builds trust, long-tail queries |

All content should repeat: **decision aid, not navigation or earnings guarantee**.

---

## Open Graph image plan

Full design spec, checklist, and metadata wiring steps: **[OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md)**.

Summary:

| Item | Detail |
|---|---|
| **Recommended size** | 1200 × 630 px |
| **Recommended path** | `public/og/driveradardmv-og.png` → public URL `/og/driveradardmv-og.png` |
| **Metadata** | Add `openGraph.images` and `twitter.images` in `layout.jsx` **only after** the PNG is committed |
| **Twitter card today** | `summary` (text-only) — switch to `summary_large_image` when image ships |

Do not reference the image in metadata until the file exists — broken preview URLs hurt shares.

Legacy note: earlier drafts mentioned `public/og-image.png`; the canonical path is now **`/og/driveradardmv-og.png`**.

### Verify (after image ships)

- [opengraph.xyz](https://www.opengraph.xyz/) or platform debuggers after deploy
- Optional later: `app/opengraph-image.jsx` for dynamic OG — not needed for MVP

Until the PNG exists, Twitter uses `summary` (no image) to avoid broken previews.

---

## Local SEO considerations for DMV drivers

DriveRadarDMV serves **Washington, DC** and surrounding **Maryland** and **Virginia** suburbs — not national generic traffic apps.

| Tactic | Application |
|---|---|
| **Geo-specific copy** | Mention DC, NoVA, Montgomery County, Prince George's, Baltimore corridor in titles and intros |
| **Landmarks & venues** | Capital One Arena, Nationals Park, Dulles, Reagan National, BWI — natural local queries |
| **Driver language** | “Shift”, “zone”, “airport queue”, “briefing” — how gig drivers actually search |
| **NAP consistency** | When a custom domain and contact page exist, keep name/address/phone consistent across README, site footer, and Google |
| **Local landing pages** | Phase 1+ pages per airport and subregion |
| **Avoid** | Fake local office addresses, misleading “official Uber/Lyft partner” claims |

Local SEO complements product strategy: **depth in one region** beats shallow national pages.

---

## Validation checklist

After metadata changes, spot-check:

- [ ] View page source — `<title>`, meta description, `og:*`, `twitter:*`, canonical present
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — no errors for required fields
- [ ] Share link in Slack/iMessage — title and description look correct (image when OG PNG added)
- [ ] Copy still says **MVP** where previews are static

---

## Related backlog issues

| Issue | Status |
|---|---|
| SEO metadata improvement | ✅ Shipped — see layout + this doc |
| Open Graph image | 📋 Plan in [OPEN_GRAPH_PLAN.md](./OPEN_GRAPH_PLAN.md); asset `/og/driveradardmv-og.png` not shipped |
| Custom domain setup | 📋 Plan in [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md); update `metadataBase` after cutover |

Details: [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

*Last updated: Phase 0 SEO metadata shipped. Update when OG image, sitemap, or custom domain lands.*
