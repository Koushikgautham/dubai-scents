# Search playbook

Use web search and fetch. Cast a wide net, then verify each candidate with primary evidence before it goes in a CSV. Record every URL you rely on.

## UAE perfume-oil manufacturers
- **Queries to try:** "perfume oil manufacturer Sharjah", "concentrated perfume oil factory Ajman", "fragrance oil manufacturer UAE private label", "CPO perfume oil manufacturer Dubai", "attar oil manufacturer UAE export", "perfume compound manufacturer Hamriyah / SAIF Zone / Ajman Free Zone".
- **Where manufacturers cluster:** Sharjah industrial areas and free zones (SAIF Zone, Hamriyah Free Zone), Ajman (industrial areas, Ajman Free Zone), Dubai (Jebel Ali / JAFZA, Al Quoz, Dubai Industrial City), Umm Al Quwain and Ras Al Khaimah (RAKEZ) also host some.
- **Evidence sources:** company website (look for factory photos, "manufacturing", licences, certifications such as ISO 22716 cosmetics GMP), free-zone company directories, Dubai/Sharjah/Ajman chamber of commerce member directories, exhibitor lists from Beautyworld Middle East (Dubai, usually October), LinkedIn company pages, Google Maps listings with an industrial address.
- **Telling manufacturers from traders:** manufacturers mention factories, R&D/perfumers, capacity, certifications, private label/OEM; traders list many brands, retail shop addresses (Deira, souks, malls) and "wholesale". Flag `type=unknown` until confirmed.
- **Big branded houses** (e.g. Ajmal, Rasasi, Lattafa, Armaf, Al Haramain, Swiss Arabian) mostly sell finished branded goods; some have OEM arms — note them but don't assume they'll private-label small volumes.

## Indian contract fillers
- **Start with the official register:** Tamil Nadu Drugs Control — licensed cosmetic manufacturers list (PDF): https://drugscontrol.tn.gov.in/pages/manufacturers_directory/cosmetics_list.pdf — check licence number and validity, and whether the unit is in an SEZ (e.g. MEPZ Tambaram).
- **Then:** IndiaMART / TradeIndia "perfume third party manufacturing Chennai", "attar private label manufacturer", "roll on perfume filling"; Kannauj attar houses offering OEM/white label; Mumbai perfume contract manufacturers. Anything from marketplaces must be cross-checked for a valid licence number before it's more than a `lead`.
- Licence must cover **category 41 non-hydroalcoholic perfumes** (ask if the register doesn't show categories).

## Customs brokers (Chennai)
- CBIC publishes licensed customs broker lists; also search "customs broker Chennai air cargo cosmetics", "CHA Chennai CDSCO clearance". Ask for experience with CDSCO-registered cosmetic imports and DG shipments.

## Packaging
- "roll on bottle 6ml 12ml manufacturer India", "aluminium bottle 500ml 1 litre fragrance oil", glass roll-on suppliers (Firozabad is India's glass hub; also Mumbai/Delhi traders).

## Verification checklist before a row becomes `listed`
- Real address + website or official listing ✔
- Business still active (recent posts/updates, working phone/website) ✔
- Manufacturer vs trader assessed ✔
- Source URLs recorded with check date ✔
