# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, and similar) working in this repository. It explains which **skills** and **subagents** are installed here, what each one does, and exactly when you should — and should not — use them.

> **Read this file before starting any task.** Most of the tools below are cheap to invoke and expensive to forget. When a request matches a trigger described here, use the matching skill instead of improvising your own approach.

---

## 1. What is installed and where

```
Dubai_Scents/
├── AGENTS.md                 ← this file
├── skills-lock.json          ← pinned sources + content hashes for every installed skill
├── docs/
│   ├── business-plan.md      ← the approved business, compliance, website & AI plan (source of truth)
│   └── decisions.md          ← running decisions log (newest first)
├── .agents/product-marketing.md  ← shared marketing context read by every marketing skill (§3.8)
├── .agents/skills/           ← canonical skill files (source of truth), 61 skills, see §1 tables
│   ├── find-skills/
│   ├── grilling/
│   ├── grill-me/
│   ├── grill-with-docs/
│   ├── to-questionnaire/
│   └── skill-creator/
│       ├── SKILL.md
│       ├── agents/           ← subagent prompts: grader.md, comparator.md, analyzer.md
│       ├── scripts/          ← eval, benchmark, description-optimisation, packaging
│       ├── eval-viewer/      ← generate_review.py + viewer.html
│       ├── assets/           ← eval_review.html (trigger-eval editor)
│       └── references/       ← schemas.md (JSON formats)
└── .claude/skills/           ← symlinks into .agents/skills/ so Claude Code discovers them
```

- **Claude Code** discovers skills through `.claude/skills/*` (symlinks) and invokes them with the `Skill` tool or a `/<skill-name>` slash command.
- **Codex / OpenAI-style agents** read each skill's `agents/openai.yaml` for its display name and invocation policy.
- Every skill is a third-party package pinned in `skills-lock.json`. **Do not hand-edit files under `.agents/skills/`**; they will be overwritten on update and the lock hash will no longer match. To change a skill's behaviour, create a new project skill (see `skill-creator`) or ask the user.

| Skill | Source | Who can invoke it |
|---|---|---|
| `find-skills` | `vercel-labs/skills` | Model **and** user |
| `grilling` | `mattpocock/skills` | Model **and** user |
| `grill-me` | `mattpocock/skills` | **User only** (`disable-model-invocation: true`) |
| `grill-with-docs` | `mattpocock/skills` | **User only** (`disable-model-invocation: true`) |
| `to-questionnaire` | `mattpocock/skills` | **User only** (`disable-model-invocation: true`) |
| `skill-creator` | `anthropics/skills` | Model **and** user |

**Added 2026-10-19.** All are model- and user-invocable unless noted. Details are in §3.7–3.9.

| Group | Skills | Source |
|---|---|---|
| **Website design (entry point)** | `build-awwwards-quality-sites` | `MengTo/Skills` |
| Motion foundation | `cinematic-gsap-lenis-motion-system`, `animation-systems`, `gsap` | `MengTo/Skills` |
| Page patterns | `cinematic-scroll-storytelling`, `scroll-world-storytelling`, `gsap-scrolltrigger-storytelling`, `scroll-scrubbed-visual-sequence`, `horizontal-scroll-scenes`, `scroll-progress-timeline` | `MengTo/Skills` |
| Type and surface details | `masked-reveal`, `scroll-scrubbed-word-reveal`, `progressive-blur`, `css-alpha-masking`, `css-border-gradient`, `beautiful-shadows`, `reveal-hover-effect` | `MengTo/Skills` |
| Aesthetic systems (pick at art direction) | `clean-minimal-beige-light-mode`, `book-serif-index` | `MengTo/Skills` |
| Quality gates | `no-ai-design-slop`, `audit-ai-design-slop`, `optimize-web-animations`, `audit-reference-originality`, `video-to-superprompt`, `workflow-score-to-target` | `MengTo/Skills` |
| Motion craft and review | `apple-design`, `emil-design-eng`, `review-animations`, `animation-performance`, `find-animation-opportunities` | `emilkowalski/skills` |
| Interface polish and review | `better-typography`, `better-ui`, `interface-review` | `jakubkrehel/skills` |
| GSAP reference | `gsap-scrolltrigger`, `gsap-react`, `gsap-performance` | `greensock/gsap-skills` |
| Design process | `interview-script`, `survey-design`, `design-token`, `motion-system` | `Owl-Listener/designer-skills` |
| Engineering | `vercel-react-best-practices`, `web-design-guidelines` | `vercel-labs/agent-skills` |
| | `shadcn` | `shadcn-ui/ui` |
| | `supabase`, `supabase-postgres-best-practices` | `supabase/agent-skills` |
| | `webapp-testing` | `anthropics/skills` |
| Marketing and research | `customer-research`, `competitor-profiling`, `copywriting`, `seo-audit`, `content-strategy`, `launch`, `pricing` | `coreyhaines31/marketingskills` |
| Third-party (account needed) | `apify-ultimate-scraper` (Apify account) | `apify/agent-skills` |
| | `brandkit` (image generation) | `leonxlnx/taste-skill` |

