# ECC Integration Audit — HAMAL / SPARK LAB–STB / Flo de Liefde

**Date:** 2026-10-13
**Auditor:** Claude Code (cloud session), read-only
**Target:** `affaan-m/ECC` @ `b92f181` (2026-10-11, v2.2.3)
**Status:** Audit only. Nothing installed. Nothing deployed. No push to `main`.

---

## 0. Headline

**Verdict: ADAPT SELECTIVELY.** ECC is a serious, actively maintained engineering
system whose *enforcement layer* (hooks) is real, tested code and whose *skills
layer* is overwhelmingly prompt guidance. Adopt the enforcement patterns and a
small number of skills. Do not adopt the distribution wholesale.

Three findings drive that verdict:

1. **288 of ECC's 311 skills are markdown-only** (23 ship executable scripts).
   Prompt-only skills cannot *enforce* anything. Every one of Major's eight
   stated failures is an enforcement failure, so most of ECC's surface area
   does not address them.
2. **Installing ECC's default hook set adds 8 Stop hooks and 10 PreToolUse
   hooks.** This environment already runs a harness-managed Stop hook. That is
   a latency and correctness collision, not a merge.
3. **ECC has already been partially run against HAMAL** — on 2026-07-07,
   leaving `ecc-tools.json` (v1.3), `identity.json` (v2.0), and an unused
   homunculus instinct file. This is not a greenfield adoption; there is
   three-month-old ECC debris in `HAMAL_MOB_PLAYBOOKS` to reconcile first.

**Independently of ECC, the audit found three live defects in the Flo site.**
They are described in §4 and are the strongest available proof that the
proposed guardrails are needed. One of them silently bypasses the CRM.

---

## 1. Current environment inventory (Phase 1.1)

### Skills

| Layer | Count | Location | Persistence |
|---|---|---|---|
| Account-level synced skills | 51 | `~/.claude/skills/synced/<bucket>/` | Account; survives sessions |
| Anthropic bundled skills | ~20 | harness (`anthropic-skills:*`) | Harness-managed |
| Project skills (this repo) | 2 | `.claude/skills/{llm-council,unlazy}` | Committed to repo |
| Harness skills | 1 | `session-start-hook` | Harness-managed |

Account-level set includes Major's own operator skills (`stb-doorkeeper`,
`stb-evidence-tracker`, `stb-offer-architect`, `stb-continuity-keeper`,
`stb-webinar-os`, `stb-gumroad-asset-builder`, `stb-trip-wire-detector`,
`bwyh-lead-scout`, `outreach-writer`, `lead-qualifier`,
`caribbean-diaspora-hunter`, `model-creator-prospect-hunter`,
`signal-and-trend-oracle`, `oracle-shift-report`, `continuity-catchup`,
`notebook-sync-push`, `audit-ledger-operator`, `gumroad-operator`,
`shopify-operator`, `platform-parameter-guard`, `fast-cash-gig-hunter`,
`laptop-spring-clean`).

### Plugins

None installed. `~/.claude/plugins/synced/<bucket>/` is empty.

### Commands

No custom slash commands. All invocation is via `Skill`.

### Hooks — **this is where the conflict risk lives**

| Event | Source | Script | State |
|---|---|---|---|
| `Stop` | Harness (`launcher-settings.json` → `autoMode.hooks`) | `~/.claude/stop-hook-git-check.sh` | **Active** |
| `Stop` | Harness reply gate | `~/.claude/stop-hook-reply-gate.py` | Harness-managed |
| `UserPromptSubmit` | Harness | `~/.claude/user-prompt-submit-reply-reminder.py` | Harness-managed |
| `Stop` | `unlazy` skill | `.agents/skills/unlazy/scripts/stop-hook.mjs` | **Shipped, NOT registered** |

`permissions.allow` = `["Skill"]`. No project `settings.json` or
`settings.local.json` exists in this repo.

### Project instructions

| Repo | `CLAUDE.md` | `.claude/` | Notes |
|---|---|---|---|
| `STB-Come-Back-To-Yourself` | **none** | `skills/` only | Flo site. Vite + React + TS |
| `SPARK-LAB-STB` | none | none | `00_repo_operations`, `09_visual_workflows`, `doctrine-upgrades` |
| `STB-COMMAND-CENTER` | none | none | Holds ICM Five-Layer Context Stack handoff |
| `HAMAL_MOB_PLAYBOOKS` | none | **`.claude/` with ECC artifacts** | `SYSTEM.md` carries the doctrine |

