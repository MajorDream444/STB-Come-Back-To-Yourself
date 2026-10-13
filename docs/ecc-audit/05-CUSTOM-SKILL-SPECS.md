# Phase 3 — Custom Skill Design Specifications

Seven skills. Each has inputs, outputs, review gates, acceptance tests.

**Design rules applied throughout**
1. **R-05 rule** — every skill owns at least one runnable check whose exit code
   is the evidence. No check, no claim.
2. **HAMAL-native** — doctrine stays `SYSTEM.md` + ICM Five-Layer Context Stack.
   These skills are mechanisms, not constitutions.
3. **ICM-preserving** — skills live in `.claude/skills/<id>/`. No writes into
   numbered ICM directories (`00_`–`09_`).
4. **One Stop hook maximum per project** (R-01).

Status of all seven: **SPECIFIED, NOT BUILT.** Awaiting approval.

---

## 1. `flo-release-guardian`

Pre-release gate for the Flo site. The umbrella skill the other Flo skills report into.

**Adapted from:** ECC `verification-loop` + `browser-qa` + `module-regression`

### Inputs
- `target_url` — preview deployment URL (**never production**)
- `git_range` — default `origin/main..HEAD`
- `release_notes` — optional claim text to fact-check
- Repo state: `package.json`, `docs/assets/FLO-ASSET-REGISTER.md`, `CRM-HANDOFF.md`

### Outputs
- `docs/releases/RELEASE-<date>-<sha>.md` — verdict report
- Verdict: **SHIP** / **DO-NOT-SHIP** / **SHIP-WITH-NOTES**
- Per-phase table: phase · command · exit code · artifact path
- Any phase lacking a command reports **SKIPPED**, never PASS

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 build | `npm run build` exit 0 | Yes |
| G2 typecheck | `npm run lint` (`tsc --noEmit`) exit 0 | Yes |
| G3 copy lock | `flo-approved-copy-lock` reports 0 unreviewed changes | Yes |
| G4 assets | `flo-authentic-asset-validator` 0 criticals | Yes |
| G5 CTA | `stb-funnel-smoke-test` all paths resolve | Yes |
| G6 mobile | `browser-qa` 3 breakpoints, 0 console errors, 0 axe criticals | Yes |
| G7 docs | `docs-governance` audit 0 unresolvable refs | No — notes |
| G8 claim check | every release-note claim cites a command/file | Yes |

### Acceptance tests
- **AT-1** Clean HEAD on a healthy preview → **SHIP**, 8/8 gates with exit codes.
- **AT-2** Revert `BookingSession.tsx` to the `mailto:` form (P-01) → **DO-NOT-SHIP** at G5.
- **AT-3** Delete a referenced image → **DO-NOT-SHIP** at G4.
- **AT-4** Point at today's repo as-is → **DO-NOT-SHIP** citing P-01 and P-02. *This is the regression test that proves the skill works.*
- **AT-5** Remove `npm test` → G-phase reports SKIPPED, verdict is not SHIP.
- **AT-6** Release note claiming "CRM verified" with no command → fails G8.

---

## 2. `flo-approved-copy-lock`

Prevents approved client copy from being silently overwritten.

**Adapted from:** ECC `scripts/hooks/config-protection.js` (242 lines) — same
exit-2 mechanism, protected list swapped from linter configs to approved copy.

### Inputs
- `docs/copy/APPROVED-COPY.lock.md` — **new file**: approved strings with SHA-256 per block, approver, date
- Protected path list (reviewed, committed): `CONTENT-NOTES.md`, `docs/assets/FLO-ASSET-REGISTER.md`, `CRM-HANDOFF.md`, and copy-bearing components
- `override_token` — explicit human approval string

### Outputs
- Exit 0 allow · **exit 2 block** with the diff and the approver of record
- `docs/copy/COPY-CHANGE-LOG.md` append on approved change
- PreToolUse hook on `Write|Edit|MultiEdit` (**the one hook this skill registers**)

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Protected path + hash mismatch + no `override_token` | **Yes — exit 2** |
| G2 | First-time creation of a protected file | No (mirrors upstream) |
| G3 | Whitespace/comment-only change | No, logged |
| G4 | Approved change missing approver attribution | Yes |
| G5 | Lock file edited in the same commit as the copy it locks | **Yes** — defeats the mechanism |

### Acceptance tests
- **AT-1** Edit approved hero copy without token → blocked, exit 2, diff shown.
- **AT-2** Same edit with valid token → allowed, change log appended with approver.
- **AT-3** Reformat whitespace only → allowed, logged, not blocked.
- **AT-4** Edit lock + copy in one commit → blocked at G5.
- **AT-5** Create a new copy file → allowed (G2).
- **AT-6** Unattended run hits a block → terminates with a clear reason, **no deadlock** (R-02).
- **AT-7** Hook adds < 50 ms per tool call.

---

## 3. `flo-authentic-asset-validator`

Ensures shipped images are the approved ones and that approved ones exist.

**Adapted from:** ECC `docs-governance` (`markdown_links.py` reference-resolution) + `browser-qa` screenshots

