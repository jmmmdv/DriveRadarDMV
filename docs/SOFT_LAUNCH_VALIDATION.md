# Soft Launch Validation Plan

How to validate DriveRadarDMV with real DMV drivers **before** a wide public launch. This is a **research and outreach plan** — no code, analytics, or paid tools required.

**Project home:** [README](../README.md) · **Live demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

**Related:** [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) · [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) · [MVP_ROADMAP.md](./MVP_ROADMAP.md) · [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)

---

## Goal of soft launch

Learn whether DMV drivers **understand**, **trust**, and **would use** the MVP — without pretending the product is fully live.

Soft launch answers:

- Do drivers grasp the one-line value (*DMV driver intelligence before your shift*)?
- Which sections (briefing, weather, events, airports, zones) feel useful vs confusing?
- Are MVP labels honest enough (preview vs live weather)?
- Would drivers return weekly or join early access — **before** you build accounts, payments, or live data everywhere?

**Not the goal yet:** viral growth, paid ads, or proving revenue. This is **product–market signal**, not scale.

---

## Who to ask first

Start with people who will give honest feedback quickly — ideally **3–5 drivers** in the first week, expanding to **5–10** before public launch.

### Recommended tester profiles

| Profile | Why they matter |
|---|---|
| **Uber / Lyft rideshare drivers** | Core MVP audience; airport and event timing |
| **Uber Black / SUV drivers** | Professional expectations; airport and downtown demand |
| **Delivery drivers** (DoorDash, Instacart, Amazon Flex) | Weather and zone timing; different peak patterns |
| **Private / chauffeur drivers** | Briefing-style planning; less platform-specific UI |
| **DMV-area professional drivers** | Full-time or multi-app; regional intuition to compare against |

### Where to find them

- Personal network (friends who drive gig work)
- Local driver Facebook groups or Reddit (r/uberdrivers, r/deliverydrivers — follow group rules; no spam)
- Airport waiting areas *(ask politely; respect platform rules)*
- Co-working / fleet meetups in DC, Arlington, Silver Spring, Baltimore corridor

**Do not** pay for respondent panels or ads for this phase — keep validation free and direct.

---

## 3–5 driver testing plan

Run each session in **10–15 minutes** on the **live demo** (phone preferred).

