# Recommended Skill Manifest — 8 ECC Capabilities

**Source:** `affaan-m/ECC` pinned at `b92f181b3b748d1abbc2afd94af6aa7d8c8fca29` (v2.2.3, 2026-10-11)
**Install mode:** `--target claude-project --no-hooks --skills <ids>` — per-project, never global
**Total token cost:** ~600 tokens of skill descriptions (vs ~23,900 for all 311)

Ordered by ratio of pain-point coverage to adoption risk. Items 1–5 are Stage 1/2;
items 6–8 carry hook risk and are Stage 2 at the earliest.

---

## 1. `click-path-audit` — CTA destination integrity

| | |
|---|---|
| **Source path** | `skills/click-path-audit/SKILL.md` (245 lines) |
| **Implementation** | PROMPT-only |
| **Purpose** | Traces every button/touchpoint through its full state-change sequence to find controls that individually work but produce a wrong or inconsistent final state. |
| **Solves** | Inconsistent CTA destinations; dead CTAs |
| **Dependencies** | None. Reads source. |
| **Security** | None — read-only analysis. |
| **Measurable benefit** | Flo has **34 interactive controls across 7 components, and 10 `href`s**. `BookingSession.tsx` alone has **11 controls and 0 `href`** — it is the one component the Form migration missed (P-01). Target: every control traced to a named destination, 0 unaccounted. Would have caught P-01. |
| **Pairing (R-05)** | `grep` assertion that every CTA resolves to a URL in `src/types.ts`. |

## 2. `docs-governance` — deterministic documentation drift audit

| | |
|---|---|
| **Source path** | `skills/docs-governance/scripts/audit-docs.py`, `scripts/markdown_links.py`, `SKILL.md` (97 lines) |
| **Implementation** | **CODE** — and covered by `tests/test_docs_governance_audit.py` upstream |
| **Purpose** | Opt-in, read-only audit of documented roles, links, ADR indexes, and evidence references. |
| **Solves** | Documentation drifting from live implementation |
| **Dependencies** | Python 3. No network. |
| **Security** | Read-only, explicitly opt-in, no egress. Lowest-risk item in the manifest. |
| **Measurable benefit** | Would have flagged P-02 (register points at a nonexistent file) on day one. Target: 0 unresolvable doc→file references across `FLO-ASSET-REGISTER.md`, `CRM-HANDOFF.md`, `CONTENT-NOTES.md`, `SPRINT-INSIGHTS.md`. |
| **Pairing** | Already executable — this *is* the runnable check. |

## 3. `module-regression` — exit-code regression ledger

| | |
|---|---|
| **Source path** | `skills/module-regression/SKILL.md` (99 lines) + `templates/REGRESSION.example.md` |
| **Implementation** | PROMPT + template |
| **Purpose** | A `REGRESSION.md` ledger recording each module's downstream consumers and one **executable acceptance command** each. After a change, run the changed module's command and every affected downstream one; observed exit codes are the regression evidence. |
| **Solves** | Missing form-to-CRM verification; mobile regressions; deployment status assumptions |
| **Dependencies** | A test runner must exist. **Flo has none — see R-13.** |
| **Security** | Executes acceptance commands from a repo file. Treat `REGRESSION.md` as executable content under review, same as a CI config. |
| **Measurable benefit** | Converts "I believe it works" into an exit code. This is the single best structural answer to R-05 across the whole manifest. Target: every Flo conversion path has one acceptance command; 100% run pre-merge. |
| **Pairing** | Self-pairing by design. |

## 4. `growth-log` — persistent lessons

| | |
|---|---|
| **Source path** | `skills/growth-log/SKILL.md` (128 lines, v1.1.0) |
| **Implementation** | PROMPT-only |
| **Purpose** | Extracts reusable patterns from completed work — root cause, transferable rule, recognizable signal — in a 4–8 sentence template with merge-duplicates discipline. Explicitly *not* diary narration. |
| **Solves** | Lack of persistent lessons across coding sessions |
| **Dependencies** | None. |
| **Security** | None. |
| **Measurable benefit** | Chosen over `continuous-learning-v2` (R-12) because it needs no daemon, no hook, and no instinct store. Target: ≥1 entry per session with a transferable rule; 0 duplicate rules after merge pass. Feeds `notebook-sync-push` rather than competing with it. |
| **Pairing** | Stage gate checks the log was appended (mtime + content assertion). |

## 5. `browser-qa` — post-deploy UI verification

| | |
|---|---|
| **Source path** | `skills/browser-qa/SKILL.md` (105 lines) |
| **Implementation** | PROMPT-only |
| **Purpose** | Console-error and Core Web Vitals smoke checks, form/auth interaction tests, screenshot visual regression across three breakpoints, axe-core accessibility audit → **SHIP / DO-NOT-SHIP** verdict. |
| **Solves** | Mobile design regressions; wrong/missing production images; deployment status assumptions |
| **Dependencies** | A browser automation driver. **Prefer local Playwright** — Chromium is pre-installed at `/opt/pw-browsers/chromium` — over the MCP route (R-14). |
| **Security** | Drives a browser against a deployed URL. Point at preview deployments only; never production with live form submission, or it writes test rows into Flo's real CRM. |
| **Measurable benefit** | Flo currently has **zero** automated mobile-regression detection. Target: 3 breakpoints baselined (390 / 768 / 1440), 0 console errors, 0 axe criticals before any release. |
| **Pairing** | The Playwright run *is* the check; the verdict must cite artifacts. |

