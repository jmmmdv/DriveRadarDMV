# Custom Domain Setup

Step-by-step plan to connect **driveradardmv.com** to the DriveRadarDMV Vercel production deployment. This is **documentation only** — DNS and Vercel changes are done manually in your registrar and Vercel dashboard.

**Project home:** [README](../README.md) · **Current production URL:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/) · **Planned domain:** [driveradardmv.com](https://driveradardmv.com)

**Related:** [SEO_PLAN.md](./SEO_PLAN.md) · [MVP_ROADMAP.md](./MVP_ROADMAP.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## Goal

Serve the DriveRadarDMV Next.js app on a branded domain:

| URL | Role |
|---|---|
| **https://drive-radar-dmv.vercel.app/** | Current Vercel production URL *(works today)* |
| **https://driveradardmv.com** | Planned primary custom domain (apex / root) |
| **https://www.driveradardmv.com** | Planned www subdomain |

Both apex and www should load the site over **HTTPS**. Pick one URL as the **canonical** primary (see [Redirect strategy](#redirect-strategy)); the other should redirect to it in Vercel.

---

## Prerequisites

- Domain **driveradardmv.com** registered at a DNS provider (Namecheap, Cloudflare, Google Domains, GoDaddy, etc.)
- Access to the **Vercel project** that deploys this GitHub repo
- Access to **DNS settings** at your registrar (or Cloudflare if DNS is hosted there)
- No code changes required to *start* DNS setup — the existing Vercel deployment stays live during configuration

---

## Recommended DNS setup for Vercel

Vercel assigns **project-specific** verification and routing values when you add a domain. Always copy values from **Vercel → Project → Settings → Domains** — they override any generic examples below.

### Typical records (verify in Vercel dashboard)

| Host / name | Type | Value (example — confirm in Vercel) | Purpose |
|---|---|---|---|
| `@` (apex) | **A** | `76.76.21.21` | Points root domain to Vercel |
| `@` (apex) | **AAAA** | *(optional — Vercel may provide IPv6)* | IPv6 if shown in dashboard |
| `www` | **CNAME** | `cname.vercel-dns.com` | Points www to Vercel |

Some registrars use **ALIAS**, **ANAME**, or **CNAME flattening** for the apex instead of an A record — follow your registrar’s Vercel integration guide if offered.

### Root domain setup (`driveradardmv.com`)

1. In Vercel, add domain: `driveradardmv.com`
2. Vercel shows required DNS records (often an **A record** for `@`)
3. At your registrar, create or update the record exactly as Vercel specifies
4. Remove conflicting old A/CNAME records for `@` that point elsewhere

### www subdomain setup (`www.driveradardmv.com`)

1. In Vercel, add domain: `www.driveradardmv.com`
2. Vercel typically asks for a **CNAME** from `www` → `cname.vercel-dns.com`
3. At your registrar, add the CNAME for host `www`
4. Do not point `www` to an IP address — use CNAME as Vercel instructs

### Redirect strategy

Choose one canonical host and configure the redirect in **Vercel Domains** (recommended):

| Option | Canonical | Redirect |
|---|---|---|
| **A — Apex primary** *(matches planned production URL)* | `https://driveradardmv.com` | `www` → apex |
| **B — www primary** | `https://www.driveradardmv.com` | apex → www |

For SEO, use **one** canonical URL everywhere (`metadataBase`, README, shared links). Option A aligns with this doc’s planned production URL.

---

## HTTPS / SSL expectations

- Vercel provisions **free SSL certificates** (Let’s Encrypt) automatically after DNS validates
- Certificate issuance usually takes **minutes to a few hours** after DNS is correct
- Browsers should show a padlock for both apex and www once valid
- No certificate files go in the repo — Vercel manages renewal
- If SSL shows “pending,” DNS is often still propagating or a record is wrong — see [Troubleshooting](#troubleshooting-checklist)

---

## Step-by-step (beginner-friendly)

### Step 1 — Add domains in Vercel

1. Open [vercel.com](https://vercel.com/) and select the **DriveRadarDMV** project
2. Go to **Settings → Domains**
3. Click **Add** and enter `driveradardmv.com` → confirm
4. Click **Add** again and enter `www.driveradardmv.com` → confirm
5. Leave this tab open — Vercel shows the DNS records you need for each domain

### Step 2 — Add DNS records at your registrar

1. Log in to where you bought **driveradardmv.com**
2. Open **DNS management** / **Advanced DNS**
3. Add the records Vercel displayed (A for apex, CNAME for www)
4. Save changes
5. If using **Cloudflare**: start with DNS-only (grey cloud) until first successful verification, unless you intentionally want Cloudflare proxy features

### Step 3 — Verify domain status in Vercel

1. Return to **Vercel → Settings → Domains**
2. Each domain should move from **Invalid configuration** → **Valid configuration**
3. Vercel may show a **Verify** button or automatic polling — wait and refresh
4. Configure **redirect** so apex and www resolve to your chosen canonical host

### Step 4 — Wait for DNS propagation

- Propagation can take **5 minutes to 48 hours** (often under 1 hour)
- TTL on old records affects how long stale DNS persists
- Use public checkers (optional):
  - [dnschecker.org](https://dnschecker.org/) — search `driveradardmv.com` A record
  - Terminal: `dig driveradardmv.com` or `dig www.driveradardmv.com`

### Step 5 — Test both URLs

Confirm in a browser (or curl):

```bash
curl -I https://driveradardmv.com
curl -I https://www.driveradardmv.com
```

Checklist:

- [ ] `https://driveradardmv.com` loads the homepage (200 OK)
- [ ] `https://www.driveradardmv.com` loads or redirects to canonical URL
- [ ] HTTPS padlock present, no certificate warnings
- [ ] `https://drive-radar-dmv.vercel.app/` still works (Vercel default URL remains available)
- [ ] Waitlist, weather, and navigation behave the same as on the Vercel URL

---

## Verification checklist

Before announcing the custom domain:

| Check | Done |
|---|---|
| Vercel shows **Valid configuration** for apex and www | ☐ |
| SSL certificate active (not “Pending”) | ☐ |
| Canonical redirect configured (one primary URL) | ☐ |
| Homepage loads on custom domain | ☐ |
| No mixed-content browser warnings | ☐ |
| Old DNS records removed or updated (no duplicate A/CNAME conflicts) | ☐ |
| [After domain is live](#after-domain-is-live) repo updates planned or completed | ☐ |

---

## Troubleshooting checklist

| Symptom | Likely cause | What to try |
|---|---|---|
| **Invalid configuration** in Vercel | Wrong record type or value | Re-copy records from Vercel; remove typos in host name |
| Works on Vercel URL but not custom domain | DNS not propagated or not added | Wait; run `dig`; verify registrar saved records |
| **SSL pending** for hours | DNS not fully pointing to Vercel | Confirm A/CNAME; avoid pointing apex CNAME where registrar forbids it |
| **www** works, apex does not | Missing A record on `@` | Add apex A record per Vercel |
| **apex** works, **www** does not | Missing or wrong CNAME | Add `www` CNAME to `cname.vercel-dns.com` |
| Redirect loop | Conflicting redirect rules | Use Vercel domain redirect only; remove registrar-level redirect duplicates |
| Cloudflare orange-cloud issues | Proxy + SSL mode mismatch | Try DNS-only first; set SSL mode to Full |
| Site shows old non-Vercel content | Stale DNS or parked domain page | Lower TTL; clear local DNS cache; check registrar parking |

---

## Rollback / safety notes

- **Vercel URL stays live:** `https://drive-radar-dmv.vercel.app/` continues to work even if custom domain DNS fails — no downtime for the default URL
- **Rollback DNS:** Revert registrar records to previous values; remove domains from Vercel if abandoning custom domain
- **No deploy required** for initial DNS hookup — same production deployment serves all configured domains
- **Do not delete** the Vercel project or Git integration while testing DNS
- **Document canonical choice** in repo after cutover so SEO and links stay consistent

---

## Do not commit secrets

Custom domain setup **does not require**:

- `.env` files
- API keys or Vercel tokens in the repository
- Registrar passwords or account credentials in git
- DNS verification tokens pasted into source code (Vercel DNS verification uses public DNS records, not repo secrets)

All domain work happens in the **Vercel dashboard** and **registrar DNS panel**. If you add Vercel environment variables later for other features, never commit their values — document variable *names* only in README when needed.

---

## After domain is live

Complete these repo and deploy updates **after** HTTPS works on your canonical URL:

### 1. Update README live demo link

In [`README.md`](../README.md), set the primary **Live demo** link to `https://driveradardmv.com` (or `https://www.driveradardmv.com` if that is canonical). Keep a note that the Vercel URL remains a valid fallback.

### 2. Update `metadataBase` in `app/layout.jsx`

Change `SITE_URL` / `metadataBase` to the canonical HTTPS URL, for example:

```javascript
const SITE_URL = "https://driveradardmv.com/";
```

Also update `openGraph.url` and `authors[].url` if they reference the old Vercel URL.

### 3. Update SEO docs

- [`docs/SEO_PLAN.md`](./SEO_PLAN.md) — refresh **metadataBase** table and canonical notes
- Re-test social previews after deploy (Slack, iMessage, [opengraph.xyz](https://www.opengraph.xyz/) when OG image exists)

### 4. Refresh screenshots (optional)

If the visible URL or branding in screenshots should reflect the custom domain:

```bash
npm run dev          # in one terminal
npm run screenshots  # in another — see scripts/capture-screenshots.js
```

Update [`docs/assets/screenshots/`](../docs/assets/screenshots/) and README embeds if needed.

### 5. Re-run build and push

```bash
npm run lint
npm run build
git add README.md app/layout.jsx docs/
git commit -m "Point production URLs to driveradardmv.com"
git push
```

Vercel redeploys automatically from GitHub.

### 6. Other references to scan

| Location | Action |
|---|---|
| [`app/page.jsx`](../app/page.jsx) footer link | Already references driveradardmv.com — verify href matches canonical |
| [`docs/MVP_ROADMAP.md`](./MVP_ROADMAP.md) | Mark custom domain deliverable complete |
| [`docs/ISSUES_BACKLOG.md`](./ISSUES_BACKLOG.md) | Close DNS doc issue; track “domain live” cutover if separate |

---

## Summary

| Question | Answer |
|---|---|
| Is the custom domain live in code today? | **No** — `metadataBase` still uses the Vercel URL until cutover |
| Do you need `.env` for DNS? | **No** |
| Where is DNS configured? | Registrar DNS panel + Vercel **Settings → Domains** |
| Safe to proceed while git is clean? | **Yes** — DNS is outside the repo |

---

*Last updated: Phase 0 planning. Mark steps complete in [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) when the domain is verified and repo URLs are updated.*