| Step | Time | What to do |
|---|---|---|
| **1. Context** | 1 min | “I’m building a DMV-focused driver briefing MVP. Not official traffic or earnings advice. I want your honest reaction.” |
| **2. Unaided first look** | 3 min | Send link; ask them to scroll silently on their phone. Do not coach. |
| **3. One-sentence test** | 1 min | “What does this product do?” — write their exact words. |
| **4. Guided walkthrough** | 4 min | Briefing → Weather → Events → Airports → Zones → Feedback / Waitlist. Note where they pause or frown. |
| **5. Core questions** | 4 min | Use [feedback questions](#feedback-questions-to-ask) below. |
| **6. Scorecard** | 2 min | Rate 1–5 on [scoring table](#simple-scoring-table). |
| **7. Close** | 1 min | “Can I follow up in a week?” Optional: note if they’d join waitlist when it’s real. |

### Session log template

Copy for each driver (Notes app, spreadsheet, or GitHub issue):

```
Date:
Driver type:
Main area:
One-sentence summary (their words):
Most useful section:
Most confusing section:
Missing:
Would check before shift? Y / M / N
Would join waitlist? Y / M / N
Scores: Clarity __ Usefulness __ Trust __ Visual __ Return __
Quotes:
Follow-up needed?
```

---

## Feedback questions to ask

Ask in conversation — not as a rigid survey. The homepage [Driver Feedback form](../app/components/DriverFeedbackForm.jsx) mirrors these themes but **does not store answers yet**; capture responses manually during interviews.

| # | Question |
|---|---|
| 1 | **Do you understand what this product does?** |
| 2 | **Would this help you decide where or when to drive?** |
| 3 | **Which section is most useful?** (briefing, weather, events, airports, zones) |
| 4 | **Which section is confusing or feels fake?** |
| 5 | **What is missing?** (data, areas, features) |
| 6 | **Would you check this before starting work?** (daily / weekly / never) |
| 7 | **Would you join an early access list** when sign-up is live? |

### Follow-up questions (when time allows)

- “What app do you open first before a shift today?”
- “How do you decide between DCA, IAD, and BWI?”
- “Did anything feel like it promised money you wouldn’t trust?”
- “Would a daily email briefing be useful, or is the website enough?”
- “What would make you share this with another driver?”

---

## What not to ask

Keep trust and scope clear — avoid questions that bias answers or overpromise:

| Do not ask | Why |
|---|---|
| “How much more would you earn with this?” | MVP cannot guarantee earnings |
| “Is this better than Uber’s map?” | We are not navigation; unfair comparison |
| “Will you pay $10/month right now?” | Too early; no payment flow |
| Leading: “You love the briefing, right?” | Skews feedback |
| For sensitive PII (home address, plate, earnings screenshots) | Not needed for soft launch |
| To install anything or create an account | Not built yet |

---

## Success signals

Green lights to proceed toward **public launch** or **Phase 1 live data** work:

| Signal | Target (soft launch) |
|---|---|
| **Clarity** | ≥4 of 5 testers describe the product correctly in one sentence |
| **Usefulness** | ≥3 of 5 say at least one section would influence shift planning |
| **Trust** | No one thinks static previews are disguised as live surge data |
| **Briefing** | Daily briefing seen as “useful” or “promising” by majority |
| **Return intent** | ≥3 of 5 would check weekly or before shifts (Yes or Maybe) |
| **Waitlist interest** | ≥2 of 5 would join early access when backend exists |
| **No blockers** | Zero “I would never use this because…” without a fixable reason |

---

## Red flags

Stop or fix before public launch if you hear:

| Red flag | Action |
|---|---|
| “I thought this was official Uber/Lyft/government” | Clarify copy and disclaimers on homepage |
| “This says live but looks fake” | Strengthen preview labels on static modules |
| “I entered my email — where did it go?” | Waitlist disclaimer more visible; explain frontend-only |
| “Guaranteed money / best zones to make $X” | Remove or reword any hype; audit metadata |
| Confusion about **what region** is covered | Emphasize DMV in hero and briefing |
| Mobile layout broken on common phones | Fix CSS before wider share |
| Weather shows wrong data with no fallback label | Fix NWS or fallback copy |

---

## Decision rules after feedback

Use findings to choose the next build step — not everything at once.

| If feedback shows… | Then prioritize… |
|---|---|
| Briefing unclear | Rewrite [`lib/dailyBriefing.js`](../lib/dailyBriefing.js) copy; simplify hero |
| Weather trusted, rest ignored | Phase 1 live data for **events** or **airports** first |
| Airports most requested | Live FAA / flight context in [DATA_SOURCES.md](./DATA_SOURCES.md) |
| “Need my neighborhood” | Saved zones in Phase 2 — note in backlog |
| Trust issues with previews | Stronger “Sample preview” badges globally |
| Strong weekly intent | Waitlist + feedback backend ([ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md)) |
| Weak overall usefulness | More driver interviews before public launch — do not scale outreach |
| Everyone asks for navigation | Reiterate positioning — not a maps app; adjust messaging only |

**Public launch gate:** Complete [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) and score **Green** on Technical, Product clarity, and Data readiness — plus soft launch success signals above.

---

## Simple scoring table

Ask each tester to rate **1 (low) – 5 (high)** after the walkthrough.

| Dimension | 1 | 3 | 5 | Driver 1 | Driver 2 | Driver 3 | Driver 4 | Driver 5 |
|---|---|---|---|---|---|---|---|---|
| **Clarity** — understood the product | Confused | Somewhat clear | Crystal clear | | | | | |
| **Usefulness** — would help driving decisions | Not at all | Maybe | Definitely | | | | | |
| **Trust** — honest about MVP limits | Feels misleading | OK | Fully trust labels | | | | | |
| **Visual impression** — readable on mobile | Poor | OK | Professional | | | | | |
| **Willingness to use again** — weekly check | Never | Maybe | Yes | | | | | |

**Average ≥3.5** on Clarity, Usefulness, and Trust → reasonable to expand to 10 drivers or soft public post.  
**Any score of 1** on Trust → fix copy before sharing widely.

---

## Outreach message templates

### Short SMS / WhatsApp

> Hey — I’m building a free DMV driver briefing MVP (weather, events, airports, zones) for gig drivers. Not live surge data — honest preview stage. Could you spend 10 min on your phone and tell me what’s confusing? [https://drive-radar-dmv.vercel.app/](https://drive-radar-dmv.vercel.app/) — totally fine to be blunt. Thanks!

### Slightly more professional (email / LinkedIn DM)

> Subject: Quick feedback on a DMV driver intelligence MVP?
>
> Hi [Name],
>
> I’m working on **DriveRadarDMV** — a mobile-friendly briefing for rideshare, delivery, and professional drivers in DC, Maryland, and Virginia. It combines weather (live), daily briefing, and preview cards for events, airports, and demand zones. This is an **early MVP**, not official traffic advice or earnings guarantees.
>
> Would you have **10–15 minutes** to open the demo on your phone and share honest feedback? [https://drive-radar-dmv.vercel.app/](https://drive-radar-dmv.vercel.app/)
>
> I’m especially interested in whether the daily briefing would help you decide when/where to drive. No account or install needed.
>
> Thank you,  
> [Your name]

### Follow-up after feedback

> Thanks again for looking at DriveRadarDMV. I noted your point about [specific feedback]. I’m fixing [X] / prioritizing [Y] for the next update. I’ll send one more message when [waitlist is live / airport section updates / etc.] — okay to ping you then?

---

## Next 7-day validation plan

| Day | Focus | Actions |
|---|---|---|
| **1** | Prepare | Run [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) technical + mobile checks; copy session log template |
| **2** | Recruit | Message 5–8 drivers (mix of rideshare + delivery); schedule 3 calls or async reviews |
| **3** | Test | Complete 2 sessions; log scores and quotes same day |
| **4** | Test | Complete 2–3 more sessions; note patterns (not one-off opinions) |
| **5** | Synthesize | Top 3 confusions, top 3 requested features; update backlog priorities |
| **6** | Decide | Apply [decision rules](#decision-rules-after-feedback); open GitHub issues for copy fixes |
| **7** | Plan next | If signals green → plan public post + 5 more drivers; if red → iterate homepage only |

---

## Relationship to in-app forms

| Tool | Soft launch use |
|---|---|
| **Live demo URL** | Primary validation surface |
| **Driver Feedback form** | Show testers it exists; explain it does **not** save yet — capture answers in your log |
| **Waitlist form** | Same — gauge interest verbally; do not promise email capture until backend ships |
| **Analytics** | Not required; qualitative notes are enough for soft launch ([ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md)) |

---

## Related backlog

| Item | Doc / issue |
|---|---|
| Driver interviews (5–10) | [ISSUES_BACKLOG.md](./ISSUES_BACKLOG.md) |
| Full launch checklist | [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) |
| Validation preview (Phase 0) | [MVP_ROADMAP.md](./MVP_ROADMAP.md) |

---

*Last updated: Phase 0 soft launch. Summarize findings in a GitHub issue or doc appendix when complete.*