**Claude Code plugins** (not skills; installed outside this repo, see §3.9):
- `superpowers@claude-plugins-official`, project scope. **The user installs it with `/plugin`.**
- `claude-mem` v14.0.1: local-only, cloud sync off, telemetry off.

**Connectors (claude.ai, 2026-10-20):** Supabase, Vercel, Figma, Google Drive, Claude Docs connected; Gmail + Google Calendar + Apify (free tier) being added by the user; Canva later (content phase). n8n is the user's free self-hosted instance — keep it off for agent work (Claude routines + Supabase do that); now hosts the **Daily Perfume Byte** workflow (`automations/n8n/` — OpenAI + Telegram, no Claude usage); planned later use: weekly off-site Supabase `pg_dump` backup to the home server. Never upgrade a connector to a paid tier without the user's OK (they want cost + ROI first).

### What "user only" means

Skills marked `disable-model-invocation: true` (and `allow_implicit_invocation: false` in `openai.yaml`) must **not** be triggered by you on your own initiative, even if the request looks like a perfect match. They run only when the user explicitly types the slash command (e.g. `/grill-me`). If you think one would help, **suggest it in one line** ("You could run `/to-questionnaire` to turn this into a doc for your supplier") and let the user decide.

---

## 2. Quick decision guide

Use this table first; the detailed sections below explain each entry.

| The user is… | Use | Notes |
|---|---|---|
| Asking "is there a skill/tool for X?", "how do I do X?" for a specialised domain, or wishing you could do something you can't | **`find-skills`** | Search before saying "I can't". |
| Presenting a plan, design, architecture, business idea or decision and wants it stress-tested — or says "grill me", "poke holes", "challenge this", "interrogate my plan" | **`grilling`** | Model-invocable. Interview in numbered rounds. |
| Typed `/grill-me` | **`grill-me`** → loads `grilling` | Pure alias. |
| Typed `/grill-with-docs` | **`grill-with-docs`** → loads `grilling` + `domain-modeling` | ⚠️ `domain-modeling` is **not installed** — see §5. |
| Stuck on a decision because *someone else* (supplier, lawyer, designer, client, teammate) holds the answer | Suggest **`/to-questionnaire`** | User-only; do not invoke yourself. |
| Asking to create, edit, test, benchmark, or improve the triggering of a skill | **`skill-creator`** | Includes the grader/comparator/analyzer subagents. |
| Asking to design, build or restyle **any website page or section** (home, brand story, product page, Oil Library, landing page) | **`build-awwwards-quality-sites`** first | It writes the art direction, then names the smallest set of §3.7 sub-skills to use. Don't load design sub-skills directly for page-level work. |
| Asking to review, fix or speed up **animations** | **`review-animations`** (review), **`animation-performance`** / **`optimize-web-animations`** (performance) | `find-animation-opportunities` only when asked "what could be animated?" |
| Asking to review a UI change, branch or PR for interface problems | **`interface-review`** | `web-design-guidelines` for an accessibility and guidelines pass. |
| Asking to **write or change code** (features, bugs, refactors) | **Superpowers** (`brainstorming` → `writing-plans` → TDD → `verification-before-completion`) | Engineering discipline. Pair with `vercel-react-best-practices`, `supabase`/`supabase-postgres-best-practices`, `shadcn`, `gsap-react`. |
| Asking for marketing copy, pricing, launch, SEO, content or competitor work | The matching **§3.8 marketing skill** | Each reads `.agents/product-marketing.md` first. Banned-claims rules apply (§3.8). |
| Preparing buyer interviews or a survey | **`interview-script`** / **`survey-design`**, then **`customer-research`** to synthesise | |
| Asking for B2B lead lists (Google Maps, Instagram, IndiaMART) | **`apify-ultimate-scraper`** | Needs an Apify account. Privacy (DPDP) guardrails in §3.8 are mandatory. |
| Asking for logo or brand-board concepts | **`brandkit`** | Concepts only. Never AI images of the actual product. |
| Asking for normal coding, writing, or research work with none of the above signals | **No skill** | Just do the work. |

