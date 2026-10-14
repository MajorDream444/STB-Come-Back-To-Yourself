# ECC Adoption — Risk Register

Scoring: Likelihood (L) and Impact (I) on 1–5. Severity = L × I.
Owner is the role accountable for the mitigation, not the person who files it.

---

## Critical (Severity ≥ 12)

| ID | Risk | L | I | Sev | Mitigation | Owner |
|---|---|---|---|---|---|---|
| **R-01** | **Stop hook pileup.** ECC adds 8 Stop hooks to an environment already running a harness Stop hook (`stop-hook-git-check.sh`) with a 9th shipped by `unlazy`. Stop hooks can *block* turn end; no precedence is defined between sources. Unattended runs may hang or exit with work unsaved. | 5 | 4 | **20** | Install with `--no-hooks`. Never register more than **one** Stop hook per project. If a quality gate is wanted, extend the existing harness hook rather than adding another. | Platform |
| **R-02** | **Deny-by-design PreToolUse deadlock.** `gateguard` denies the first Edit/Write/Bash per file; `config-protection` denies config edits outright. In a cloud session with `permissions.allow: ["Skill"]` and no human present, a denial loop can consume the run with zero output. | 4 | 4 | **16** | Stage 2 only, interactive sessions only. Set `GATEGUARD_EXEMPT_GLOBS` for generated/vendor paths before enabling. Cap retries. Verify an unattended run completes before trusting it in a Routine. | Platform |
| **R-03** | **Prior ECC debris in HAMAL creates split-brain.** `HAMAL_MOB_PLAYBOOKS/.claude/` already holds `ecc-tools.json` (2026-07-07, `referenceSetReadiness 0/7`), `identity.json` v2.0, and an unused homunculus instinct file. A second adoption layered on stale v1.3 artifacts will produce inconsistent agent behaviour that is very hard to debug. | 5 | 3 | **15** | Before Stage 1: inventory, then either refresh or delete. Record the decision in the ICM ledger. Do not layer. | HAMAL owner |
| **R-04** | **Token budget blowout.** All 311 skill descriptions = ~23,900 tokens injected every session, atop ~70 existing skills. Degrades instruction-following on long sessions and raises cost on every turn. | 5 | 3 | **15** | Hard cap: `--skills` with the 8 approved IDs (~600 tokens). Re-measure after each stage. Treat >1,500 tokens of skill descriptions as a budget breach. | Platform |
| **R-05** | **False assurance from prompt-only skills.** 288/311 skills cannot execute. A skill called `production-audit` or `verification-loop` that only *advises* can produce a confident "verified" claim with nothing verified — reproducing the exact "incorrect deployment status assumption" failure it appears to fix. | 4 | 4 | **16** | Rule: **every adopted prompt-only skill must be paired with a runnable check** whose exit code is the evidence. No check, no claim. Encode in the skill's acceptance tests. | Engineering |

---

## High (Severity 8–11)

| ID | Risk | L | I | Sev | Mitigation | Owner |
|---|---|---|---|---|---|---|
| **R-06** | **Doctrine collision.** ECC ships `CLAUDE.md`, `AGENTS.md`, `SOUL.md`, 23 rule dirs. HAMAL's authority is `SYSTEM.md` + the ICM Five-Layer Context Stack. Two constitutions = unpredictable precedence. | 4 | 3 | 12 | Never install ECC's instruction layer. Author a HAMAL-native `CLAUDE.md` that cites `SYSTEM.md` and ICM as authoritative and names ECC as a mechanism library only. | HAMAL owner |
| **R-07** | **ICM folder organization eroded.** ECC installs flat `skills/` and `rules/ecc`. HAMAL/SPARK use numbered ICM folders (`00_`–`09_`). | 3 | 3 | 9 | Confine ECC to `.claude/skills/<id>/`. No ECC writes into numbered ICM directories. Add to review checklist. | HAMAL owner |
| **R-08** | **Upstream churn.** ECC is at PR #3520 with a merge on 2026-10-11 — very high velocity. Unpinned adoption means behaviour changes under you. | 4 | 3 | 12 | Pin to a commit SHA (`b92f181`), vendor the 8 skills into the repo, and record the SHA in the manifest. Review upstream deliberately, never auto-update. | Platform |
| **R-09** | **Supply-chain surface.** `gateguard-fact-force.js` alone is 2,574 lines of hook code that runs on every tool call, from a single-maintainer community repo. | 3 | 4 | 12 | Vendor + pin. Read the diff before any version bump. `--ignore-scripts` is already enforced by the installer. Keep `no-hooks` default; hooks only after human review of the exact file. | Security |
| **R-10** | **Quoting unvalidated benchmarks to clients.** GateGuard's "+2.25 quality points" is n=2, self-scored, no published rubric. | 3 | 3 | 9 | Never cite ECC benchmark numbers externally. Measure on Flo with the pilot's own before/after metrics. | Major |

