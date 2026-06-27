# Web-first vs mobile app strategy

When to ship **web + PWA**, when to add **App Store / Play Store**, and how that affects profitability.

**Project home:** [README](../README.md)

**Related:** [PHASE1_PAID_READY.md](./PHASE1_PAID_READY.md) · [MONETIZATION.md](./MONETIZATION.md) · [MVP_ROADMAP.md](./MVP_ROADMAP.md)

---

## Recommendation

**Web-first until you have habit, then wrap — do not rebuild natively yet.**

| Phase | Channel | Why |
|---|---|---|
| **Now → paid-ready** | Mobile web (current Next.js site) | Zero store cut; fast iteration; no review delays |
| **50+ weekly actives** | PWA “Add to Home Screen” | App-like icon; optional |
| **100+ weekly actives + accounts + push** | App Store / Play Store via **Capacitor** or **Expo** wrapper | Discovery + push reliability |
| **$2k+ MRR** | Consider native polish or React Native | Only if wrapper limits UX |

---

## Option comparison

| | Mobile web (now) | PWA | Store wrapper | Full native app |
|---|---|---|---|---|
| **Cost** | $0 extra | Low | Medium | High |
| **Time to ship** | Done | Days | Weeks | Months |
| **Push notifications** | Limited (iOS) | Limited iOS | Good with setup | Best |
| **Store discovery** | SEO only | SEO only | Yes | Yes |
| **Store fee** | 0% | 0% | 15–30% | 15–30% |
| **Iteration speed** | Fastest | Fast | Medium | Slowest |
| **Driver trust** | Good with custom domain | Good | Higher ( “real app”) | Highest |

---

## Store economics (subscription $9.99/mo)

| | Web (Stripe) | App Store (15–30% fee) |
|---|---|---|
| Gross | $9.99 | $9.99 |
| Platform fee | ~3% Stripe | ~$1.50–3.00 |
| Net (approx) | ~$9.70 | ~$7.00–8.50 |

**Implication:** Web checkout is more profitable early; offer store app for convenience, not as only channel.

---

## App Store requirements (when you’re ready)

- [ ] Privacy policy URL
- [ ] Working product (not mostly static demo) — see [PHASE1_PAID_READY.md](./PHASE1_PAID_READY.md)
- [ ] Accounts + subscription via StoreKit / Play Billing (or RevenueCat)
- [ ] Support contact email
- [ ] No misleading earnings claims
- [ ] Apple/Google subscription restore + cancel flow

Reviewers reject **placeholder** apps. Finish Tier A in PHASE1_PAID_READY first.

---

## Technical path (when validated)

1. **Capacitor** — wrap existing Next.js static/export or point WebView to production URL  
2. **Expo + WebView** — similar; good if team knows React Native  
3. **RevenueCat** — simplifies iOS + Android subscriptions (free tier available; no secrets in repo)

Do **not** add these dependencies until B1–B5 in PHASE1_PAID_READY are planned.

---

## One-time purchase on stores?

| Model | Verdict |
|---|---|
| Monthly subscription | **Primary** — matches daily briefing |
| Annual subscription | **Secondary** — retention discount |
| One-time $19–49 | **Not recommended** — users expect ongoing updates for data products |

Exception: sell a **PDF airport guide** as separate SKU later — not core product.

---

## Decision gate — “OK to submit to stores”

- [ ] PHASE1_PAID_READY Tier A complete  
- [ ] 100+ weekly active web users OR 50+ email waitlist with 40% open rate on digest  
- [ ] Push notifications working (digest or alert)  
- [ ] Privacy policy live  
- [ ] 4.0+ average on trust/usefulness from ≥10 driver interviews  

Until then: share **https://drive-radar-dmv.vercel.app/** (later **driveradardmv.com**) in driver groups.

---

*Web proves value; stores scale discovery. Prove value first.*