**No repo in scope has a `CLAUDE.md`.** HAMAL's doctrine lives in `SYSTEM.md`
(`Context → Agent → Skill → Tool → API → MCP → Plugin`) but nothing wires it
into an agent session. That is a cheaper, higher-leverage fix than anything in
ECC, and it is a precondition for ECC's `living-docs-governance` to be useful.

---

## 2. ECC architecture (Phase 1.2)

### Scale

| Component | Count | Notes |
|---|---|---|
| Skills | 311 | 23 scripted, **288 prompt-only** |
| Agents | 71 | markdown agent definitions |
| Commands | 97 | described as "legacy command shims" |
| Rules | 23 dirs | ~280 KB (~71k tokens) |
| Hook scripts | 9 config + ~40 in `scripts/hooks/` | real, substantial code |
| Tests | 446 files | `tests/` is 8.5 MB |
| Harness targets | 18 | claude, cursor, codex, opencode, gemini, zed, … |

### Installation lifecycle

`install.sh` → `scripts/install-apply.js` (251 lines). Security-relevant
behaviours, all verified in source:

- `npm install --ignore-scripts` — blocks pre/postinstall RCE from a
  compromised dependency. Deliberate and documented.
- `--target claude-project` — installs into `./.claude/` rather than
  `~/.claude/`, i.e. **per-project, no global mutation**.
- `--skills <ids>` — installs named skill directories only.
- `--dry-run` / `--json` — plan without writing.
- **`--enable-hooks` is required** before any hook runtime is materialized;
  `--no-hooks` installs everything else. Hooks are opt-in, not default-on.

This is a well-built installer and it is what makes selective adoption safe.

### Security controls

- `SECURITY.md`: real disclosure process, 48h ack / 7d assessment / 14d
  critical-fix targets, explicit trust-boundary taxonomy.
- **No outbound telemetry.** Grepped every hook script for network egress: the
  only URLs are documentation links (`git-scm.com`, `platform.claude.com`,
  `cursor.com/docs`). All state is local (`ECC_CONTEXT_STATE_ROOT`,
  `ECC_MCP_HEALTH_STATE_PATH`, session files). This is a genuinely local-first
  design and a strong point in ECC's favour.
- `.gitleaksignore` suppresses exactly one documentation example key — clean.
- Named security surfaces: `gateguard`, `safety-guard`, `config-protection`,
  `security-review`, `security-scan`, `agent-security-hardening`.

### Memory mechanisms

| Mechanism | Path | Implementation |
|---|---|---|
| `continuous-learning-v2` | `skills/continuous-learning-v2/` | **Real**: observer daemon (`observer-loop.sh`), hook (`observe.sh`), `instinct-cli.py`, confidence scoring, project-scoped instincts (v2.1 fixes cross-project contamination) |
| `unified-memory` | `skills/unified-memory/` | Prompt-only. Describes an "ECC Memory Vault" for cross-agent handoff |
| `growth-log` | `skills/growth-log/` | Prompt-only but self-contained: pattern-extraction template, merge-duplicates discipline |
| `recursive-decision-ledger` | `skills/recursive-decision-ledger/` | Prompt-only; append-only ledger with promotion gates |

### Testing workflows

`verification-loop` (6-phase build/typecheck/lint/test/security/diff →
PASS/FAIL), `module-regression` (`REGRESSION.md` ledger keyed to executable
acceptance commands, exit codes as evidence), `browser-qa` (3-breakpoint
screenshots + console errors + Core Web Vitals + axe-core → SHIP/DO-NOT-SHIP),
`e2e-testing` (Playwright POM), `ai-regression-testing`, `delivery-gate`
(Stop hook, `hooks/quality-gate.py`).

---

## 3. Implemented vs. aspirational (Phase 1.4)

This was the single most important discrimination to make, and the answer is
not flattering to a wholesale adoption case.

### Real, running code

- **All 10 audited hook scripts exist and are substantial.**
  `gateguard-fact-force.js` is 2,574 lines; `hookify-runtime.js` 784;
  `governance-capture.js` 373; `stop-format-typecheck.js` 284;
  `config-protection.js` 242.
- 446 test files, including `test_docs_governance_audit.py` — the docs audit
  script is actually covered.
- The installer, manifests, and 18 harness adapters are real.

### Prompt-only (guidance, not enforcement)

- **288 of 311 skills.** Including several the adoption case would lean on:
  `browser-qa`, `verification-loop`, `living-docs-governance`,
  `unified-memory`, `growth-log`, `click-path-audit`, `production-audit`.
  These are *good prompts* — but they instruct a model, they do not constrain
  it. Treat them as checklists, not gates.

### Claims that are weaker than presented

