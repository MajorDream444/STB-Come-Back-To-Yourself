# Stage 0 Remediation — Report

**Branch:** `claude/magical-hopper-umi99c` · **Not merged, not deployed.**
**Scope:** Stage 0 only. No ECC installed, no GateGuard, no ECC artifact deleted,
no HAMAL doctrine changed.

---

## Correction to the audit first

The audit's headline defect was wrong in its central claim, and the error was
mine. You were right to demand verification before revenue-loss claims.

- **`BookingSession.tsx` is not mounted.** `App.tsx` never imports it; no
  component references it. It is dead code. **No inquiries were lost through
  it**, and no revenue-loss claim should be made about it.
- **The real live leak was `BreathReset.tsx:162`** — the free-guide lead
  capture, mounted at `App.tsx:71` — which sent name + email via `mailto:` to
  Gmail instead of the Form. I missed it in the audit because I searched for
  the booking flow rather than for the defect pattern.

Both are now repaired. Audit documents are corrected in place with dated
correction notices.

---

## Files changed

| File | Change |
|---|---|
| `src/lib/intake.ts` | **New.** Single routing point for every enquiry. No `mailto:` path exists in it, by design. |
| `src/components/BreathReset.tsx` | **Live fix.** `mailto:` → `openIntake()`. Removed fake 900 ms delay. Replaced "I have sent it to {email}" with honest next-step copy + a blocked-popup fallback link. |
| `src/components/BookingSession.tsx` | **Rewritten** (still unmounted). Removed: `mailto:`, health checklist, hardcoded June-2026 dates with invented scarcity, false confirmation screen. Added: coarse timing *preference*, honest outcome screen, copy-your-answers fallback. Offers, prices, durations, descriptions unchanged. |
| `src/lib/__tests__/intake.test.ts` | **New.** 24 tests — routing and graceful error handling. |
| `src/lib/__tests__/no-untracked-submission.test.ts` | **New.** 33 tests — regression guard against `mailto:` submissions and invented scarcity returning. |
| `src/lib/__tests__/asset-register.test.ts` | **New.** 7 tests — every approved asset path exists; every referenced image exists. |
| `docs/assets/FLO-ASSET-REGISTER.md` | Reconciled against reality. Approved section documents what is actually in production; open questions moved to an "Unresolved" block that needs Flo's decision. |
| `vitest.config.ts` | **New.** |
| `package.json` | Added `test`, `test:watch`, `verify` scripts + dev dependencies. |
| `docs/ecc-audit/stage0/` | **New.** This report, the `CLAUDE.md` proposal, ECC reconciliation, ECC backup, render screenshots. |
| `docs/ecc-audit/{README,01,03}.md` | Corrected. |

**Not changed:** `App.tsx`, all other components, offers/prices in `src/types.ts`,
any image file, any ECC artifact, any HAMAL file, `main`.

---

## Tests

```
npm run verify   →   lint (tsc --noEmit) ✓ · vitest 64/64 ✓ · build ✓
```

Before the fix, the same suite failed 4 tests — one per defect:
`BookingSession` mailto, `BreathReset` mailto, invented scarcity, missing
approved asset. Each defect was reproduced by a failing test *before* it was
repaired.

### Render verification (Chromium, production build)

| Viewport | Console errors | Broken images | Horizontal overflow |
|---|---|---|---|
| 390 (mobile) | 0 real¹ | 0 / 4 | **16 px** |
| 768 (tablet) | 0 real¹ | 0 / 4 | **16 px** |
| 1440 (desktop) | 0 real¹ | 0 / 4 | 0 px |

¹ The only console errors are `_vercel/insights/script.js` 404s, which are
expected in local preview — Vercel Analytics exists only on Vercel. Not a defect.

Screenshots: `docs/ecc-audit/stage0/{mobile-390,tablet-768,desktop-1440}.png`

---

## Priority status

| Priority | Status |
|---|---|
| **1 — Booking flow** | **Done.** Both mailto paths removed; routed via the approved Form; no false confirmations; health checklist removed; tests cover routing + error handling. |
| **2 — Asset integrity** | **Partially done — needs your decision.** Register reconciled, asset test added, no photograph altered or deleted. The approved banner question is unresolved (below). |
| **3 — Agent doctrine** | **Proposed, not activated.** `docs/ecc-audit/stage0/proposed-CLAUDE.md`. Cites canonical sources; restates no doctrine. Adopt with `git mv` to root. |
| **4 — ECC reconciliation** | **Inventoried and backed up. Nothing deleted.** See `ECC-RECONCILIATION.md`. |

---

## Decisions needed from you

