---
name: b2b-leadgen-india
description: B2B lead generation for an alcohol-free perfume-oil brand selling bulk oils to Indian buyers. Finds, verifies, de-duplicates and scores Indian D2C perfume/attar brands and attar shops/perfume counters (Instagram, websites, Google Maps, IndiaMART, marketplaces, trade-fair lists), records them in sales/leads.csv, and drafts personalised discovery-interview or follow-up messages for the founders to send themselves — with India DPDP privacy guardrails. Use this whenever the user wants leads, prospects, buyers, a target list, "who should we contact", outreach or follow-up drafts, to qualify or score a business, or to plan who to interview — even if they don't say "lead gen".
---

# B2B Lead Gen — India

The brand needs **15–20 buyer discovery interviews before the December Dubai trip** and **at least 5 signed letters of intent by January 2027** before it spends on CDSCO registration. Leads exist to feed those conversations. A short list of well-researched, genuinely relevant businesses beats a long scraped list: two part-time founders can only have a few real conversations a week, and spammy outreach burns the brand before it exists.

Context: `docs/business-plan.md` (segments, B2B terms), `.agents/product-marketing.md` (positioning, banned claims), `docs/research/buyer-interview-script.md` (what the interview is for).

## Who we're looking for
- **Segment A — D2C perfume / attar brands** (primary): Indian brands selling attars, perfume oils, roll-ons or perfumes online (own site, Instagram, Amazon/Nykaa/quick-commerce). Small-to-mid brands that buy oils from importers or Kannauj/Mumbai houses.
- **Segment B — attar shops / perfume counters** (primary): established shops in Chennai first (T. Nagar, Triplicane, Mylapore, Parrys), then Bengaluru, Hyderabad, Mumbai, Delhi.
- **Lower fit:** soap/candle/agarbatti makers (price-driven), sellers whose whole range is designer dupes ("Sauvage type", "inspired by") — we won't supply designer-named oils, so note them but score low.

## Workflow
1. **Read `sales/leads.csv` first** — never add duplicates (match on website, Instagram handle or business name + city).
2. **Search** using `references/sources.md`. Prefer web search and public pages; use the Apify scraper (if available) only for bulk Google Maps / Instagram pulls — it spends the user's credits, so say roughly how many results you'll pull first.
3. **Verify** each lead: the business is real and active (recent posts/orders/reviews), sells relevant products, and has a public **business** contact.
4. **Score** with `references/scoring.md`; write a one-line reason.
5. **Write rows** to `sales/leads.csv` (schema below); keep values tidy (status from the list; `;` between multiple values).
6. **Draft outreach** only when asked or for the top-scored new leads: use `references/outreach.md`. Drafts go in the reply (and optionally `sales/drafts/<slug>.md`) — **the founders send everything themselves**.
7. **Summarise**: how many found/added, top 5 and why, who to approach in person this week (Chennai shops), gaps.

## Privacy & conduct guardrails (DPDP Act 2023 + common sense)
- Collect **business** information from **public business listings only** (company sites, business Instagram profiles, Google Maps business listings, IndiaMART). No personal profiles, no personal phone numbers that aren't published for the business, no buying/scraping contact lists.
- Store the minimum (business name, role-based contact, public business email/phone, source URL). Record the source of every contact.
- **Every first message includes an opt-out line** ("If this isn't relevant, just say so and we won't follow up"). Mark opt-outs `status=opt-out` and never contact them again.
- **No WhatsApp broadcasts or bulk messaging.** One-to-one messages only, and only to numbers published for business contact. Max one follow-up after ~5–7 days without reply.
- No claims we don't make (halal, designer names, longevity numbers, "Made in Dubai") — outreach is discovery, not a pitch.

## `sales/leads.csv` schema
```
slug,business,segment,city,state,website,instagram,followers_approx,channels,product_fit,size_signals,contact_role,business_email,business_phone,source_urls,found_on,score,score_reasons,status,last_touch,next_step,notes
```
- `segment`: `d2c-brand` | `attar-shop` | `perfume-counter` | `other`
- `status`: `new` → `qualified` → `drafted` → `contacted` → `replied` → `interview-booked` → `interviewed` → `sample-requested` → `loi-signed` | `not-a-fit` | `opt-out`
- Interviews themselves are logged in `docs/research/interview-log.csv`.

**Google Drive mirror (optional):** if a Drive tool is available, mirror `sales/leads.csv` to a Google Sheet "Leads" in "Dubai Scents/Sales" so the co-founder can work from it; otherwise skip and mention once.
