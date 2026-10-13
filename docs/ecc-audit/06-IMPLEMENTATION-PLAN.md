# Phased Implementation Plan

Three stages. Each has entry criteria, work, exit criteria, and a rollback.
**No stage begins without explicit approval of the prior stage's exit criteria.**

Constraints held throughout:
- HAMAL architecture preserved — `SYSTEM.md` + ICM Five-Layer Context Stack stay authoritative.
- ICM folder organization preserved — no ECC writes into numbered (`00_`–`09_`) directories.
- ECC supplies **mechanisms**, never doctrine.
- One Stop hook maximum per project (R-01).
- Per-project installs only (`--target claude-project`); `~/.claude/` is never mutated.
- ECC pinned at `b92f181` and vendored; no auto-update (R-08).

---

## Stage 0 — Prerequisites (before any ECC work)

Not optional. Two of these are live defects; one is pre-existing ECC debris.

| # | Task | Why | Done when |
|---|---|---|---|
| 0.1 | **Fix P-01: booking bypasses CRM.** `BookingSession.tsx:108` sends `mailto:` while `CRM-HANDOFF.md` declares the Google Form the single front door. | Live revenue leak. Needs no ECC capability. Fixing it first gives Stage 2 a real regression test. | Booking submits to the Form; a test row is visible in the Sheets CRM |
| 0.2 | **Resolve P-02: approved banner missing.** Register declares `public/assets/flo-first-doorway-banner.png`; neither file nor directory exists. | Blocks `flo-authentic-asset-validator` from ever passing | Either the asset exists, or the register is corrected to match reality |
| 0.3 | **Reconcile prior ECC debris in HAMAL.** `ecc-tools.json` v1.3 (2026-07-07, `referenceSetReadiness 0/7`), `identity.json` v2.0, unused homunculus instinct. | R-03 split-brain. Layering on stale artifacts is very hard to debug | Refreshed or deleted; decision recorded in the ICM ledger |
| 0.4 | **Author a HAMAL-native `CLAUDE.md`.** No repo in scope has one. | Cheaper and higher-leverage than anything in ECC. Precondition for docs governance | `CLAUDE.md` exists citing `SYSTEM.md` + ICM as authoritative, naming ECC as a mechanism library |
| 0.5 | Record the pinned ECC SHA and vendoring decision | R-08, R-09 | SHA `b92f181` recorded in the manifest |

**Exit:** 0.1 and 0.2 closed; 0.3 decided; 0.4 committed. **Approval required.**

---

## Stage 1 — Sandbox validation

**Goal:** prove the thin slice is safe and cheap in isolation. Nothing touches Flo production.

**Entry:** Stage 0 approved.

**Environment:** a throwaway branch and a scratch clone. Never `main`. No deployment.

### Work
1. Vendor the 6 **hookless** skills at the pinned SHA into `.claude/skills/`:
   `click-path-audit`, `docs-governance`, `module-regression`, `growth-log`,
   `browser-qa`, `verification-loop`.
   ```bash
   node scripts/install-apply.js --target claude-project --dry-run --json --no-hooks \
     --skills click-path-audit,docs-governance,module-regression,growth-log,browser-qa,verification-loop
   ```
   Review the plan JSON, then run without `--dry-run`.
2. **Measure token overhead before and after.** Budget: ≤1,500 tokens of added skill descriptions (expected ~600).
3. Run `docs-governance`'s `audit-docs.py` read-only against the Flo repo. Expect it to flag P-02.
4. Add Playwright (local Chromium at `/opt/pw-browsers/chromium`, not an MCP dependency — R-14) and capture a 3-breakpoint baseline: 390 / 768 / 1440.
5. Add a real linter (eslint) so `verification-loop` has ≥5 of 6 phases backed by actual commands.
6. Read `config-protection.js` (242 ln) and `gateguard-fact-force.js` (2,574 ln) line by line. **Review only — do not register.**
7. Build skill #3 `flo-authentic-asset-validator` and #4 `stb-funnel-smoke-test` from the Phase 3 specs. Run their acceptance tests against the **pre-fix** state to confirm they reproduce P-01/P-02.

### Exit criteria
- [ ] Added skill descriptions ≤1,500 tokens, measured
- [ ] Zero new hooks registered; Stop hook count still 1
- [ ] `audit-docs.py` runs clean and flags the known drift
- [ ] Playwright baseline captured, 3 breakpoints
- [ ] AT-1 of `flo-authentic-asset-validator` reproduces P-02
- [ ] AT-1 of `stb-funnel-smoke-test` reproduces P-01
- [ ] Both hook files reviewed, findings written up
- [ ] No change to any numbered ICM directory

**Rollback:** delete `.claude/skills/<the 6>`, drop the branch. No global state touched, so rollback is complete by construction.

**Approval required before Stage 2.**

---

## Stage 2 — Flo website pilot

**Goal:** one real site, real releases, guardrails enforcing. The riskiest stage — it is where hooks go live.

**Entry:** Stage 1 exit criteria met and approved.

