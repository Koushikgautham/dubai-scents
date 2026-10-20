# Art direction — website v1 (APPROVED by founders 2026-10-20 — tone: quiet luxury)

## Visual thesis — "Light through oil"
Everything orbits one object: a small glass roll-on of amber oil, lit like the desert at dusk. The site behaves like light moving through that oil — warm, slow, refracted, precise. Apple-level restraint (one idea per screen, big type, generous space), with warmth instead of chrome. **The product is the hero; no Arabian clichés** (no camels, lanterns, arabesque borders, faux-Arabic fonts) — the Gulf is felt through light, materials and colour, not costume.

## Skills used (smallest compatible set)
`build-awwwards-quality-sites` (orchestrator) · `cinematic-gsap-lenis-motion-system` (motion base) · `gsap-scrolltrigger-storytelling` (pinned product story) · `horizontal-scroll-scenes` (notes journey) · `masked-reveal` + `scroll-scrubbed-word-reveal` (type) · `book-serif-index` (Oil Library section only) · `webgl-3d-object` + `threejs` (bottle) · `progressive-blur`, `beautiful-shadows`, `css-border-gradient` (surfaces) · gates: `no-ai-design-slop`, `review-animations`, `interface-review`.

## Hero focal asset — the 3D roll-on (Three.js: **yes**, justified)
We have no product photos until December, and the product's essence is *light passing through amber oil* — something only real refraction can show.
- React Three Fiber + drei: thick clear glass body (transmission material, IOR ≈ 1.5, chromatic aberration subtle), inner amber oil volume with a soft meniscus, steel roller ball, brushed-gold cap (metalness 1, low roughness).
- Lighting from drei **Lightformers** (warm rim + soft top light) — no external HDR download.
- Behaviour: idle float + slow turn; damped pointer lean; scroll drives rotation, cap lift ("uncap") and camera dolly in the pinned story.
- Caption under hero: *"Bottle shown is a design concept."*
- Performance: DPR capped at 1.5 (1 on low-power), render paused offscreen / tab hidden, no per-frame allocation, disposed on unmount. **Poster fallback** (a still captured from the scene) under reduced motion, no WebGL or context loss.

## Colour system (tokens)
| Token | Hex | Use |
|---|---|---|
| `night` | `#0E0A07` | hero / dark sections background |
| `umber` | `#1A130D` | dark surfaces, cards on dark |
| `amber` | `#C77A1A` | oil, key accent (sparingly) |
| `glow` | `#E9A23B` | highlights, focus ring on dark |
| `gold` | `#BFA06A` | fine rules, cap, small labels |
| `sand` | `#F2EBE1` | light sections background (paper) |
| `dune` | `#E2D4BF` | light surfaces, dividers |
| `ink` | `#1B1510` | text on light |
| `smoke` | `#8C7D6C` | secondary text |
Rhythm: **dusk → day → dusk**. Dark hero and product story → light sand for the notes and Library → dark for business and the final call to action. Contrast checked to WCAG AA for all text.

## Typography
- **Display:** *Instrument Serif* (Google Fonts) — elegant, slightly condensed, modern editorial; large sizes only (clamp ~56–144 px), tight leading, occasional italic for one word per headline.
- **Text/UI:** *Geist* (next/font) — clean, neutral, excellent at small sizes.
- **Catalogue/codes:** *Geist Mono* — oil codes (OL-01), batch-style labels, specs.
- Rules: max ~65 characters per line; uppercase only for small tracked labels; no more than two weights per page.

## Section sequence & motion narrative (Home)
1. **Dusk — hero (dark).** Bottle rises from below into warm light (GSAP intro, 1.6 s); headline words unmask one by one: *"Fragrance, concentrated."*; sub-line: *"Alcohol-free perfume oils. Coming soon."*; CTAs: **Join the waitlist** · **For business**. Nav and CTAs usable from first frame.
2. **Anatomy (dark, pinned ~300vh).** Bottle pinned centre; scroll rotates it, lifts the cap, dollies in to the oil. Four callouts fade in on alternating sides: *Alcohol-free* → *Concentrated perfume oil* → *Fragrance oils from UAE manufacturers* → *Bottled in India*. Thin gold progress line on the left.
3. **Notes journey (dusk → day transition, horizontal).** Vertical scroll travels sideways through three chapters — *Top · Heart · Base* — each a full-bleed scene photo (licensed) with a large serif note name and two-line description; chapter index + progress at the bottom.
4. **The Oil Library (light sand, archival).** Catalogue grid of 6 oils (OL-01…OL-06) in mono codes + serif names + three profile words; hover/tap reveals the full notes with a soft spotlight; label: *"Small bottles of every oil we carry. Coming soon."*
5. **How oils wear (light).** Scroll-scrubbed word reveal of an honest paragraph: oils carry no alcohol, so they don't evaporate in a burst — they sit close to the skin and unfold slowly.
6. **For business (dark).** Three columns: *Bulk oils (500 g / 1 kg)* · *Documents with every batch (SDS, IFRA, COA)* · *Sample kits from January 2027* → **Trade enquiry**.
7. **Waitlist (dark → footer reveal).** Large serif line, email field, consent note; footer slides up beneath (progressive blur).

Global motion rules: **Lenis** as the only smooth-scroll engine (bypassed under reduced motion); GSAP for all choreography; CSS for hover/focus; reduced motion = final states, no scrubbing; no animation without a narrative job.

## Other pages (same system, calmer motion)
- **Collection:** three hero *profiles* as large editorial cards (no prices unless confirmed), Oil Library table, waitlist.
- **For Business:** what we supply, documents, working terms, trade-enquiry / sample-request form.
- **Contact:** email, WhatsApp, Chennai; short form. **Privacy / Terms:** clean long-form reading layout.

## Asset provenance plan
- **3D bottle:** authored in code (no external model).
- **Scene photos:** Unsplash (licence allows commercial use; credit kept in `web/ASSETS.md`): saffron threads, rose petals, oud/agarwood chips, desert dunes at dusk, amber resin — chosen for colour harmony, cropped deliberately, served via `next/image` (AVIF/WebP, lazy below the fold).
- **No** AI-generated images of the product, no stock people, no fake testimonials or partner logos. Icons: Solar via Iconify.
- All placeholder imagery is replaced with our own December shoot.

## Copy rules (checked with `india-cosmetics-compliance` before deploy)
Pre-launch wording only ("coming soon", "join the waitlist", "enquire"); no halal, designer names, longevity numbers, "Made in Dubai/UAE", or "available now". Brand name comes from `src/config/brand.ts` (currently the working name).