### Inputs
- `docs/assets/FLO-ASSET-REGISTER.md` — existing register (approved / do-not-use lists)
- `public/`, `src/assets/` — filesystem
- `src/**/*.tsx` — references
- Optional `target_url` for rendered-image checks

### Outputs
- `docs/assets/ASSET-AUDIT-<date>.md`
- Four classified lists: **MISSING** (declared, absent) · **ORPHAN** (present, unreferenced) · **DUPLICATE** (same basename, multiple paths) · **FORBIDDEN** (on do-not-use list but referenced)
- Exit non-zero on any MISSING or FORBIDDEN

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Every register-declared file exists | **Yes** |
| G2 | Every code-referenced asset exists | **Yes** |
| G3 | No referenced asset on the do-not-use list | **Yes** |
| G4 | No duplicate basenames across asset roots | No — warn |
| G5 | Orphan count ≤ threshold (default 0) | No — warn |
| G6 | Rendered `<img>` returns 200 at `target_url` | **Yes** when URL given |

### Acceptance tests
- **AT-1** Run against today's repo → **MISSING: `public/assets/flo-first-doorway-banner.png`**, exit non-zero (reproduces P-02).
- **AT-2** Same run → **ORPHAN ×4** and **DUPLICATE: `flo-first-doorway.jpg`** (reproduces P-03).
- **AT-3** Create the banner → G1 passes.
- **AT-4** Reference an "older backwards image" → blocked at G3.
- **AT-5** Break an `<img>` path → G2 blocks before deploy.
- **AT-6** Clean repo → exit 0, report lists 0 criticals.

---

## 4. `stb-funnel-smoke-test`

Proves every CTA reaches its intended destination and that form submissions arrive in the CRM.

**Adapted from:** ECC `click-path-audit` + `browser-qa` + `module-regression`

### Inputs
- `target_url` — preview deployment
- `docs/funnel/FUNNEL-MAP.md` — **new file**: declared CTA → destination map
- `CRM-HANDOFF.md` — authoritative front-door definition (Google Form)
- `src/types.ts` — canonical URL constants

### Outputs
- `docs/funnel/SMOKE-<date>.md`
- Per-CTA table: component · control · declared destination · actual · match?
- CRM arrival evidence (test-row id or explicit NOT-VERIFIED)
- Exit non-zero on any mismatch or unwired control

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Every interactive control maps to a declared destination | **Yes** |
| G2 | Every destination matches `src/types.ts` constants | **Yes** |
| G3 | Primary booking path reaches the **Google Form**, not `mailto:` | **Yes** |
| G4 | Test submission appears in the Sheets CRM | **Yes** |
| G5 | WhatsApp number matches `CRM-HANDOFF.md` (`+31 6 55797661`) | **Yes** |
| G6 | Test rows written to a **test** sheet, never Flo's live CRM | **Yes — safety** |

### Acceptance tests
- **AT-1** Run against today's repo → **FAIL at G3**: `BookingSession.tsx:108` routes to `mailto:Floordeliefde21@gmail.com` while `CRM-HANDOFF.md` declares the Form the single front door. *Reproduces P-01 — the highest-severity live defect.*
- **AT-2** Same run → G1 flags 11 controls in `BookingSession.tsx` with no declared destination.
- **AT-3** After repair → G3/G4 pass with a cited CRM row id.
- **AT-4** Change the Form URL in `types.ts` only → G2 flags the drift.
- **AT-5** Point at production → **refuses to submit** (G6) and says why.
- **AT-6** Verify `wa.me/31655797661` matches the handoff → G5 passes.

---

## 5. `stb-conversion-evaluator`

Judges whether a funnel change plausibly helps conversion, before it ships.

**Adapted from:** ECC `council` pattern *(mechanism only — `llm-council` is already installed and is the engine)*

### Inputs
- `git_range` — the funnel-affecting diff
- `docs/funnel/FUNNEL-MAP.md`, `CONTENT-NOTES.md` (voice: "raw reflection over performance")
- `stb-offer-architect` output when the change touches an offer
- Baseline metrics if available

### Outputs
- `docs/funnel/CONVERSION-REVIEW-<date>.md`
- Verdict: **IMPROVES** / **NEUTRAL** / **REGRESSES** / **INSUFFICIENT-EVIDENCE**
- Friction delta: steps-to-book before vs after
- Voice-consistency note against `CONTENT-NOTES.md`

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Steps-to-book not increased without justification | **Yes** |
| G2 | One primary CTA per viewport | No — warn |
| G3 | Copy consistent with Flo's documented voice | No — warn |
| G4 | No claim of conversion lift without a baseline | **Yes** (anti-R-05) |
| G5 | Change doesn't bypass the documented CRM front door | **Yes** |
| G6 | Delegates contested calls to `llm-council` rather than asserting | **Yes** |

### Acceptance tests
- **AT-1** Diff adding a funnel step → **REGRESSES** at G1.
- **AT-2** Claim "will raise conversion 20%" with no baseline → **INSUFFICIENT-EVIDENCE** at G4.
- **AT-3** Diff reintroducing `mailto:` booking → **REGRESSES** at G5.
- **AT-4** Copy in marketing-performance voice → G3 warns, cites `CONTENT-NOTES.md`.
- **AT-5** Genuinely ambiguous tradeoff → invokes `llm-council`, records the verdict.
- **AT-6** Non-funnel diff → NEUTRAL, exits fast, no tokens wasted.

