---
name: market-intel-digest
description: Weekly market-intelligence digest for an alcohol-free perfume-oil brand importing from the UAE into India. Scans the last 7–14 days for regulation and trade changes (CDSCO, Cosmetics Rules, Legal Metrology, customs duty and CEPA notifications for Chapter 33, ASCI rulings), competitor and market moves (Indian D2C attar/perfume brands, Middle-Eastern brands entering India, funding, pricing, quick-commerce), prices and supply (AED/INR, freight, oud and oil supply news), trends, and opportunities (TANSEED/UYEGP/scheme calls, trade fairs), and flags anything that changes the project's "verify" items. Writes intel/digests/YYYY-MM-DD.md. Use this whenever the user asks for a weekly digest, market update, "what's new", competitor news, regulatory changes, price or trend updates, or opportunities — even if they don't say "digest".
---

# Market Intel Digest

Two part-time founders can't watch regulators, competitors and markets every day. Once a week, give them **one page** of what changed and why it matters to *this* business — so they never miss a duty change, a CDSCO notice or a competitor entering their niche, and never waste time on noise.

Context: `docs/business-plan.md`, `docs/decisions.md`, and the "verify" items in `.agents/skills/india-cosmetics-compliance/references/`.

## Workflow
1. Read `intel/watchlist.md` (what we track: competitors, regulators, queries, open threads) and the latest digest in `intel/digests/` (to carry over open threads and avoid repeating items).
2. Search the last **7–14 days** using the watchlist queries (`references/sources.md` lists where to look). Prefer primary sources (CBIC, CDSCO, DGFT, ASCI, company announcements) over aggregators.
3. Keep only items that matter to this business; for each, write **what happened → why it matters to us → action (if any)**. Every item needs a source link and its date. If nothing important happened in a section, say "Nothing material" — don't pad.
4. **Verify-item check:** if anything changes a fact the compliance skill or business plan relies on (duty rates, CEPA tables, CDSCO fees/process, labelling rules, sample limits), put it at the top under "⚠️ Changes to our assumptions" and name the file to update.
5. Write `intel/digests/YYYY-MM-DD.md` using the template below; update `intel/watchlist.md` (new competitors, closed threads, new queries).
6. Reply with the top 3 items and the action list.

## Digest template
```markdown
# Market intel — week of <date>
## ⚠️ Changes to our assumptions
- … (or "None this week")
## 1. Regulation & trade
## 2. Competitors & market
## 3. Prices & supply  (AED→INR rate with date; freight notes)
## 4. Trends & customers
## 5. Opportunities  (schemes, grants, fairs, buyer leads)
## Actions for this week
- [ ] …
## Open threads (carried over)
```

## Ground rules
- No speculation presented as news; label opinions as such. No paywalled claims you couldn't read.
- Numbers need a date and source (exchange rates, prices, duty).
- Keep it to roughly one page; link out for detail.
- Business contact data only if a lead appears (hand leads to `b2b-leadgen-india`).
