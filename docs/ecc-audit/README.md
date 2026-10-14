# ECC Integration Audit — Deliverables

Audit of `affaan-m/ECC` @ `b92f181` (v2.2.3, 2026-10-11) for HAMAL,
SPARK LAB–STB, and the Floortje de Liefde website.

**Status:** Audit complete. Nothing installed. Nothing deployed. No push to `main`.
**Recommendation: ADAPT SELECTIVELY.**

| # | Document | What it answers |
|---|---|---|
| 01 | [Audit Report](01-AUDIT-REPORT.md) | Phase 1 — environment inventory, ECC architecture, implemented vs. aspirational, live defects found, token overhead, conflicts |
| 02 | [Compatibility Matrix](02-COMPATIBILITY-MATRIX.md) | Capability-by-capability fit, per-repo readiness, rejections with reasons |
| 03 | [Risk Register](03-RISK-REGISTER.md) | 15 adoption risks scored L×I + 4 pre-existing live risks |
| 04 | [Skill Manifest](04-SKILL-MANIFEST.md) | Phase 2 — the 8 recommended capabilities with source path, purpose, dependencies, security, measurable benefit |
| 05 | [Custom Skill Specs](05-CUSTOM-SKILL-SPECS.md) | Phase 3 — 7 skill designs with inputs, outputs, review gates, acceptance tests |
| 06 | [Implementation Plan](06-IMPLEMENTATION-PLAN.md) | Phase 4 — Stage 0 prerequisites, sandbox, Flo pilot, SPARK LAB template |

## The three findings that drive the verdict

1. **288 of ECC's 311 skills are prompt-only markdown.** Every failure on
   Major's list is an enforcement failure, so most of ECC's surface area
   cannot address them. The hooks are real code; the skills mostly are not.
2. **ECC's default hook set adds 8 Stop hooks and 10 PreToolUse hooks** to an
   environment already running a harness Stop hook. That is a collision.
3. **ECC was already partially run against HAMAL on 2026-07-07**, leaving
   stale artifacts with `referenceSetReadiness 0/7`. Not a greenfield adoption.

## Three live defects found in the Flo site (not ECC-caused)

- **P-01 [CORRECTED]** Untracked `mailto:` submissions. *The original audit
  claimed the booking UI was live and losing inquiries — that was wrong.*
  `BookingSession.tsx` is **not mounted**, so nothing was lost through it. The
  real live leak was `BreathReset.tsx:162`, the free-guide lead capture
  (mounted at `App.tsx:71`), which sent name+email to Gmail instead of the
  Form. Both are repaired in Stage 0.
- **P-02 [HIGH]** `FLO-ASSET-REGISTER.md` declares an approved banner at
  `public/assets/flo-first-doorway-banner.png`. Neither file nor directory exists.
- **P-03 [LOW]** Four orphaned images; `flo-first-doorway.jpg` exists at two
  paths with only one referenced.

Fix P-01 first. It is a revenue leak, it needs no ECC capability, and repairing
it gives the pilot a real regression test to protect.

## Verdict

- **Adopt unchanged** — rejected (hook collision, ~24k token cost, 288/311 unenforceable)
- **Adapt selectively** — **recommended** (8 capabilities, ~600 tokens, per-project, hooks staged)
- **Defer** — `continuous-learning-v2`, `unified-memory`, `delivery-gate`, `safety-guard`, cost tooling
- **Reject** — `council*`, `security-review`, `deep-research`, `rules/`, `commands/`, ECC's instruction layer

**No implementation until approval.**