## 6. `verification-loop` — six-phase pre-release gate

| | |
|---|---|
| **Source path** | `skills/verification-loop/SKILL.md` (135 lines, MIT) |
| **Implementation** | PROMPT-only |
| **Purpose** | Build, typecheck, lint, tests with coverage, security grep, diff review → PASS/FAIL report. |
| **Solves** | Incorrect deployment status assumptions |
| **Dependencies** | Needs real commands behind each phase. Flo has `build` and `lint` (`tsc --noEmit`) only; **4 of 6 phases would be vacuous today**. |
| **Security** | None directly. **Primary R-05 exposure** — a PASS with four empty phases is worse than no report. |
| **Measurable benefit** | Only adopt after Stage 2 adds a test runner and a real linter. Target: 6/6 phases backed by a command with a non-trivial exit code. |
| **Pairing** | Each phase must name the command it ran and its exit code, or the phase reports SKIPPED — never PASS. |

## 7. `config-protection` — protected-path write blocker *(pattern, not file)*

| | |
|---|---|
| **Source path** | `scripts/hooks/config-protection.js` (242 lines) |
| **Implementation** | **CODE** |
| **Purpose** | Upstream blocks edits to linter/formatter configs, because agents edit configs to make checks pass instead of fixing code. Exit 2 = block, exit 0 = allow; first-time creation allowed. |
| **Solves** | **Approved copy overwritten** — by adaptation, not as shipped |
| **Dependencies** | Node. Registers as a `PreToolUse` hook on `Write|Edit|MultiEdit`. |
| **Security** | **Deny-by-design (R-02).** Adds to the PreToolUse stack. Its protected-path list is the security boundary and must be reviewed by hand. |
| **Measurable benefit** | The *mechanism* is exactly what `flo-approved-copy-lock` needs: a reviewed allowlist, exit-2 block, first-creation exemption. **Adopt the 242-line pattern; substitute Flo's approved-copy and asset paths for the linter-config list.** Target: 0 unreviewed writes to approved copy. |
| **Pairing** | Hook *is* enforcement. Needs an explicit human-override path. |

## 8. `gateguard` — fact-forcing pre-action gate

| | |
|---|---|
| **Source path** | `scripts/hooks/gateguard-fact-force.js` (2,574 lines) + `skills/gateguard/SKILL.md` (711 lines) |
| **Implementation** | **CODE** |
| **Purpose** | Denies the *first* Edit/Write/Bash per file until the agent presents concrete facts (importers, data schemas, verbatim user instruction), then allows the retry. Deny → force facts → allow. Has exemption globs, subagent pass-through, prior-search credit, trivial-edit and sibling-collapse allowances, and a denial cap. |
| **Solves** | Incorrect deployment status assumptions; approved copy overwritten (indirectly — forces reading before writing) |
| **Dependencies** | Node. `PreToolUse` on `Edit\|Write\|MultiEdit\|NotebookEdit` and Bash. `GATEGUARD_EXEMPT_GLOBS`. |
| **Security** | **Highest-risk item in the manifest.** 2,574 lines running on every tool call, single-maintainer community origin (R-09). Deadlock risk in unattended runs (R-02). Vendor and pin; read the diff on any bump. |
| **Measurable benefit** | The claimed "+2.25 quality points" is **n=2 and self-scored — do not quote it** (R-10). The mechanism nonetheless directly targets Major's most expensive failure: confident claims made without reading the artifact. Target, measured on Flo: 0 release claims unsupported by a cited file read or command output. |
| **Pairing** | Hook *is* enforcement. Interactive sessions only until an unattended run is proven to complete. |

---

## Not in the manifest, deliberately

`continuous-learning-v2` (daemon + contamination history, R-12) ·
`unified-memory` (no implementation) · `delivery-gate` (9th Stop hook, R-01) ·
`safety-guard` (overlap + approval-flow conflict) · `council*`,
`security-review`, `deep-research` (duplicates, R-11) · `production-audit`
(prompt-only, name invites false assurance — R-05) · `rules/` (23 dirs,
~71k tokens) · `commands/` (97 legacy shims) · ECC
`CLAUDE.md`/`AGENTS.md`/`SOUL.md` (competing doctrine, R-06).

## Install command (Stage 1, sandbox — **not yet approved to run**)

```bash
# read-only plan first
node scripts/install-apply.js --target claude-project --dry-run --json \
  --no-hooks \
  --skills click-path-audit,docs-governance,module-regression,growth-log,browser-qa,verification-loop
```

Items 7–8 are **not** in that command: they are hooks, they carry R-01/R-02/R-09,
and they are ported by hand in Stage 2 after review.
