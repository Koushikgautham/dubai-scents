# Decisions log

A running record of settled decisions. Add new entries at the top. The full reasoning lives in `business-plan.md`.

| Date | Decision | Why |
|---|---|---|
| 2026-10-22 | Hero bottle is now a pre-rendered Blender sequence. Cycles look-dev is in `web/assets-src/rollon.blend` (scene "RollOn"); the 120 frames are encoded to WebP (`public/bottle/d` 864 px, `public/bottle/m` 576 px) and scroll-scrubbed on a canvas. three.js, R3F and drei were removed | Real-time glass in three.js looked cheap. Cycles in the live Blender session (official Blender MCP) renders glass and amber oil correctly, and headless renders of the saved file now work too |
| 2026-10-20 | Website bottle is authored in Blender via script (`web/assets-src/rollon.py` → `public/models/rollon.glb`); runtime glass/oil materials tuned in three.js; poster captured from the web render | Reproducible asset; Blender 5.2 headless Cycles glass rendered black, so the web render is the source of truth |
| 2026-10-20 | Vercel project must use Root Directory `web` + Next.js; root `vercel.json` serves only a placeholder | Root-level static deploy exposed docs/ and sourcing/ on the production URL for ~30 min; closed by the placeholder |
| 2026-10-20 | Compliance skill tested and hardened; lead-gen and market-intel skills drafted (light-touch: validate on real use instead of full eval rounds) | Usage limits; baseline already strong on compliance, skill adds dependencies/format/project facts |
| 2026-10-20 | Daily perfume lessons via self-hosted n8n + OpenAI ($5 credit) + Telegram bot (`automations/n8n/`); deep practice stays in Claude Code. Names parked for later (see docs/brand-naming.md) | Saves Claude quota; free channel; home-server downtime acceptable for non-customer automation |
| 2026-10-20 | Name shortlist: Nafhaar (top), Samarah, Rawiya; Zaafira reserve. Tested shortlist + Argus prep promoted into sourcing/. Interview kit + LOI template + consumer survey created. Compliance skill drafted | Pre-trip sprint: name, buyer discovery and compliance are on the critical path |
| 2026-10-20 | Connectors: add Gmail + Calendar sign-in, Apify free tier; Canva later; n8n (self-hosted, free) off for agents, later used for weekly Supabase backups. No paid tier without cost+ROI sign-off | Free-only policy; routines+Supabase cover agent automation; home server not reliable enough for customer flows |
| 2026-10-20 | Built `perfume-tutor` and `uae-supplier-scout` (repo files + Google Drive mirror; tested with/without comparison) | Fluency + sourcing are the critical path before the December Dubai trip |
| 2026-10-19 | Plugins: Superpowers (project scope) and claude-mem (local-only). context-mode deferred. GSD and the duplicate skill-creator plugin skipped | Engineering discipline; private local memory; avoid hook conflicts and duplicate methodologies |
| 2026-10-19 | MengTo `build-awwwards-quality-sites` is the entry point for all website design work | Awwwards-grade, honest-asset, motion-led sites; one system avoids skill conflicts |
| 2026-10-19 | Hosting: Vercel Hobby + Supabase free. Move to Pro or another host before commercial traffic | Stay free while building; Hobby's terms forbid commercial use |
| 2026-10-19 | D2C range: 3 hero roll-ons plus an oil library (start with 6 oils × 2 sizes). Sprays in phase 2 | The user wants sprays and small oils for consumers; alcohol adds a CDSCO category, licensing and dangerous-goods costs |
| 2026-10-18 | Supply: CDSCO import registration plus a loan licence with one licensed filler. Chennai non-SEZ fillers first | Bulk "ready to fill" oil still needs COS-2; relabelling counts as manufacture; the filler's name on the label keeps the source private |
| 2026-10-18 | Positioning: alcohol-free, concentrated, crafted from Dubai oils. No Halal claims, no "inspired by" names, no invented heritage | ASCI substantiation; UP halal order; trademark (passing-off) risk |
| 2026-10-18 | No CDSCO spend before at least 5 signed letters of intent | Protects the ₹5L budget |
| 2026-10-18 | LLP, 50/50 with vesting; the father keeps the books; an independent CA signs audits | Two part-time founders; auditor independence |
| 2026-10-18 | AI agents: Claude routines writing to Supabase, with a human approving every outbound message | DPDP law and WhatsApp-ban risk; agents not yet proven |
