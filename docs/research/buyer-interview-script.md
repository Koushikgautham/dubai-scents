# Buyer discovery interviews — script (v1, 2026-10-20)

**Why we're doing these:** before spending ~₹1.5–2L on CDSCO registration, we need evidence that Indian buyers want what we'll sell — and **at least 5 signed (non-binding) letters of intent by January 2027** (the go/no-go gate). These interviews are *discovery*, not sales calls: we're here to learn how they buy today, what hurts, and what they'd pay for. Selling comes later.

**Who:** 15–20 conversations before the December Dubai trip.
- **Track A — D2C perfume / attar brands** (founders or sourcing heads): video or phone, 30–40 min.
- **Track B — attar shops / perfume counters** (owners): in person, informal, 15–20 min (adapt on the fly).

**Who leads:** co-founder runs most calls; one person asks, the other takes notes (verbatim quotes matter more than summaries). Log every interview in `interview-log.csv` the same day.

---

## Facilitator rules (read before every call)
- **Listen 80%, talk 20%.** If you're explaining our product in the first 25 minutes, you've slipped into pitching.
- **Ask about the past, not the future.** "Tell me about the last time you…" beats "Would you buy…?" — people are bad at predicting their own behaviour and too polite to say no.
- **No leading questions.** Not "Is finding good oils frustrating?" → "How do you find oils today?"
- **Never make the claims we don't make** (Made in Dubai, halal, designer "type" names, longevity numbers). If asked what we do, say: *"We're setting up to supply alcohol-free perfume oils from UAE manufacturers, filled in India, with full documentation. We're about six months from launch, so right now we're learning."*
- **Probe** with: "Tell me more about that." · "Why was that important?" · "What happened next?" · "Can you give me an example?" · "How did you handle it?"
- **Silence is a tool.** After an answer, wait 3 seconds before the next question.
- **Tangents:** if useful, follow for a minute; otherwise "That's really helpful — I want to make sure we get to X…"
- **Write down exact phrases** they use (for `.agents/product-marketing.md` → Customer Language).

---

## Track A — D2C perfume / attar brand (30–40 min)

### 1. Introduction (2–3 min)
> "Thanks for making time. We're two founders from Chennai setting up a business supplying perfume oils to Indian brands. We're not selling anything today — we're trying to understand how brands like yours source oils, so we build the right thing. There are no right or wrong answers. Is it OK if I take notes? [If recording: Is it OK to record, only for our notes?] Everything stays confidential."

### 2. Warm-up (3–5 min)
1. Tell me a bit about your brand — how did it start, and what do you sell today?
2. Roughly how many SKUs do you have, and which ones sell the most?
3. Where do most of your sales come from — your site, marketplaces, quick-commerce, offline?

### 3. Core exploration (20–25 min)

**Theme A — How they source today**
4. Walk me through how you sourced the oils for your current range. Who do you buy from?
   - *Probe:* How did you find them? How long have you worked with them?
5. Tell me about the last time you placed an order for oils. What happened, start to finish?
   - *Probe:* How much did you order? How long did it take to arrive? Anything go wrong?
6. What matters most to you when you choose a supplier — and why?
7. Have you ever switched suppliers or tried a new one? What made you do that?

**Theme B — Pain points**
8. Tell me about a time an order or a supplier didn't go the way you expected.
   - *Probe:* What did it cost you (time, money, customers)? How did you handle it?
9. How do you check that a new batch smells and performs like the last one?
10. What documents do you ask suppliers for, if any? (SDS, IFRA, COA…) What do you do with them?
11. How are you handling CDSCO / labelling requirements for your products today?

**Theme C — Product & customers**
12. How do your customers describe the scents they love? What words do they use?
13. Where do you see demand moving — which profiles or formats are growing for you?
14. What do your customers say about alcohol-free oils versus sprays, if anything?
15. How do you use the oil — sold neat as attar/roll-on, or diluted into sprays? At what dosage?

**Theme D — Economics**
16. Roughly what do you pay per kg today for the oils you use most? (If they won't share: "Is it under ₹3k, 3–6k, 6–10k, or above 10k per kg?")
17. What volumes do you buy per scent, per order? How often?
18. What payment terms do you usually get?

### 4. Specific scenarios (8–10 min)
19. Imagine a supplier sent you 5 samples tomorrow. Walk me through how you'd evaluate them and decide.
20. If a new supplier wanted to work with you, what would they need to show you before you'd place a first order?
21. Exclusivity: how important is it that a scent you sell isn't sold by others? Have you ever had that? How did it work?

### 5. Wrap-up & ask (3–5 min)
22. Is there anything about sourcing oils I should have asked but didn't?
23. Who else should we talk to? (Ask for 1–2 introductions.)
24. **The ask (only if the conversation showed real interest):**
> "We'll have samples from our UAE manufacturers in January. Would you be open to evaluating a sample kit then? If the samples and documents meet your standard, would you be willing to sign a short, non-binding letter of intent — just saying you'd consider ordering, with an indicative volume? It helps us decide which oils to register."
- Note their answer verbatim. **Don't push.** A polite "maybe" is a maybe.

> "Thank you — this was genuinely useful. We'll be in touch in January with samples."

---

## Track B — attar shop / perfume counter (15–20 min, in person)

Shop owners are busy and experienced — be respectful, buy something small if appropriate, and keep it conversational. Visit at a quiet hour (late morning on a weekday).

1. How long has the shop been here? What sells best?
2. Where do you get your oils from? How did you find those suppliers?
3. Tell me about your last order — how much, from whom, how did it go?
4. How do you price — per tola, per ml? What's a typical price for your best-seller? (Note which "tola" they mean: weight or 12 ml bottle.)
5. What do customers ask for most these days? What are they asking for that's hard to get?
6. Do customers ask about alcohol-free, Dubai-origin, or long-lasting? What exactly do they say?
7. What would make you try a new supplier? What would make you stop using one?
8. How do you usually pay suppliers — advance, credit? How many days?
9. *(If warm)* "In January we'll have samples from UAE manufacturers — could I bring you a few to smell?"

**Watch for:** requests for designer "type" oils (note the demand, don't promise it), credit expectations, price per tola.

---

## After each interview (10 min, same day)
- Add a row to `docs/research/interview-log.csv`.
- Paste 3–5 **verbatim quotes** into the notes column.
- Mark interest 1–5 and LOI status (`none` / `maybe` / `sample-requested` / `loi-signed`).
- Every 5 interviews: run `customer-research` to synthesise themes and update `.agents/product-marketing.md` (pains, objections, customer language).
