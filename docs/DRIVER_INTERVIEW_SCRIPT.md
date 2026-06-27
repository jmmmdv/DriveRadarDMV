# Driver Interview Script (10 drivers)

Structured script for **10 DMV driver conversations** (~15 minutes each). Use before premium, App Store, or paid ads.

**Project home:** [README](../README.md) · **Demo:** [drive-radar-dmv.vercel.app](https://drive-radar-dmv.vercel.app/)

**Related:** [SOFT_LAUNCH_VALIDATION.md](./SOFT_LAUNCH_VALIDATION.md) · [PHASE1_PAID_READY.md](./PHASE1_PAID_READY.md) · [MONETIZATION.md](./MONETIZATION.md)

---

## Before the call

- [ ] Send link 24h ahead: https://drive-radar-dmv.vercel.app/
- [ ] Ask them to open on **phone** before the call (5 min scroll)
- [ ] Recording: ask permission if recording; notes are fine otherwise
- [ ] Copy [session log template](#session-log-template) per driver

---

## Opening (1 min)

> “Thanks for helping. I’m building DriveRadarDMV — a DMV-focused briefing for gig and professional drivers. This is an early MVP, not official traffic or earnings advice. I want brutal honesty. There are no wrong answers.”

---

## Part 1 — Unaided reaction (3 min)

**Do not coach.**

1. “What do you think this product is for?”
2. “Who do you think would use it?”
3. “Would you use this today? Why or why not?”

*Write their exact words.*

---

## Part 2 — Walkthrough (4 min)

Scroll together (or ask what they clicked):

| Section | Ask |
|---|---|
| **Daily briefing** | “Is this useful before a shift? What’s missing?” |
| **Weather** | “Do you trust this? Would you still check a weather app?” |
| **Events / Airports / Zones** | “Which would change where you drive if it were accurate?” |
| **Waitlist / Feedback** | “Did you notice these don’t save yet? Is that clear?” |

---

## Part 3 — Core validation (4 min)

Ask every driver:

| # | Question | Notes |
|---|---|---|
| 1 | Do you understand what this product does? | Y / Partial / No |
| 2 | Would this help you decide **where** or **when** to drive? | Y / Maybe / No |
| 3 | Which section is **most** useful? | |
| 4 | Which section is **most** confusing or feels fake? | |
| 5 | What is **missing**? | |
| 6 | Would you check this **before starting work**? | Daily / Weekly / Rarely / Never |
| 7 | Would you **join an early access list** when sign-up works? | Y / Maybe / No |

---

## Part 4 — Payment intent (3 min) *(critical for profitability)*

> “Imagine the briefing updated daily with **real** events, airports, and your home zone — and you got a **text or email** 2 hours before your usual shift.”

| # | Question | Record |
|---|---|---|
| 8 | Would that be **more useful** than what you use today? | Y / Maybe / No |
| 9 | What do you use **today** before a shift? (apps, groups, gut) | |
| 10 | Would you pay **$8/month** for that? | Y / Maybe / No |
| 11 | What price would feel **fair**? $0 / $5 / $8 / $12 / $15+ | |
| 12 | **Monthly** or **annual** preference? | |
| 13 | What would make you **cancel** in the first month? | |

**Do not argue or sell.** If they say no, ask why.

---

## Part 5 — Scorecard (1 min)

Rate 1 (low) – 5 (high):

| Dimension | Score |
|---|---|
| Clarity | |
| Usefulness | |
| Trust | |
| Visual impression (mobile) | |
| Willingness to use again | |

---

## Closing (1 min)

> “Can I follow up in 2 weeks when [events/airports/alerts] improve? Any other drivers I should talk to?”

Offer to add them to waitlist when backend is live.

---

## Session log template

```
Driver #: ___
Date:
Type: Rideshare / Delivery / Black-SUV / Private / Other
Area: DC / Arlington / NoVA / MD / Baltimore
Full-time or part-time:

ONE-SENTENCE (their words):
Most useful section:
Most confusing section:
Missing:
Check before work: Daily / Weekly / Rarely / Never
Would pay $8/mo: Y / Maybe / No
Fair price: $
Would cancel because:

Scores: Clarity __ Usefulness __ Trust __ Visual __ Return __

Best quote:
Follow-up OK: Y / N
Referral name (optional):
```

---

## After 10 interviews — synthesis

Fill in after all sessions:

| Metric | Target | Your result |
|---|---|---|
| Correct one-sentence product description | ≥7/10 | |
| Would check weekly+ | ≥5/10 | |
| Would pay $8/mo (Y or Maybe) | ≥5/10 | |
| Avg trust score | ≥3.5/5 | |
| Top requested feature | | |
| Top confusion | | |

**Decision:**

| Result | Next step |
|---|---|
| ≥5 would pay Maybe/Yes | Proceed to waitlist backend + live events/airports |
| &lt;3 would pay | Fix briefing clarity before building premium |
| Trust avg &lt;3 | Fix labels and live data honesty first |
| Everyone wants navigation | Adjust messaging — not a maps app |

Log summary in a GitHub issue titled `Driver validation synthesis — [month year]`.

---

## Outreach snippets

**SMS:**  
> Hey — 15 min favor? I built a DMV driver briefing MVP and need honest feedback from someone who actually drives. [link] — blunt is good.

**Follow-up:**  
> Thanks again. Your note about [X] is going into the next update. OK if I ping you when early access opens?

---

*10 conversations beat 10 hours of solo coding for profitability decisions.*