**Disambiguation rules**

- **`grilling` vs `to-questionnaire`:** Who holds the knowledge? If the *user* can answer the questions, grill them. If the answers live in *someone else's* head, the right tool is a questionnaire for that person (suggest `/to-questionnaire`).
- **`grilling` vs just answering:** If the user asks a direct question ("should I use Stripe or PayPal?"), answer it. Grill only when they want their *own* thinking challenged, or the plan has so many open decisions that answering without interviewing would mean guessing.
- **`find-skills` vs `skill-creator`:** Search for an existing skill first (`find-skills`). Build a new one (`skill-creator`) only when nothing suitable exists, or the user explicitly wants a custom skill.
- **Never stack skills unprompted.** Don't start a grilling session in the middle of building a skill, or search for skills while grilling, unless the user asks.
- **`grilling` vs Superpowers `brainstorming`:** use `grilling` for **business, strategy and product decisions**, and Superpowers `brainstorming` for **code-level design** (component APIs, data flow, implementation approach).
- **`skill-creator` vs Superpowers `writing-skills`:** always use our vendored **`skill-creator`** for creating or editing skills, because it has the eval and benchmark tooling. Don't use `writing-skills`.
- **Design vs engineering:** `build-awwwards-quality-sites` owns *what the site looks and moves like*; Superpowers owns *how the code is built and verified*. On a page build, run the art direction first, then implement under Superpowers' TDD and verification.
- **One motion stack:** GSAP + ScrollTrigger + Lenis for scroll and storytelling. Motion (motion.dev) only for small React micro-interactions. Never add Anime.js, Locomotive Scroll or a second smooth-scroll engine.

---

## 3. Skill reference

### 3.1 `find-skills` — discover and install new skills