1. **Which image is the approved First Doorway visual?** The register declared
   `public/assets/flo-first-doorway-banner.png`, which has never existed in
   git history. In production the site serves `public/flo-first-doorway.jpg`
   (3024×4032, 920 KB). A different, unreferenced 4284×5712 / 4.2 MB file also
   exists. I did not pick one and did not generate anything.
2. **ECC artifact A-3** — `HAMAL_MOB_PLAYBOOKS/.claude/skills/.../SKILL.md`
   asserts HAMAL "is written in TypeScript" and teaches snake_case conventions.
   HAMAL has **zero** TypeScript files. It loads into every HAMAL session.
   Recommend removing it first and alone. Needs a session with write access.
3. **Adopt the proposed `CLAUDE.md`?**
4. **Mount `BookingSession`?** It is repaired but still unmounted. Mounting it
   is a live conversion-surface change and is not part of Stage 0.

---

## Remaining risks

| Risk | Severity | Note |
|---|---|---|
| **Form prefill is not configured.** `INTAKE_PREFILL_ENTRY_IDS` is empty, so the Form opens unprefilled and visitors retype their details. | **Medium** | Needs the `entry.<id>` values from Flo's Form ("Get pre-filled link"). One-time, ~10 min. Until then the copy-your-answers fallback prevents data loss. |
| **No end-to-end CRM proof.** Routing to the Form is tested; a row actually landing in Flo's Sheet is not. | **Medium** | Requires a live test submission against a test sheet. Deliberately not done — would write into Flo's real CRM. |
| **~10 MB of unreferenced images ship.** `dist/` is 15 MB; Vite copies all of `public/` regardless of references. | **Medium** | Mobile cost. Not fixed: deleting possible originals is Flo's call. |
| **16 px horizontal overflow at 390/768**, and "Ambient Sound" overlaps "Explore My Approach" on mobile. | **Medium** | Pre-existing, visible in the screenshots. Not fixed — outside authorized scope. |
| **A 200 response does not prove an asset exists.** On this SPA, `/assets/flo-first-doorway-banner.png` returns **HTTP 200 with `content-type: text/html`** (Vite's index fallback). | **Low but important** | Any future asset check must assert content-type, not status. The filesystem test is not fooled. |
| **No linter.** `npm run lint` is `tsc --noEmit` only. | **Low** | Stage 1 item. |
| **`BookingSession` is untested at component level.** Tests cover the routing module and static source guards, not React rendering. | **Low** | `@testing-library/react` is installed but unused; component tests are a Stage 1 addition. |

### Environment note

This cloud environment sets `NODE_ENV=production`, so `npm install` silently
skips devDependencies and reports "up to date" — `node_modules` had 205 of 595
packages. Use `NODE_ENV=development npm install --include=dev`. This would
affect any CI step that installs here.

---

## Rollback

All changes are additive or confined to two components, on an unmerged branch.

```bash
# Discard Stage 0 entirely
git checkout main

# Or revert just the code, keeping the docs
git revert <stage0-sha> -- src/ package.json vitest.config.ts

# Restore ECC artifacts (none were deleted, but if later removed)
cp -r docs/ecc-audit/stage0/ecc-backup/hamal/. <HAMAL>/.claude/
```

Removing `src/lib/intake.ts` alone would break the build — revert the two
component files with it. No database, deployment, or external system was
touched, so rollback is complete by construction.

---

## SECOND CORRECTION (2026-10-14, after owner context)

The owner has clarified that **Flo was an R&D participant, not a paying
client**, that she left Bali 3–4 months ago, and that **the Vercel deployment
is no longer accessible to anyone outside**.

That collapses the live-impact claim a second time, and I should state it
plainly: **nothing in this repository is deployed, so neither `mailto:` defect
was costing anything.** My audit asserted a live revenue leak; then, having
corrected that, asserted a smaller live leak in `BreathReset`. Both
overstatements came from the same mistake — reasoning about impact from source
code without verifying what was actually reachable.

**What the Stage 0 work is still worth, stated accurately:** this repository is
being reclassified as a *reference implementation and template source* for a
multi-practitioner system. The defects removed — a submission path that
bypassed the CRM, a UI that claimed bookings were confirmed when nothing was
booked, fabricated availability, and an unnecessary health-data checklist —
are exactly the things that must not be copied forward into every future
practitioner's site. Fixing them in the template is worth doing; "repairing
Flo's live funnel" was never the real reason, and no booking or revenue
improvement should be claimed from it.

**What should now stop:** further Flo-specific remediation. The open Priority 2
asset question and the mobile-overflow defect do not need resolving for Flo;
they need resolving in whatever becomes the practitioner starter template.

**Case-study constraint:** Flo's name, photographs, testimonials and personal
materials must not appear in any public case study without her written
permission, and no claim of revenue, booking or client outcome should be made
from this engagement, because no supporting data exists.