- **GateGuard's "+2.25 quality points, A/B-tested."** The repo's own evidence
  table is **n=2 tasks** (8.0 vs 6.5, 10.0 vs 7.0), self-scored, with no
  published methodology, rubric, or rater blinding. The *mechanism*
  (deny-first-touch → force facts → allow retry) is sound and worth adopting.
  The *number* is directional at best and should not be quoted to a client.
- `unified-memory` describes a cross-agent "Memory Vault" shared between
  Claude, Codex, Hermes, Cursor and OpenCode. The skill is 199 lines of
  markdown with no vault implementation in the skill directory. Treat as a
  convention, not a product.
- `commands/` is 97 entries self-labelled "legacy command shims" — carried for
  back-compat, not a current interface.

---

## 4. Live defects found in the Flo site

Found while auditing, not caused by it. These are verified by file inspection,
and each maps to a pain point on Major's list.

### 4.1 — Approved banner asset does not exist **[HIGH]**

`docs/assets/FLO-ASSET-REGISTER.md` declares:

> **Approved Banner Asset** — File: `public/assets/flo-first-doorway-banner.png`

`public/assets/` **does not exist**. No `.png` exists anywhere in `public/`.
The register further forbids "older backwards image" and "banner versions where
Flo is too low or too small" — but nothing enforces that, and the approved
replacement is absent.

→ *Pain points: wrong/missing production images; documentation drift.*

### 4.2 — Untracked `mailto:` submissions bypass the CRM **[CORRECTED 2026-10-14]**

`CRM-HANDOFF.md` states: *"The Google Form is now the single front door for all
inquiries."*

`src/components/BookingSession.tsx:108` submits via:

```
window.location.href = `mailto:Floordeliefde21@gmail.com?subject=Booking Request — …`
```

> **CORRECTION (2026-10-14, Stage 0 verification).** The original text of this
> section claimed the booking UI was the live primary conversion surface and
> that bookings were being lost. That was wrong, and the error was mine: I did
> not check whether the component was mounted.
>
> Verified facts: **`BookingSession.tsx` is not imported or rendered anywhere**
> (`App.tsx` does not reference it), so it has **no live impact and no
> inquiries were lost through it**. However, **`BreathReset.tsx:162` — which
> *is* mounted at `App.tsx:71` — contained the same hardcoded `mailto:`
> pattern** on the free-guide lead capture, and I missed it. That was the real
> live leak. Severity of the code defect stands; the revenue claim does not.
> Both are repaired in Stage 0.

This is an **incomplete migration**, which is a sharper diagnosis than a
simple mismatch. `src/types.ts` shows the migration was already done elsewhere:

```ts
export const INTAKE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLS…";
/** @deprecated use INTAKE_FORM_URL */
export const BOOKING_MAILTO = INTAKE_FORM_URL;   // now aliases to the Form
/** @deprecated use INTAKE_FORM_URL */
export const CIRCLE_MAILTO  = INTAKE_FORM_URL;
```

`INTAKE_FORM_URL` is imported by **8 files** — `AboutFlo`, `FinalCTA`,
`Footer`, `Hero`, `Navigation`, `OfferCards`, `WeeklyCircle`, and `App.tsx`.
The deprecated `*_MAILTO` constants were deliberately re-pointed at the Form.

**`BookingSession.tsx` is the one holdout.** It imports nothing from
`src/types.ts`, hardcodes the Gmail address at line 108, and has **zero
`href`** across 11 interactive controls. So the primary conversion surface is
the single component the Form migration missed, and because the address is
hardcoded rather than imported, re-pointing the shared constant did not and
cannot fix it.

A booking submitted through the main booking UI lands in a Gmail inbox, not the
Sheets CRM. Documented front door and implemented front door disagree — on the
one surface that matters most.

→ *Pain points: missing form-to-CRM verification; inconsistent CTA
destinations; documentation drift.*

### 4.3 — Four orphaned image assets **[LOW]**

Never referenced by `src/` or `index.html`:

```
public/flo-about-flowers.jpg
public/flo-about-rice-field.jpg
src/assets/images/regenerated_image_1780275756727.jpg
src/assets/images/regenerated_image_1780275760582.jpg
```

Also: `public/images/flo-first-doorway.jpg` duplicates
`public/flo-first-doorway.jpg`; code references the root copy. Two files, one
name, one used — a textbook "wrong image shipped" setup.

→ *Pain points: wrong/missing production images.*

### 4.4 — No test or visual-regression capability at all

`package.json` scripts: `dev`, `build`, `preview`, `clean`, `lint`. `lint` is
`tsc --noEmit` — a typecheck, not a linter. No test runner, no Playwright, no
eslint, no visual baseline. **Mobile design regressions are currently
undetectable by any automated means.**

---

## 5. Overlap with the existing environment (Phase 1.3)