**Purpose:** Search the open agent-skills ecosystem (the `npx skills` CLI and https://skills.sh/) for a package that adds a capability the user needs.

**Use it when the user:**
- asks "find a skill for X", "is there a skill that can…", "can you do X?" where X is a specialised capability;
- asks "how do I do X?" and X is a common, well-defined task (testing, deployment, changelogs, PDF handling, design systems, etc.) where a packaged workflow probably exists;
- says they wish you were better at a particular domain, or wants to extend what you can do.

**Do not use it when:** you can already do the task well with your normal tools, the user just wants the work done now, or the request is a one-off that no reusable skill would cover.

**How to run it:**
1. Identify the domain and the specific task.
2. Check the skills.sh leaderboard for well-known options.
3. Search: `npx skills find <keywords> [--owner <github-owner>]`. Try synonyms if the first query is thin ("deploy" → "deployment", "ci-cd").
4. **Vet before recommending:** prefer 1K+ installs, reputable sources (`anthropics`, `vercel-labs`, `microsoft`, well-known authors), and repos with a meaningful number of stars. Be sceptical of anything under 100 installs.
5. Present each candidate with: name, what it does, install count, source, install command, and skills.sh link.
6. **Ask before installing.** Installing pulls third-party code into the project.

**Project-specific install conventions:**
- This repo installs skills **at project level** (files in `.agents/skills/`, symlinks in `.claude/skills/`, entry in `skills-lock.json`). Prefer that over the `-g` (global) flag shown in the skill, so the project stays reproducible, unless the user asks for a global install.
- After installing, verify the new folder, symlink, and lock entry all exist, then add the skill to this `AGENTS.md`.
- Update everything with `npx skills update`.

**If nothing is found:** say so plainly, offer to do the task directly, and mention that a custom skill can be built with `skill-creator`.

---

### 3.2 `grilling` — relentless design-tree interview

**Purpose:** Stress-test a plan, decision or idea by interviewing the user until you both share a complete understanding, with nothing silently assumed. This is the core engine; `grill-me` and `grill-with-docs` both delegate to it.

**Use it when:**
- the user says "grill me", "grill this", "stress-test", "poke holes", "play devil's advocate", "challenge my plan", "interrogate this";
- the user shares a plan or design (a product launch, store architecture, pricing model, data model, feature spec) and wants it sharpened before acting;
- you are about to build something big with many open decisions, *and* the user agrees to an interview rather than wanting you to pick defaults.

**Do not use it when:** the user wants a straight answer, the task is small and clear, or the user has already made the decisions and wants execution.

**How it works (follow exactly):**
1. **Model the plan as a design tree.** Each decision branches into the decisions that depend on it.
2. **Work in rounds.** The *frontier* is every decision whose prerequisites are already settled. Ask the **whole frontier in one round**, never one question at a time, and never a question that depends on another still-open question in the same round.
3. **Format each question:**
   ```
   ❓ **Q1** - **<question title>**: <question body, may include multiple choices>

   ➡️ <your recommended answer>

   ---
   ```
   Number every question, give a recommended answer for each, and word questions so that "yes" accepts your recommendation.
4. **Wait for answers**, then recompute the frontier and ask the next round.
5. **Facts are your job; decisions are the user's.** Never ask the user something you could look up (files, configs, docs, prices, existing code). Send a subagent (in Claude Code, the `Explore` agent for codebase facts or `general-purpose` for web research) to find it. Don't block the whole round on it: only questions downstream of the pending fact wait, and the rest of the frontier is asked now.
6. **Done** when the frontier is empty: every branch visited, nothing assumed.
7. **Do not act on the result** (write code, create files, commit) until the user confirms you've reached a shared understanding.

---

### 3.3 `grill-me` — user-only alias for `grilling`

**Purpose:** A shortcut so the user can start a grilling session by typing `/grill-me`.

**Behaviour:** Its only instruction is to load the `grilling` skill. Once loaded, follow §3.2 exactly.

**Rules:** User-invocable only. **Never trigger it yourself.** When you would want to grill on your own initiative, use `grilling` directly (it's model-invocable).

---

### 3.4 `grill-with-docs` — grilling plus living documentation

**Purpose:** Run a grilling session and, as decisions settle, record them as documentation: **ADRs** (Architecture Decision Records, one per significant decision: context, decision, consequences) and a **domain glossary** (the shared vocabulary of the project, e.g. what "order", "SKU", "decant", "tester" mean in this business).

**Behaviour:** Loads two skills: `grilling` and `domain-modeling`.

**Rules:** User-invocable only (`/grill-with-docs`). **Never trigger it yourself.** If the user is grilling and starts asking for decisions to be written down, suggest this command.

> ⚠️ **Known gap:** `domain-modeling` is **not installed** in this project or in the user's global skills. When `/grill-with-docs` is run:
> 1. Tell the user that `domain-modeling` is missing and the docs half of the workflow won't load.
> 2. Offer to find and install it with `find-skills` (try `npx skills find domain-modeling --owner mattpocock`, since the other grill skills come from `mattpocock/skills`).
> 3. If they decline, run `grilling` as normal and ask whether they'd like you to write ADRs and a glossary manually once the session ends. Don't invent a docs format silently.

---

### 3.5 `to-questionnaire` — turn an unanswerable decision into a doc for someone else

**Purpose:** When the user can't make a decision because the knowledge lives with another person, produce a Markdown **discovery questionnaire** they can send for async answers or fill in together during a meeting.

**Rules:** User-invocable only (`/to-questionnaire`). **Never trigger it yourself.** *Suggest* it when you notice the blocker is someone else's knowledge, for example: "I need to check with the perfume supplier about minimum order quantities", "the accountant knows the VAT rules", "the designer decides the packaging".

**How it works:**
1. **Grill the *send*, not the subject.** Ask the user only what they can always answer:
   - **Who is it going to?** The recipient's role, expertise, and relationship to the user. Ask in one exchange.
   - **What do you need back?** The specific decisions or facts the user needs from this person. Ask in one exchange.
2. **Write the questionnaire** aimed at the gap between what the recipient knows and what the user needs. Save it to `to-questionnaire-<slug>.md` in the current directory and report the path.
3. **Required structure** (from the skill's template):
   - `# Title`, then **Purpose**, **From / To / How your answers will be used**
   - `## Context`: one orienting paragraph, not a page
   - `## How to answer`: deadline, rough effort, "I don't know" is acceptable
   - One `##` section per theme, questions **most-important-first**, each question a single idea (never compound) as an `###` heading with an empty `>` answer stub beneath, plus an optional one-line *Why this matters* only where the question could be misread
   - `## Anything else?`: closing catch-all
4. **Done** when the file exists and every item the user listed in step 1 is covered by at least one question.

---

### 3.6 `skill-creator` — build, test, and tune skills

**Purpose:** Create new skills, modify existing ones, run evals comparing them against a baseline, benchmark them, and optimise their `description` so they trigger reliably.

**Use it when the user:**
- wants to create a skill ("make a skill for our product-listing workflow", "turn what we just did into a skill");
- wants to edit, improve, or debug an existing skill;
- wants to test or benchmark a skill, or asks "is the new version actually better?";
- complains a skill isn't triggering (or over-triggering) and wants the description fixed.

**Do not use it when:** the user wants to *use* a skill (just invoke that skill), or wants to *find* one (`find-skills`).

**Workflow overview** (full detail lives in `.agents/skills/skill-creator/SKILL.md`; read it fully before starting):
1. **Capture intent:** what the skill does, when it should trigger, its output format, and whether it needs test cases. Mine the current conversation first if the user says "turn this into a skill".
2. **Interview and research** edge cases, inputs/outputs, and success criteria.
3. **Draft `SKILL.md`:** frontmatter `name` + `description` (the description is the triggering mechanism; make it slightly "pushy"), body under ~500 lines, with optional `scripts/`, `references/`, `assets/`. Explain *why* rather than shouting MUSTs.
4. **Write 2–3 realistic test prompts** to `evals/evals.json` and confirm them with the user.
5. **Run evals:** for each test case, spawn a *with-skill* and a *baseline* subagent **in the same turn**. Baseline = no skill (for a new skill) or a snapshot of the old version (when improving one). Put results in `<skill-name>-workspace/iteration-N/eval-<name>/`.
6. **While runs execute**, draft objectively verifiable assertions. **As each run finishes**, save `total_tokens` and `duration_ms` to `timing.json` straight away; this data is not stored anywhere else.
7. **Grade → aggregate → analyse → review:** grade with the grader subagent, run `python -m scripts.aggregate_benchmark`, do an analyst pass, then **always** open `eval-viewer/generate_review.py` for the human *before* revising. Use `--static <path>` when there's no display.
8. **Iterate** from `feedback.json`: generalise from it rather than overfitting to the test prompts, keep the skill lean, and repeat in `iteration-N+1/` until the user is happy.
9. **Optionally optimise the description:** generate ~20 realistic should-trigger and should-not-trigger queries (focus on near-misses), have the user review them via `assets/eval_review.html`, then run `python -m scripts.run_loop … --model <current session model id>` in the background.
10. **Package** with `python -m scripts.package_skill` if a `present_files` tool exists.

**Where to put new skills for this project:** create them under `.claude/skills/<name>/` (or `.agents/skills/<name>/` with a symlink in `.claude/skills/`, to match the existing layout). Never overwrite a vendored skill in place. If the user wants to change one, copy it under a new name first. Run all `python -m scripts.*` commands from inside `.agents/skills/skill-creator/`.

#### 3.6.1 Subagents bundled with `skill-creator`

These live in `.agents/skills/skill-creator/agents/`. They are **prompt files, not registered agent types.** To use one, spawn a general-purpose subagent and tell it to read the relevant file and follow it, passing the listed inputs. Use them **only inside a `skill-creator` eval loop**, never for general code review or unrelated grading.

| Subagent | File | When to spawn | Inputs you must pass | Output |
|---|---|---|---|---|
| **Grader** | `agents/grader.md` | Step 7, once per completed run, to judge assertions (or grade inline for small sets; prefer scripts for anything checkable programmatically) | `expectations` (list of strings), `transcript_path`, `outputs_dir` | `grading.json` in the run dir. The `expectations` array **must** use the fields `text`, `passed`, `evidence` because the viewer depends on them. Also critiques weak or trivially satisfied assertions. |
| **Blind Comparator** | `agents/comparator.md` | Only when the user wants a rigorous A/B judgement ("is v2 actually better?") | `output_a_path`, `output_b_path`, `eval_prompt`, optional `expectations` | JSON with `winner` (`A`/`B`/`TIE`), `reasoning`, `rubric`, `output_quality`. **Never reveal which skill produced which output**; randomise A/B. |
| **Post-hoc Analyzer** (comparison mode) | `agents/analyzer.md` | After the comparator picks a winner, to explain *why* and suggest fixes | `winner`, `winner_skill_path`, `winner_transcript_path`, `loser_skill_path`, `loser_transcript_path`, `comparison_result_path`, `output_path` | Prioritised (high/medium/low) concrete improvement suggestions for the losing skill. |
| **Benchmark Analyst** (benchmark mode) | `agents/analyzer.md` → "Analyzing Benchmark Results" | Step 7's analyst pass, after `aggregate_benchmark` | `benchmark_data_path`, `skill_path`, `output_path` | JSON array of notes: non-discriminating assertions, flaky/high-variance evals, time/token trade-offs. |

Blind comparison is optional and needs subagent support. In environments without subagents (e.g. Claude.ai), skip baselines, the comparator, and the analyzer, and gather qualitative feedback inline instead.

---

### 3.7 Website design & build stack (MengTo-led)

**Entry point: `build-awwwards-quality-sites`** (`MengTo/Skills`). For any page-level design or build:
1. Inspect the references.
2. Write a compact **art direction**: visual thesis, hero focal asset, type, colour, section sequence, motion narrative, smooth-scroll engine (**Lenis**), Three.js decision, asset provenance. **Get the user's sign-off on it before coding.**
3. Name the smallest set of sub-skills it needs.
4. Build it.
5. Validate: production build, mobile, keyboard, `prefers-reduced-motion`, no-JavaScript fallback.

Its honesty rules match this business: no fake testimonials, no invented partners or logo walls, photographs (not AI) for any people, no "award-winning" claims.

**Planned use of the sub-skills on this site:**

| Page / element | Skill |
|---|---|
| Home: cinematic scroll | `cinematic-scroll-storytelling` |
| Brand story, as scrubbed video of real Dubai footage | `scroll-world-storytelling` |
| Product pages in Apple's sticky style | `gsap-scrolltrigger-storytelling` |
| Bottle turntable, from our own photographed frames | `scroll-scrubbed-visual-sequence` |
| Scent notes (top → heart → base) | `horizontal-scroll-scenes` |
| Sourcing → blending → bottling | `scroll-progress-timeline` |
| Headlines | `masked-reveal`, `scroll-scrubbed-word-reveal` |
| Surfaces | `progressive-blur`, `css-alpha-masking`, `css-border-gradient`, `beautiful-shadows`, `reveal-hover-effect` |
| Aesthetic, chosen at the art-direction step | `clean-minimal-beige-light-mode` for the main site (warm sand), `book-serif-index` for the Oil Library (archival catalogue) |

**Quality gates, run before calling a page done:**
- `no-ai-design-slop` (passive, throughout).
- `audit-ai-design-slop`.
- `workflow-score-to-target` (target **9/10** unless the user sets another).
- `review-animations`, `interface-review`, `web-design-guidelines`.
- `optimize-web-animations` / `animation-performance` / `gsap-performance`.
- `audit-reference-originality` whenever inspiration references (Collect UI, Awwwards, Godly, Mobbin, recorded sites via `video-to-superprompt`) were used. **Never copy layouts, assets or copy.**

**Product imagery rule:** real photographs of the product only. AI generation is allowed for backgrounds and scenes, never for the bottle or oil itself.

**Engineering companions:**
- `vercel-react-best-practices` (Next.js).
- `gsap-react` (`useGSAP`, cleanup).
- `shadcn` (forms, admin and trade portal, restyled to our tokens; no default shadcn look on public pages).
- `supabase` and `supabase-postgres-best-practices`. **Load before any schema, RLS or migration work.**
- `webapp-testing` (Playwright end-to-end tests).

**Hosting constraints:**
- Vercel Hobby is **non-commercial**: move to Pro or another host before checkout or paid sample kits go live.
- Supabase free pauses after 7 idle days and has no automatic backups: run a weekly `pg_dump`.
- Portability: standard Postgres only, no Vercel-only services.

---

### 3.8 Marketing, research & sales

- **Skills:** `customer-research`, `competitor-profiling`, `copywriting`, `seo-audit`, `content-strategy`, `launch`, `pricing` (`coreyhaines31/marketingskills`). Supporting: `interview-script` and `survey-design` (`Owl-Listener/designer-skills`).
- **Shared context:** every one of them reads **`.agents/product-marketing.md`** first.
  - Keep it current: version and changelog at the bottom; add verified quotes and **Learnings** after the interviews.
  - Sections marked **TBD** must be filled from real interviews. Never invent customer language, testimonials or proof.
- **Banned claims (all copy, all channels):**
  - No "Halal" claims or marks.
  - No "inspired by <designer>" or "<brand> type" names.
  - No invented heritage.
  - No "award-winning".
  - No longevity numbers without wear-test data (ASCI).
  - Never imply "Made in UAE": the label wording is "Made in India; fragrance oil imported from UAE".
- **Lead-gen (`apify-ultimate-scraper`), DPDP guardrails:**
  - Public **business** contact data only (IndiaMART, Google Maps, company sites, Instagram business profiles).
  - Store the minimum fields: name, business, contact, source.
  - An opt-out line in every first message.
  - **No outbound message is sent without the user's approval.**
  - No WhatsApp broadcasts to anyone who hasn't opted in.
- **`brandkit`:** logo and brand-board **concepts** only. A freelance designer finalises the logo and the legally required label artwork.

---

### 3.9 Claude Code plugins

- **Superpowers** (`superpowers@claude-plugins-official`, obra, MIT): engineering methodology.
  - Covers brainstorming, writing and executing plans, TDD, systematic debugging, verification before completion, code review, subagent-driven development, git worktrees.
  - Its SessionStart hook makes its skills mandatory for code work.
  - Routing versus `grilling` and `skill-creator` is in §2.
  - **Install** (the user types it; agents can't run `/plugin`): `/plugin install superpowers@claude-plugins-official`, then choose **project** scope.
- **claude-mem** v14.0.1 (thedotmack, Apache-2.0): passive cross-session memory.
  - **Settings:** provider `claude` (the local Claude login), **cloud sync OFF**, **telemetry OFF**, Claude Code's native auto-memory left **on**. Data lives in `~/.claude-mem`. The worker runs at `http://127.0.0.1:37701`.
  - **Commands:** `npx claude-mem status`, `npx claude-mem doctor`, `npx claude-mem stop`, `npx claude-mem uninstall`.
  - **Privacy:** wrap sensitive content (supplier prices, family details, credentials) in `<private>…</private>`. Never enable TeamBrain or Cloud Sync without asking.
  - It **supplements** `docs/` and native memory. **`docs/business-plan.md` and `docs/decisions.md` stay the source of truth.**
- **context-mode:** deferred. Install only if sessions start running out of context, add it alone, then re-check hook conflicts.
- **Not installed, on purpose:**
  - `skill-creator@claude-plugins-official`: duplicates the vendored `skill-creator`.
  - `get-shit-done-cc`: archived, and a competing methodology to Superpowers.

---

### 3.10 Planned custom skills (build with `skill-creator`)

**Built (project-owned, not in `skills-lock.json` — edit freely via `skill-creator`, keep evals in `<skill>/evals/evals.json`, test workspaces in `skill-workspaces/`):**
- `perfume-tutor` — lessons / quizzes / role-play with debrief / glossary; writes `knowledge/perfume/glossary.md` + `progress.md`. Use for any fragrance learning or conversation rehearsal/critique.
- `uae-supplier-scout` — find/verify/score UAE manufacturers, Indian fillers, brokers, packaging; visit questionnaires; vets offers; writes `sourcing/*.csv` + `sourcing/notes/`.

- `india-cosmetics-compliance` — label checks (Rule 34 + Legal Metrology), claims checks (ASCI/halal/designer names/therapeutic), registrations (CDSCO COS-1/2, loan licence COS-6/9, LM, IEC, GST, Udyam, DPIIT, TM) and import/shipping. **Run it before any label, packaging, website copy, caption, ad or catalogue goes out.** Tested 2026-10-20 (with skill 21/21 vs 20/21 without); references updated with HS 3303 00 40 risk, UAE attestation route, flag/SKU-name rules.

- `b2b-leadgen-india` — find/verify/score Indian D2C attar brands and attar shops, write `sales/leads.csv`, draft discovery outreach for founders to send (DPDP guardrails, no bulk messaging). Drafted 2026-10-20, not yet evaluated.
- `market-intel-digest` — weekly one-page digest to `intel/digests/`, tracks `intel/watchlist.md`, flags changes to compliance "verify" items. Drafted 2026-10-20, not yet evaluated.

**Still to build:** `brand-voice` (after the name is chosen).
- Specs are in `docs/business-plan.md`, under Skills → D.
- Create them under `.agents/skills/<name>/` with a symlink in `.claude/skills/`.
- Each gets evals before it's used for real work.

---

## 4. General rules for all skills

1. **Load before acting.** When a request matches a skill, invoke it *before* you start working. Don't half-do the task and reach for the skill later.
2. **Follow the skill's process literally.** These skills encode specific formats (numbered grilling rounds, questionnaire template, `grading.json` field names). Small deviations break downstream tooling or the user's expectations.
3. **Respect "user only".** Suggest; don't invoke `grill-me`, `grill-with-docs`, or `to-questionnaire` yourself.
4. **Ask before installing or deleting** skills, and before running long background jobs (description optimisation loops) that cost tokens.
5. **Keep this file current.** When a skill is added, removed, or updated, update §1's table, §2's decision guide, and its §3 entry in the same change.

---

## 5. Known issues

| Issue | Impact | What to do |
|---|---|---|
| `domain-modeling` skill is referenced by `grill-with-docs` but **not installed** | `/grill-with-docs` won't produce ADRs/glossary automatically | Follow the fallback in §3.4. Once installed, delete this row. |
| MengTo skills `3d-metal-material` and several game and illustration skills fail the installer's YAML parsing | They can't be installed via `npx skills add` today | `3d-metal-material` is the optional phase-2 3D bottle skill. Retry after `npx skills update`, or vendor it via `skill-creator` when needed. |
| `claude-mem` hooks call the `claude-mem` launcher in `~/.local/bin`, which may be missing from the PATH of an IDE started before the install | Hook errors such as "Executable not found: claude-mem" | Restart VS Code or the terminal. Check with `npx claude-mem doctor` (its "Hook launcher" check gives a false failure when run through `npx`; a login shell resolves `~/.local/bin/claude-mem` correctly). |
| Superpowers is approved but **installed by the user via `/plugin`**, and isn't installed yet as of 2026-10-19 | §2 code routing to Superpowers is inactive until it's installed | Ask the user to run `/plugin install superpowers@claude-plugins-official` (project scope). After the first session, check that Superpowers' and claude-mem's injected instructions don't conflict, and record the result here. |
| Vercel Hobby plan is non-commercial | Can't take orders or paid sample kits on Hobby | Upgrade to Pro or move hosts before commercial traffic (see `docs/business-plan.md`). |