### Work
1. Build remaining Flo skills: `flo-approved-copy-lock` (#2), `flo-release-guardian` (#1).
2. **Create `docs/copy/APPROVED-COPY.lock.md`** — approved strings with SHA-256 per block, approver, date. Flo (or Major on her behalf) signs off the initial lock.
3. **Create `docs/funnel/FUNNEL-MAP.md`** — declared CTA → destination map, reconciled against `src/types.ts` and `CRM-HANDOFF.md`.
4. **Port `config-protection.js` as `flo-approved-copy-lock`'s hook.** Substitute Flo's approved-copy and asset paths for the linter-config list. Register as **PreToolUse** on `Write|Edit|MultiEdit`. This is the only new hook in the pilot.
5. Wire `flo-release-guardian` as the single pre-release gate (G1–G8). Run it on **preview deployments only** — never production, or smoke tests write rows into Flo's live CRM (G6 of skill #4).
6. **GateGuard: deliberately deferred within Stage 2.** Evaluate in interactive sessions only, behind `GATEGUARD_EXEMPT_GLOBS`, after `config-protection` has proven itself for a full release cycle. Do not enable in any Routine or unattended run until an unattended run is proven to complete (R-02).
7. Build `hamal-learning-loop` (#7) and capture the pilot's own lessons.

### Exit criteria
- [ ] 3 consecutive Flo releases gated by `flo-release-guardian`, all 8 gates reporting real exit codes
- [ ] 0 approved-copy changes without an attributed approver
- [ ] 0 MISSING or FORBIDDEN assets at release
- [ ] Every CTA resolves; booking path verified into the CRM with a cited row id
- [ ] Mobile regression caught at least once by the breakpoint baseline (or deliberately injected to prove detection)
- [ ] Copy-lock hook adds <50 ms per tool call (AT-7)
- [ ] An unattended run that hits a copy-lock block **terminates cleanly with a reason — no deadlock**
- [ ] `LESSONS.md` has ≥3 deduped entries with transferable rules
- [ ] Stop hook count still 1

**Rollback:** unregister the PreToolUse hook (single `settings.json` edit), keep the skills as advisory. Guardrails degrade to checklists; nothing breaks.

**Approval required before Stage 3.**

---

## Stage 3 — Reusable SPARK LAB–STB template

**Goal:** make the proven pattern portable to the next client without re-deriving it.

**Entry:** Stage 2 exit criteria met and approved.

### Work
1. Extract the pilot into a template in `SPARK-LAB-STB` — fitting its existing `00_repo_operations` / `doctrine-upgrades` structure, **not a new top-level scheme** (R-07).
2. Parameterize the client-specific parts: approved-copy lock path, asset register path, funnel map, CRM front door, breakpoints.
3. Generalize `flo-*` → `client-*`: `client-release-guardian`, `client-approved-copy-lock`, `client-authentic-asset-validator`. Keep `stb-funnel-smoke-test` and `stb-conversion-evaluator` as STB-level skills.
4. Build `hamal-agent-handoff` (#6), writing only to `08_agent_context/handoffs/`.
5. Build `stb-conversion-evaluator` (#5) on top of the installed `llm-council`.
6. Document the install as one command plus a filled-in parameter file.
7. Add a template-level `CLAUDE.md` citing HAMAL doctrine, so each new client repo inherits the right constitution.

### Exit criteria
- [ ] Template instantiates on a second repo in <30 min with no code edits — parameters only
- [ ] Instantiated copy passes its own acceptance tests
- [ ] `SPARK-LAB-STB` folder conventions unchanged
- [ ] `hamal-agent-handoff` round-trips: a second agent resumes with no clarifying questions (AT-1)
- [ ] Token cost per client repo ≤1,500 description tokens
- [ ] `08_agent_context/` is the only HAMAL directory written to

**Rollback:** template is additive; delete the directory.

---

## Decision points requiring Major's sign-off

| # | Decision | Stage | Default if undecided |
|---|---|---|---|
| D-1 | Fix P-01 before or alongside adoption | 0 | **Before.** It is a live leak |
| D-2 | Produce the missing banner, or correct the register | 0 | Correct the register (reversible) |
| D-3 | Refresh or delete HAMAL's 2026-07-07 ECC artifacts | 0 | Delete; re-run later if wanted |
| D-4 | Enable GateGuard at all | 2 | **Deferred.** High value, highest risk |
| D-5 | Playwright local vs browser MCP | 1 | Local — Chromium is pre-installed |
| D-6 | Who signs the approved-copy lock | 2 | Flo approves; Major countersigns |
| D-7 | Vendor ECC skills vs install from upstream | 1 | **Vendor + pin** (R-08, R-09) |

---

## What this plan deliberately does not do

- Install ECC's 23 `rules/` directories (~71k tokens) or its 97 legacy command shims.
- Install ECC's `CLAUDE.md` / `AGENTS.md` / `SOUL.md` — HAMAL doctrine stays authoritative (R-06).
- Enable ECC's 8 Stop hooks (R-01).
- Adopt `continuous-learning-v2`'s observer daemon (R-12) — `hamal-learning-loop` replaces it without background processes.
- Touch production, `main`, or `~/.claude/`.
- Quote ECC's "+2.25 quality points" to any client (R-10). The pilot produces Flo's own before/after numbers instead.