---

## Medium / Low

| ID | Risk | L | I | Sev | Mitigation | Owner |
|---|---|---|---|---|---|---|
| **R-11** | Duplicate skill triggering — ECC `council` vs installed `llm-council`; ECC `security-review` vs built-in. Ambiguous invocation, wasted tokens. | 4 | 2 | 8 | Do not install the duplicates (already in reject list). Audit skill names for collisions before each stage. | Platform |
| **R-12** | `continuous-learning-v2` observer daemon runs background processes and writes instincts; v2.1 exists specifically to fix cross-project contamination, implying v2.0 leaked. | 2 | 4 | 8 | Deferred, not adopted. If revisited, project-scoped only, in sandbox, with the instinct store reviewed by hand. | Platform |
| **R-13** | Flo site has no test runner, no eslint, no visual baseline — so `browser-qa` and `module-regression` have nothing to attach to. | 5 | 2 | 10 | Stage 2 prerequisite: add Playwright + a baseline screenshot set before adopting the QA skills. | Engineering |
| **R-14** | `browser-qa` depends on an external browser MCP (claude-in-chrome / Playwright / Puppeteer) that may be unavailable in cloud sessions. | 3 | 2 | 6 | Prefer local Playwright (Chromium is pre-installed in this environment) over an MCP dependency. | Engineering |
| **R-15** | Audit artifacts themselves drift once written. | 3 | 2 | 6 | `flo-release-guardian` includes these docs in its drift scan; re-date on each stage gate. | Major |

---

## Pre-existing risks found during audit (not ECC-caused)

| ID | Risk | L | I | Sev | Status |
|---|---|---|---|---|---|
| **P-01** | **Untracked `mailto:` submissions.** CORRECTED 2026-10-14: `BookingSession.tsx:108` is **not mounted** (no live impact). The live leak was `BreathReset.tsx:162` — the free-guide lead capture, mounted at `App.tsx:71` — which sent name+email via `mailto:` to Gmail instead of the Form. | 5 | 4 | **20** | **Repaired in Stage 0.** Both routed via `src/lib/intake.ts`; regression test added. |
| **P-05** | **False claims in live UI.** `BreathReset` told visitors "Somatic Booklet Prepared! I have sent it to {email}" — nothing was sent. `BookingSession` (unmounted) claimed "Your Sanctuary Space Is Set" and showed a confirmation ticket, with hardcoded June-2026 dates and invented scarcity ("3 spots open"). | 5 | 4 | **20** | **Repaired in Stage 0.** |
| **P-06** | **Health data collected unnecessarily.** `BookingSession` collected a somatic symptom checklist (chest tightness, jaw clenching, burnout) and placed it in a plaintext `mailto:` URL. Special-category data under GDPR Art. 9; Flo operates in the Netherlands. | 4 | 4 | 16 | **Repaired in Stage 0** (checklist removed). |
| **P-07** | **~10 MB of unreferenced images ship to production.** Vite copies all of `public/` verbatim. `dist/` is 15 MB, including a 4.2 MB unreferenced duplicate and a 4.26 MB unreferenced photo. | 5 | 3 | 15 | **Live.** Mobile cost. Not fixed — deletion is Flo's call. |
| **P-08** | **16 px horizontal overflow at 390 px and 768 px**, and the "Ambient Sound" control overlaps the "Explore My Approach" button on mobile. | 4 | 3 | 12 | **Live.** Found by Stage 0 render check. Not fixed — outside authorized scope. |
| **P-02** | **Approved banner missing.** `FLO-ASSET-REGISTER.md` declares `public/assets/flo-first-doorway-banner.png`; neither file nor directory exists. | 5 | 3 | 15 | **Live.** Either produce the asset or correct the register. |
| **P-03** | Four orphaned images + a duplicate filename (`public/images/flo-first-doorway.jpg` vs `public/flo-first-doorway.jpg`). | 4 | 2 | 8 | **Live.** Clean up under `flo-authentic-asset-validator`. |
| **P-04** | No automated detection of mobile regressions of any kind. | 5 | 3 | 15 | **Live.** Addressed by Stage 2. |