---

## 6. `hamal-agent-handoff`

Clean, inspectable handoff between agents and sessions, inside HAMAL doctrine.

**Adapted from:** ECC `unified-memory` *(convention only — no upstream implementation; this spec supplies it)*

### Inputs
- `from_agent`, `to_agent`, `task_id`
- Current session state: files touched, commands run with exit codes, open questions
- `SYSTEM.md` + ICM Five-Layer Context Stack (authoritative)
- `08_agent_context/` in `HAMAL_MOB_PLAYBOOKS`

### Outputs
- `08_agent_context/handoffs/HANDOFF-<task_id>-<date>.md` — **reads inside the existing ICM folder, writes only under `handoffs/`** (R-07)
- Structured: Context (ICM layer) → Done (with exit codes) → Not done → Blockers → Next action → Evidence paths
- Machine-readable `handoff.json` sidecar

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Every "done" claim cites a command + exit code or a file path | **Yes** (anti-R-05) |
| G2 | Names the ICM layer it operated at | **Yes** |
| G3 | Exactly one unambiguous next action | **Yes** |
| G4 | Doesn't restate HAMAL doctrine, cites `SYSTEM.md` | **Yes** (anti-R-06) |
| G5 | No writes outside `08_agent_context/handoffs/` | **Yes** (ICM integrity) |
| G6 | Blockers state what is needed and from whom | **Yes** |

### Acceptance tests
- **AT-1** Mid-task handoff → receiving agent resumes with no clarifying questions.
- **AT-2** Handoff claiming "tests pass" with no exit code → blocked at G1.
- **AT-3** Attempt to write into `02_playbooks/` → blocked at G5.
- **AT-4** Handoff restating doctrine inline → blocked at G4, rewritten as a citation.
- **AT-5** Three ambiguous next steps → blocked at G3.
- **AT-6** `handoff.json` validates against schema; `audit-ledger-operator` can consume it.

---

## 7. `hamal-learning-loop`

Durable, deduplicated lessons across sessions — without ECC's observer daemon.

**Adapted from:** ECC `growth-log` (adopted) + `continuous-learning-v2` *(mechanism studied, daemon deliberately rejected — R-12)*

### Inputs
- Session outcome: what was attempted, what failed, root cause
- `docs/learning/LESSONS.md` — append-only ledger
- Existing lessons, for dedup
- Optional: `oracle-shift-report` / `notebook-sync-push` output

### Outputs
- Appended entry: **Signal** (how to recognize it next time) · **Root cause** · **Transferable rule** · **Evidence** (commit/command) · **Scope** (repo or global)
- `docs/learning/LESSONS.md` with merged duplicates
- Promotion candidates: a rule seen 3+ times is proposed as a skill or a gate

### Review gates
| Gate | Rule | Blocks? |
|---|---|---|
| G1 | Entry has a transferable rule, not an event narration | **Yes** |
| G2 | Cites evidence (commit, command, file) | **Yes** (anti-R-05) |
| G3 | Deduped against existing lessons before append | **Yes** |
| G4 | Scoped `repo` or `global` — **no cross-project leakage** | **Yes** (anti-R-12) |
| G5 | **No background daemon, no observer process** | **Yes — architectural** |
| G6 | Promotion to skill/gate requires human approval | **Yes** |
| G7 | Feeds `notebook-sync-push`; does not duplicate it | No — warn |

### Acceptance tests
- **AT-1** Diary-style entry ("spent an hour on the build") → blocked at G1, rewritten as a rule.
- **AT-2** Entry duplicating an existing rule → merged, not appended (G3).
- **AT-3** Flo-specific lesson → scoped `repo`, absent from HAMAL sessions (G4).
- **AT-4** Attempt to start an observer loop → blocked at G5.
- **AT-5** Rule recurring 3× → promotion proposed, **not auto-applied** (G6).
- **AT-6** Seed with P-01 → produces a rule like *"documented front door and implemented handler must be asserted equal by a test, not by reading"* — and that rule is what `stb-funnel-smoke-test` G3 encodes. **Closes the loop.**
- **AT-7** 20 sessions → `LESSONS.md` stays under 200 lines (dedup works).

---

## Dependency order

```
flo-approved-copy-lock ──┐
flo-authentic-asset-validator ──┤
stb-funnel-smoke-test ──┼──> flo-release-guardian  (umbrella gate)
browser-qa (ECC) ────────┘
stb-conversion-evaluator ──> uses llm-council (installed)
hamal-agent-handoff ──> writes 08_agent_context/handoffs/
hamal-learning-loop ──> feeds notebook-sync-push; emits gates back into the Flo skills
```

Build order: **3 → 4 → 2 → 1 → 7 → 6 → 5.**
Assets and funnel first, because those reproduce live defects (P-01, P-02) and
therefore give every later skill a real regression test to protect.
