# ECC Compatibility Matrix

**Legend**
Fit: ✅ adopt · 🟡 adapt · ⏸ defer · ❌ reject
Impl: **CODE** = executable · **PROMPT** = markdown guidance only
Conflict: what it collides with in the current environment

---

## A. Capabilities mapped to Major's eight stated failures

| # | Failure experienced | ECC capability | Source path | Impl | Already have? | Conflict | Fit |
|---|---|---|---|---|---|---|---|
| 1 | Approved copy overwritten | `config-protection` hook (protected-path write blocker) | `scripts/hooks/config-protection.js` | **CODE** (242 ln) | No | PreToolUse stack; denies by design | 🟡 |
| 2 | Wrong / missing production images | `browser-qa` (3-breakpoint screenshots, visual regression) | `skills/browser-qa/SKILL.md` | PROMPT (105 ln) | No | Needs browser MCP | 🟡 |
| 3 | Incorrect deployment status assumptions | `gateguard` fact-forcing gate | `scripts/hooks/gateguard-fact-force.js` + `skills/gateguard/` | **CODE** (2,574 ln) | No | PreToolUse; deadlock risk unattended | 🟡 |
| 3b | Incorrect deployment status assumptions | `verification-loop` (6-phase PASS/FAIL) | `skills/verification-loop/SKILL.md` | PROMPT (135 ln) | No | None | 🟡 |
| 4 | Mobile design regressions | `browser-qa` + `module-regression` | as above + `skills/module-regression/` | PROMPT | No | Flo repo has **no test runner at all** | 🟡 |
| 5 | Inconsistent CTA destinations | `click-path-audit` | `skills/click-path-audit/SKILL.md` | PROMPT (245 ln) | No | None | ✅ |
| 6 | Missing form-to-CRM verification | `module-regression` ledger (exit-code evidence) | `skills/module-regression/` + `templates/` | PROMPT + template | No | None | ✅ |
| 7 | Documentation drifting from implementation | `docs-governance` (read-only deterministic audit) | `skills/docs-governance/scripts/audit-docs.py`, `markdown_links.py` | **CODE** | Partial (`doc-coauthoring` authors, doesn't detect drift) | None | ✅ |
| 7b | Documentation drifting | `living-docs-governance` (role assignment) | `skills/living-docs-governance/SKILL.md` | PROMPT (137 ln) | No | Would compete with HAMAL `SYSTEM.md` if applied naively | 🟡 |
| 8 | No persistent lessons across sessions | `growth-log` (pattern extraction) | `skills/growth-log/SKILL.md` | PROMPT (128 ln) | Overlaps `notebook-sync-push`, `oracle-shift-report` | Low | ✅ |
| 8b | No persistent lessons | `continuous-learning-v2` (instinct daemon) | `skills/continuous-learning-v2/` | **CODE** (12 files) | Scaffolded-unused in HAMAL since 2026-07-07 | Observer daemon + hook; cross-project contamination | ⏸ |

---

## B. Environment compatibility

| Dimension | Current state | ECC default | Compatible? | Required adaptation |
|---|---|---|---|---|
| Install scope | per-project `.claude/` | `~/.claude/` global | ⚠️ | Use `--target claude-project` |
| Hook runtime | 1 harness Stop hook active | 8 Stop + 10 PreToolUse | ❌ | `--no-hooks`; port 2 hooks manually in Stage 2 |
| Skill count | ~73 visible | +311 | ❌ | `--skills <8 ids>` only |
| Token budget | ~70 skills already injected | +23.9k tokens | ❌ | 8-skill subset = ~600 tokens |
| Project instructions | **no `CLAUDE.md` anywhere** | ships `CLAUDE.md`, `AGENTS.md`, `SOUL.md`, 23 rule dirs | ❌ | Author HAMAL-native `CLAUDE.md`; ignore ECC's |
| Doctrine | HAMAL `SYSTEM.md` + ICM Five-Layer Stack | ECC operator doctrine | ⚠️ | HAMAL stays authoritative; ECC supplies mechanisms only |
| Folder organization | ICM / numbered (`00_`–`09_`) | ECC flat `skills/`, `rules/ecc` | ⚠️ | Keep ICM numbering; mount ECC under `.claude/skills/` only |
| Permissions | `allow: ["Skill"]` | hooks expect broad Bash | ⚠️ | Deny-by-design hooks need an approval path or they stall |
| Telemetry / egress | n/a | **none found** (local-first) | ✅ | None |
| Dependency safety | n/a | `npm install --ignore-scripts` | ✅ | None |
| Secret handling | `.env` gitignored | `.gitleaksignore` = 1 doc example | ✅ | None |

---

## C. Per-repo readiness

| Repo | Role | ECC state today | Blockers before adoption |
|---|---|---|---|
| `STB-Come-Back-To-Yourself` | Flo production site (Vite/React/TS) | clean (no ECC) | No test runner; no eslint; 3 live defects (§4 of audit) |
| `SPARK-LAB-STB` | Doctrine + visual workflows | clean | No `CLAUDE.md`; no `.claude/` |
| `STB-COMMAND-CENTER` | ICM context architecture | clean | No `CLAUDE.md`; ICM rules are in a PDF/handoff, not machine-readable |
| `HAMAL_MOB_PLAYBOOKS` | Agent doctrine (`SYSTEM.md`) | **ECC artifacts present** (`ecc-tools.json` v1.3, `identity.json`, homunculus instinct) from 2026-07-07, `referenceSetReadiness 0/7` | **Reconcile or remove prior ECC debris first** |

---

## D. Rejections, with reason

| ECC item | Why rejected |
|---|---|
| `council`, `council-multi-model` | Direct duplicate of `llm-council`, installed this session |
| `security-review` | Duplicate of built-in `/security-review` |
| `deep-research` | Duplicate of `anthropic-skills:deep-research` |
| `delivery-gate` | 9th Stop hook; overlaps `unlazy` gate files |
| `safety-guard` | Overlaps `config-protection`; interacts badly with cloud approval flow |
| `commands/` (97) | Self-labelled "legacy command shims" |
| `rules/` (23 dirs, ~71k tokens) | Token cost; competes with HAMAL doctrine |
| ECC `CLAUDE.md` / `AGENTS.md` / `SOUL.md` | Competing constitution vs HAMAL `SYSTEM.md` + ICM |
| `unified-memory` | Prompt-only; "Memory Vault" has no implementation in-skill |
| 288 prompt-only skills not listed in §A | No enforcement value; pure token cost |