| ECC capability | Already covered by | Verdict |
|---|---|---|
| `council`, `council-multi-model` | `llm-council` (installed this session) | **Duplicate — reject** |
| `security-review` | built-in `/security-review` | **Duplicate — reject** |
| `deep-research` | `anthropic-skills:deep-research` | **Duplicate — reject** |
| `continuous-learning`, `continuous-learning-v2` | `notebook-sync-push`, `oracle-shift-report`, `continuity-catchup` | Heavy overlap — **defer** |
| `recursive-decision-ledger` | `audit-ledger-operator` | Overlap — defer |
| `delivery-gate` (Stop hook) | `unlazy` gate files + harness Stop hook | **Conflicts — reject** |
| `skill-scout`, `skill-comply`, `skill-stocktake` | `anthropic-skills:skill-creator` | Overlap — defer |
| `docs-governance`, `living-docs-governance` | `doc-coauthoring` (authoring only, not drift) | **Genuine gap — adopt** |
| `browser-qa`, `e2e-testing`, `click-path-audit` | nothing | **Genuine gap — adopt** |
| `config-protection`, `gateguard` | nothing | **Genuine gap — adopt (staged)** |
| `cost-tracking`, `token-budget-advisor` | nothing | Nice-to-have — defer |

---

## 6. Token overhead (Phase 1.5)

Measured, not estimated:

| Scope | Size | Tokens | Verdict |
|---|---|---|---|
| All 311 skill **descriptions** (injected every session) | 95,705 chars | **~23,900** | Unacceptable |
| All 311 `SKILL.md` bodies (if all loaded) | 2.8 MB | ~739,000 | Exceeds any context window |
| `rules/` (23 dirs) | 280 KB | ~71,000 | Unacceptable as a block |
| ECC `CLAUDE.md` + `AGENTS.md` | 16 KB | ~4,000 | Acceptable if adapted |
| **8 recommended skills (descriptions only)** | ~2.5 KB | **~600** | Acceptable |

Full installation would spend roughly **12% of a 200k context window on skill
descriptions before any work begins**, on top of ~70 skills already present.
The recommended 8-skill subset costs ~600 tokens — a 40× reduction.

---

## 7. Conflicts, duplication, and risk summary

1. **Stop hook pileup.** ECC default = 8 Stop hooks. Environment already has
   1 harness Stop hook; `unlazy` ships a 9th. Stop hooks run on every turn end;
   each can block. Nine blocking hooks with no defined precedence is a
   correctness hazard, not just latency.
2. **PreToolUse pileup.** ECC default = 10, two of which (`gateguard`,
   `config-protection`) *deny by design*. Combined with `permissions.allow:
   ["Skill"]` and cloud-session approval flows, this can deadlock an
   unattended run.
3. **Pre-existing ECC debris in HAMAL.** `ecc-tools.json` from 2026-07-07
   reports `referenceSetReadiness: 0/7`. Either reconcile or remove it before
   layering a second adoption on top.
4. **Doctrine collision.** ECC ships its own `CLAUDE.md`, `AGENTS.md`,
   `SOUL.md`, and 23 rule directories. HAMAL's doctrine is `SYSTEM.md` +
   ICM Five-Layer Context Stack. Installing ECC's instruction layer wholesale
   would introduce a competing constitution. **Adopt ECC mechanisms; keep
   HAMAL doctrine authoritative.**
5. **Prompt-only skills create false assurance.** A skill named
   `production-audit` that cannot execute anything invites exactly the
   "incorrect deployment status assumption" it appears to prevent. Any adopted
   prompt-only skill must be paired with a runnable check.

---

## 8. Recommendation

**ADAPT SELECTIVELY.**

- **Adopt unchanged** — rejected. The hook set collides with the harness, the
  token cost is ~24k, and 288/311 skills cannot enforce anything.
- **Adapt selectively** — **recommended.** Take `config-protection` and
  `gateguard` as *patterns*, four prompt-only skills as *checklists paired with
  runnable checks*, and two scripted skills as-is. Install per-project
  (`--target claude-project --skills … --no-hooks`), never globally.
- **Defer** — `continuous-learning-v2`, `unified-memory`, `delivery-gate`,
  `safety-guard`, cost tooling. Revisit after the pilot proves the thin slice.
- **Reject** — `council*`, `security-review`, `deep-research`, the 97 legacy
  command shims, the 23-dir `rules/` block, and ECC's `CLAUDE.md`/`SOUL.md`
  instruction layer.

**Sequencing note:** fix §4.2 (CRM bypass) before adopting anything. It is a
live revenue leak, it needs no ECC capability to repair, and repairing it first
gives the pilot a real regression test to protect.
