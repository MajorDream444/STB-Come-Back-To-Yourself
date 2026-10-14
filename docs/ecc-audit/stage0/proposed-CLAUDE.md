<!--
  PROPOSAL — NOT ACTIVE.

  This file is deliberately parked in docs/ecc-audit/stage0/ rather than at the
  repository root, because a CLAUDE.md at the root takes effect immediately on
  checkout and Priority 3 asked for a proposal, not an installation.

  To adopt after review:
      git mv docs/ecc-audit/stage0/proposed-CLAUDE.md CLAUDE.md
  and delete this comment block.

  Design constraint honoured: this file CITES canonical documents. It does not
  restate, summarise, or reinterpret doctrine, so it cannot drift from the
  sources or compete with them.
-->

# CLAUDE.md — STB: Come Back To Yourself (Flo de Liefde)

## What this repository is

The production website for Floortje de Liefde, a somatic breathwork
practitioner. Vite + React + TypeScript, deployed on Vercel.

This is a **live client site**. Changes here are visible to Flo's visitors and
affect her enquiries.

## Authoritative sources — read, do not restate

Doctrine lives in these documents. When guidance here and a canonical source
appear to disagree, the canonical source wins and this file is wrong.

| Question | Canonical source |
|---|---|
| How agents, skills, tools and context relate | `SYSTEM.md` in `MajorDream444/HAMAL_MOB_PLAYBOOKS` |
| Context delivery architecture | ICM Five-Layer Context Stack, `MajorDream444/STB-COMMAND-CENTER` |
| Where enquiries must go | `CRM-HANDOFF.md` (this repo) |
| Which images are approved | `docs/assets/FLO-ASSET-REGISTER.md` (this repo) |
| Flo's content voice | `CONTENT-NOTES.md` (this repo) |
| Offers, prices, durations | `src/types.ts` — `OFFER_CARDS` |
| Sprint context | `SPRINT-INSIGHTS.md` (this repo) |

## Rules specific to this repository

1. **One front door.** Every visitor enquiry routes through the approved
   Google Form via `src/lib/intake.ts`. Never add a `mailto:` submission —
   `src/lib/__tests__/no-untracked-submission.test.ts` will fail the build.
   A plain contact link is fine; a mailto *submission* is not.

2. **Never claim what the system cannot do.** The site has no scheduling
   system, no payment system, and sends no email. Do not render confirmed
   bookings, held slots, availability counts, or "we have sent it" messages.
   Timing is a stated *preference* until Flo confirms by email.

3. **Approved copy and assets change only with Flo's approval.** Offers,
   prices, durations, testimonials and photographs are hers. Fix a defect
   without rewriting her voice; if copy must change, say so and ask.

4. **No generative modification of Flo's photographs.** Resizing and
   compression are allowed; altering image content is not.

5. **Collect the minimum.** Do not add fields that gather health, medical or
   other sensitive personal information. Flo asks what she needs in
   conversation. (Health data is special-category under GDPR; Flo operates in
   the Netherlands.)

6. **Verify before claiming.** `npm run verify` runs typecheck, tests and
   build. A claim that something works cites the command and its exit code,
   or it is not a claim.

## Commands

```bash
npm run dev      # local dev server, port 3000
npm run lint     # tsc --noEmit (typecheck; there is no eslint yet)
npm run test     # vitest run
npm run build    # production build
npm run verify   # lint + test + build
```

**Environment note:** this cloud environment sets `NODE_ENV=production`, which
makes npm silently skip devDependencies and report "up to date". Install dev
tooling with `NODE_ENV=development npm install --include=dev`.

## Scope discipline

Do not deploy, merge to `main`, or widen a task beyond what was asked. If you
find a defect outside the current scope, report it with evidence and let the
owner decide.
