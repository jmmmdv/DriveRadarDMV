# Analytics Plan

Privacy-first analytics planning for DriveRadarDMV. This document describes **what we intend to measure and how** — not what is implemented today.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Stage:** Planning only — **no analytics code shipped yet**

**Related:** [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) · [MVP_ROADMAP.md](./MVP_ROADMAP.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## Why analytics matter for DriveRadarDMV

DriveRadarDMV is building trust with drivers who share sensitive work context — where they drive, when they work, and how they earn. Before accounts, payments, or personalized briefings, we still need **aggregate, anonymous signals** to answer basic product questions:

- Are DMV drivers finding the homepage and understanding the product?
- Which intelligence sections (weather, events, airports, zones, briefing) get attention?
- Does the waitlist preview get interaction even though it does not store data yet?
- Do visitors click through to the live demo, GitHub, or roadmap?

These answers help prioritize Phase 1 live data work and Phase 2 validation — without treating drivers as a data product.

---

## Privacy-first principles

1. **Measure product usage, not people.** Count events and page views in aggregate; do not build driver profiles.
2. **Collect the minimum needed.** If a metric does not change a product decision, do not track it.
3. **No hidden tracking.** Every analytics tool and event must be documented in this plan and visible in the repo or deployment config.
4. **No selling user data.** Analytics exists to improve DriveRadarDMV — not for ad networks or third-party data brokers.
5. **Prefer cookieless, aggregated tools.** Favor providers that work without cross-site identifiers when possible.
6. **Region-level geography only.** Coarse location (e.g. “Virginia, US”) is acceptable for understanding DMV interest; precise GPS is not.
7. **Align with future privacy policy.** When a privacy policy ships (Phase 2), analytics practices must match what we describe there.
8. **Drivers stay in control.** When accounts exist, analytics must not override explicit user privacy settings.

---

## What to measure in the MVP

Safe, high-value metrics for Phase 0–1:

| Category | Metric | Purpose |
|---|---|---|
| **Traffic** | Homepage visits (daily / weekly) | Baseline awareness and deploy health |
| **Traffic** | Unique visitors (aggregated, cookieless if possible) | Rough reach without identity |
| **Engagement** | Scroll or view of intelligence sections | Which modules deserve live data first |
| **Engagement** | Daily briefing section visibility | Validates the “decision layer” narrative |
| **Engagement** | Waitlist form: open / focus / submit (frontend event) | Interest in early access before backend exists |
| **Conversion** | CTA clicks: “Open live demo”, “View source”, roadmap links | Funnel from story → action |
| **Context** | Device type / screen size category (mobile vs desktop) | Confirms mobile-first UX investment |
| **Context** | General region-level interest (state or country) | DMV vs out-of-region curiosity — not driver home address |

### Safe event examples

Use short, descriptive event names. Examples only — implement when a provider is chosen:

| Event name | When it fires | Notes |
|---|---|---|
| `page_view` | Page load | Path only (e.g. `/`), no query strings with PII |
| `section_view` | Section enters viewport | `section`: `briefing`, `weather`, `events`, `airports`, `zones`, `waitlist`, `roadmap` |
| `cta_click` | User clicks primary CTA | `target`: `live_demo`, `github`, `roadmap_doc` |
| `waitlist_interact` | User focuses or submits waitlist form | `action`: `focus`, `submit_success_ui` — no name/email in payload |
| `nav_click` | In-page nav anchor used | `anchor`: `briefing`, `weather`, etc. |

All events should use **coarse properties only** (section IDs, button labels, device category). Never attach form field values to analytics events.

---

## What NOT to collect

DriveRadarDMV must **never** collect the following in analytics (or any passive tracking):

| Do not collect | Why |
|---|---|
| Exact driver location / GPS coordinates | Reveals work patterns and personal movement |
| Trip details (pickups, drop-offs, routes) | Core gig-economy sensitive data |
| Passenger or customer data | Third-party privacy violation |
| License plate or vehicle identifiers | Identifies individuals |
| Personal driving history or earnings | High-sensitivity financial/behavioral data |
| Name, email, phone from waitlist in analytics | Belongs in waitlist backend only, with consent — not in page analytics |
| Cross-site browsing history | Not relevant; invasive |
| Fingerprinting for persistent identity | Violates privacy-first stance |
| Hidden pixels or undeclared third-party trackers | Breaks trust and compliance expectations |
| Data sold or shared with advertisers | Conflicts with product principles |

If a proposed metric feels like surveillance, **do not ship it**.

---

## Recommended future analytics options

**Do not install these until this plan is reviewed and an issue is completed.** Options below are privacy-oriented and suitable for a Next.js + Vercel stack:

| Tool | Fit | Privacy notes |
|---|---|---|
| **[Vercel Analytics](https://vercel.com/docs/analytics)** | Native to current hosting | Web Vitals + page views; no cookies on visitors; easy enable in dashboard |
| **[Plausible](https://plausible.io/)** | Lightweight, privacy-focused | Cookieless; open source option; self-host or cloud |
| **[Simple Analytics](https://www.simpleanalytics.com/)** | Minimal dashboard | No cookies; GDPR-friendly positioning |
| **[PostHog](https://posthog.com/)** *(with privacy controls)* | Product analytics + optional session replay | Use **cookieless mode**, disable session replay initially, avoid identifying users until accounts exist |

**Suggested default for Phase 0:** Vercel Analytics — zero extra dependencies, aligns with existing deploy, no secrets in repo for basic page metrics.

**When waitlist backend ships:** Keep waitlist PII in the form backend/database only. Analytics may count `waitlist_submit` as a boolean event, not store the submission payload.

---

## Risk checklist

Before enabling any analytics provider, confirm:

- [ ] Provider and scope documented in this file and [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)
- [ ] No new npm dependencies unless explicitly approved (Vercel Analytics may be dashboard-only)
- [ ] No `.env` secrets committed; any API keys only in Vercel project settings
- [ ] No cookies required **or** cookie/consent approach documented for EU/VA users if cookies are used
- [ ] Event list reviewed — no PII, no form values, no precise geo
- [ ] README or future privacy policy mentions analytics at a high level
- [ ] Session replay (if ever enabled) masks inputs and excludes waitlist fields
- [ ] Team agrees: **we do not sell analytics data**

---

## Implementation phases

### Phase 0 — Planning *(current)*

- [x] Document analytics goals, boundaries, and event examples (this file)
- [ ] Choose provider (recommend Vercel Analytics for first enable)
- [ ] No tracking scripts in the app yet

### Phase 1 — Baseline traffic (post–Phase 0)

- [ ] Enable chosen provider on production only (or staging + production with separate projects)
- [ ] Verify homepage page views and core Web Vitals
- [ ] Add short privacy note to README: “We use privacy-friendly analytics to count visits; we do not track your trips or personal driving data.”
- [ ] Optional: lightweight custom events for `cta_click` and `section_view` if provider supports it without heavy SDK

### Phase 2 — Validation funnel

- [ ] Track waitlist UI interactions (submit success UI only — no field data)
- [ ] Track briefing and intelligence section engagement
- [ ] Correlate with driver interviews and feedback forms ([ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md))
- [ ] Draft privacy policy section on analytics; link from footer when policy exists

### Phase 3 — Product analytics (accounts optional)

- [ ] If PostHog or similar: strict privacy config, no replay by default
- [ ] Logged-in users: separate analytics identity policy documented
- [ ] Premium conversion funnel (aggregate only)
- [ ] Annual review: delete unused events and providers

---

## Summary

| Question | Answer |
|---|---|
| Is analytics live today? | **No** |
| Will we track drivers’ trips or location? | **No** |
| Will waitlist emails go to analytics? | **No** — backend only, with consent |
| First likely tool | Vercel Analytics (dashboard enable, no repo secrets) |
| Where to track implementation | [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) — privacy-safe analytics issue |

---

*Last updated: Phase 0 planning. Update this document when a provider is selected or events are implemented.*
