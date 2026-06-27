# Open Graph Plan

Social share preview strategy for DriveRadarDMV. This document describes **what an Open Graph (OG) image is**, **why it matters**, and **how to add one safely** — the PNG file is **not shipped yet**.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Asset path (planned):** `/og/driveradardmv-og.png`

**Related:** [SEO_PLAN.md](./SEO_PLAN.md) · [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## What Open Graph images are

When you paste a link into Slack, iMessage, LinkedIn, Facebook, X (Twitter), Discord, or many email clients, the app fetches **Open Graph** metadata from the page. If an **OG image** is configured, platforms show a **preview card** with:

- A thumbnail image
- Title and description
- Your site URL

Without an OG image, shares still show title and description (DriveRadarDMV does this today via [`app/layout.jsx`](../app/layout.jsx)), but the preview looks less polished and gets fewer clicks.

OG images are **static marketing assets** — not analytics, not tracking, and not required for the app to function.

---

## Why they matter for DriveRadarDMV

| Channel | Benefit |
|---|---|
| **GitHub** | README and repo links look professional in issues and profile |
| **LinkedIn** | Stronger preview when sharing the MVP with investors or collaborators |
| **Facebook / Meta** | Cleaner cards if you post in local driver groups |
| **X / Twitter** | `summary_large_image` cards stand out in the timeline |
| **Text / iMessage** | Recipients see branding before they tap the link |
| **Startup presentation** | Consistent visual identity when demo links appear in decks or Notion |

For a regional driver-intelligence MVP, a clear OG image answers *“What is this?”* in one glance — especially important before live data fills every module.

---

## Recommended image size

| Property | Value |
|---|---|
| **Dimensions** | **1200 × 630 pixels** (aspect ratio 1.91:1) |
| **Format** | PNG (sharp text) or JPG (smaller file) |
| **Safe zone** | Keep logo and headline inside ~**1200 × 600** — some platforms crop edges |
| **File size** | Aim for **under 500 KB** for fast fetches |
| **Color profile** | sRGB |

Do not rely on external image CDNs or dynamic image APIs for the MVP — host the file in this repo under `public/og/`.

---

## Recommended content for DriveRadarDMV

The official OG image should feel aligned with the homepage (dark header, accent green, clean type):

### Must include

1. **Product name:** `DriveRadarDMV`
2. **Short tagline:** e.g. *“DMV driver intelligence”* or *“Know before you drive”*
3. **MVP honesty:** small line such as *“Live MVP preview”* — not “guaranteed earnings” or “official traffic data”

### Theme elements (pick 2–4, keep uncluttered)

- **Weather** — cloud, rain, or temperature motif (matches live NWS module)
- **Events** — calendar or venue silhouette (Capitol, arena)
- **Airports** — plane or DCA / IAD / BWI labels
- **Demand zones** — simplified map pins or corridor highlight for DC · MD · VA

### Visual style

- Background: dark navy/charcoal (match `--bg` / header from [`app/globals.css`](../app/globals.css))
- Accent: green from homepage (`--accent`)
- Typography: bold sans-serif, high contrast for small preview thumbnails
- Optional: subtle DMV map outline or beltway hint — not a precise navigational map

### Avoid on the OG image

- Fake “live surge” numbers or dollar amounts
- Uber/Lyft official logos (trademark risk)
- Crowded screenshots of the full homepage (illegible at thumbnail size)
- Personal driver photos or license plates

---

## Where the image lives in the project

```
public/
└── og/
    ├── .gitkeep              ← folder reserved (present now)
    └── driveradardmv-og.png  ← add this file when design is ready (not in repo yet)
```

**Public URL after deploy:** `https://drive-radar-dmv.vercel.app/og/driveradardmv-og.png`  
**After custom domain:** `https://driveradardmv.com/og/driveradardmv-og.png`

Next.js serves everything in `public/` at the site root — no import or dependency required.

---

## Future design ideas

| Idea | Notes |
|---|---|
| **Module icons row** | Four minimal icons: weather, events, airport, zones |
| **Daily briefing card** | Mock briefing snippet: “Shift outlook: Moderate” |
| **Airport strip** | DCA · IAD · BWI as text badges |
| **Seasonal variants** | Winter snow / summer heat — optional later, not MVP |
| **Driver-type line** | “Rideshare · Delivery · Private · Professional” |
| **Dynamic OG route** | `app/opengraph-image.jsx` — Phase 2+ only if copy changes often |

Start with **one static PNG**. Variants can wait until brand guidelines exist.

---

## Checklist: when the OG image is created

Complete in order:

### Design

- [ ] Canvas **1200 × 630 px**, sRGB
- [ ] Product name + tagline + “Live MVP preview” (or similar honest label)
- [ ] DMV / driver intelligence theme visible at thumbnail size
- [ ] Export as `driveradardmv-og.png`

### Repo

- [ ] Save file to `public/og/driveradardmv-og.png`
- [ ] Remove or keep `.gitkeep` (optional — PNG makes folder non-empty)
- [ ] Confirm file is **not** git-LFS required unless repo already uses LFS

### Metadata ([`app/layout.jsx`](../app/layout.jsx))

**Only after the PNG exists in the repo**, add:

```javascript
openGraph: {
  // ...existing fields...
  images: [
    {
      url: "/og/driveradardmv-og.png",
      width: 1200,
      height: 630,
      alt: "DriveRadarDMV — DMV driver intelligence MVP preview"
    }
  ]
},
twitter: {
  card: "summary_large_image",
  // ...existing title and description...
  images: ["/og/driveradardmv-og.png"]
}
```

Do **not** add `openGraph.images` or `twitter.images` until the file is committed — broken image URLs hurt trust on shares.

### Verify

- [ ] `npm run build` passes
- [ ] Open `https://YOUR-DOMAIN/og/driveradardmv-og.png` in browser (200 OK)
- [ ] Test share preview: [opengraph.xyz](https://www.opengraph.xyz/) or platform debuggers
- [ ] Paste link in Slack / iMessage — image, title, description look correct
- [ ] Update [SEO_PLAN.md](./SEO_PLAN.md) and [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) — mark OG image shipped

---

## Current status (metadata)

| Item | Status |
|---|---|
| OG title, description, URL in `layout.jsx` | ✅ Shipped |
| OG image file | ❌ Not added — folder `public/og/` reserved |
| `openGraph.images` in metadata | ❌ Intentionally omitted until PNG exists |
| Twitter card | `summary` (text-only) until image ships; then switch to `summary_large_image` |

This is **honest metadata**: we do not claim a preview image exists before the file is in the repo.

---

## Tools to create the image (no repo dependencies)

Use any design tool you already have — **nothing new is installed in this project**:

- Figma, Canva, Sketch, Affinity Designer, or Photoshop
- Export PNG at 1200×630

No image-generation npm packages, no external OG APIs, no paid stock required for a simple branded card.

---

## Summary

| Question | Answer |
|---|---|
| Is the OG PNG in the repo? | **No** — plan and `public/og/` folder only |
| Recommended path | `public/og/driveradardmv-og.png` → URL `/og/driveradardmv-og.png` |
| Will the app break without it? | **No** — text previews work today |
| When to wire `layout.jsx` | After the PNG is committed |

---

*Last updated: Phase 0 — plan and placeholder folder. Update when `driveradardmv-og.png` ships.*
