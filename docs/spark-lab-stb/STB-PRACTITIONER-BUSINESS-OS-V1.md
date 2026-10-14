# STB Practitioner Business OS — Canonical Product Blueprint V1

**Status:** Draft for approval · 2026-10-14
**Owner:** Major (SPARK LAB–STB)
**Intended home:** `MajorDream444/SPARK-LAB-STB` — see §0.

> **Placement note.** By your own reorganisation scheme, canonical product
> doctrine lives in `SPARK-LAB-STB`; `STB-Come-Back-To-Yourself` is the archived
> Flo reference implementation. This document is therefore **staged in the wrong
> repository on purpose**: this session has write access only to the Flo repo's
> working branch. Move it on approval:
>
> ```
> git mv docs/spark-lab-stb/STB-PRACTITIONER-BUSINESS-OS-V1.md \
>        <SPARK-LAB-STB>/00_repo_operations/
> ```
> Or authorise push access to `SPARK-LAB-STB` and I will place it correctly.

---

## 0. What this document is

The single source of truth for the STB commercial model: what is sold, at what
price, how it is delivered, by which agents, under what quality gates, and what
may and may not be claimed. It supersedes ad-hoc offer descriptions.

It is written to be read by Claude Code, Codex, the LLM Council and human
collaborators. Where it states a number as a hypothesis it says so. Nothing
here is validated market data.

---

## 1. Three divergences from the council — resolved, not dropped

The council verdict (`docs/council/council-report-20261014.html`) was accepted.
The commercial model proposed afterwards diverges from it in three material
ways. Silently merging them would lose the finding. Each is resolved below.

### 1.1 The diagnostic was demoted

| Council | Proposed model |
|---|---|
| Diagnostic is the **primary revenue product** (€450); implementation is the upsell | Diagnostic is a **$250–500 entry offer**; the Sprint is the flagship |

**Why this matters.** The council's central finding was that with zero outcome
evidence, an offer *named for lift* is a claim that cannot be supported.
"Launch & **Conversion** Sprint" is named for lift. Leading with it reintroduces
precisely the risk four of five advisors independently flagged.

**Resolution adopted here:** keep all three stages, but **Stage 1 is the only
offer marketed cold.** The Sprint is never sold to someone who has not completed
a diagnostic. This keeps the flagship — it just stops it being the entry point.
Price Stage 1 at **$500–750**, not $250: at $250 a six-hour diagnostic earns
~$42/hour, anchors the relationship cheap, and makes the most valuable artefact
in the system look like a lead magnet. Credit it in full against the Sprint.

### 1.2 Build-first contradicts the evidence finding

The four proposed deliverables (Universal Intake, Diagnostic Engine, Website
Template, HAMAL Playbook) are **infrastructure built before revenue**. The
council was unanimous that two of three candidate offers were "fantasies
requiring a template that does not exist," and that building it is "60+ days of
solo engineering with zero revenue in between."

**Resolution adopted here:** all four deliverables still get built — but **as
by-products of paid diagnostics, not as a precondition for selling them.**
Sequencing is in §6. The rule: *no asset is built speculatively that a paid
engagement could produce as a side-effect.*

### 1.3 Capacity and delivery economics were never priced

This was the single most-cited blind spot in peer review: no advisor, and no
version of the commercial model, has stated what the operator needs to earn or
what a solo operator can actually deliver. §5 fixes this. It is the binding
constraint on the whole model and it is not optional.

---

## 2. The commercial model

### Stage 1 — STB Business Diagnostic *(the only cold offer)*

| | |
|---|---|
| **Price (hypothesis)** | **$500–750**, credited in full against Stage 2 |
| **Duration** | 5 working days |
| **Human time budget** | ≤ 6 hours |
| **Input** | Universal Practitioner Intake + 90-minute call + read access to their site, booking tool and inbox |
| **Output** | Written blueprint: positioning, offer, client journey, and a **severity-ranked defect list** naming the single highest-value bottleneck, with a scoped fix plan |
| **Claims permitted** | "Here is what is broken and what it would take to fix." |
| **Claims forbidden** | Any conversion, booking or revenue improvement figure |
| **Privacy posture** | No health data. No client-of-client PII. Business facts only. |

### Stage 2 — Practitioner Launch & Conversion Sprint

| | |
|---|---|
| **Price (hypothesis)** | **$2,500–5,000**, scoped to the diagnostic's top bottleneck |
| **Duration** | 14–21 days |
| **Eligibility** | **Stage 1 completed.** Never sold cold. |
| **Scope rule** | The six components are a **menu, not a checklist.** The diagnostic selects which are in scope; the rest are explicitly out of scope in writing. |
| **Components** | Diagnostic & clarity blueprint · offer positioning and client journey · conversion-ready site or landing page · intake, booking and follow-up workflow · basic CRM and conversion tracking · handover and operating instructions |
| **Definition of done** | The practitioner's own test enquiry traverses the full journey and arrives in their CRM, witnessed by them |

### Stage 3 — STB Continuity & Growth

| | |
|---|---|
| **Price** | **Do not price yet.** |
| **Gate** | Not offered until **three** Stage 2 engagements have produced measured before/after numbers |
| **Why** | Continuity is a retention claim. We have no retention data, and our only pilot disengaged. |

---

## 3. Evidence and claims discipline

This section is binding on all client-facing material.

1. **No outcome claim without a measured before/after** from a named,
   consenting client. We currently have **zero**.
2. **Flo may not be referenced** — not by name, photograph, testimonial or
   recognisable description — without her written permission. She was unpaid
   R&D, she disengaged, and no outcome data exists. Her site was never publicly
   deployed, so no "live case study" claim is available.
3. **The reference implementation may be used as a code source, not a
   credential.** Reusable components may be extracted (§6.3); the engagement may
   not be presented as a client success.
4. **Baseline-first.** Every Stage 2 engagement records the practitioner's
   inquiry and booking counts *before* work starts. Without a baseline there is
   no evidence, only assertion.
5. **Never ship a fabricated state.** No invented scarcity, no confirmation of
   a booking the system cannot confirm, no "we have sent it" where nothing is
   sent. All three shipped in the reference implementation and all three are now
   blocked by automated test. This is consumer-protection, not polish.

---

## 4. Privacy and legal posture

| Area | Position |
|---|---|
| **Health data** | Not collected, at any stage. Special-category under GDPR Art. 9; practitioners are in the EU/NL. A somatic practitioner's intake is exactly the data we must not hold. |
| **Client-of-client PII** | Stage 1 handles none. Stage 2 configures the practitioner's own systems — they remain controller; we are at most processor, and that requires a DPA. |
| **DPA** | Required before any Stage 2 touching their CRM. **Not yet drafted — blocker.** |
| **Entity & invoicing** | A solo operator in Bali invoicing EUR/USD to EU practitioners raises tax, establishment and controller questions. **Unresolved — flagged, not advised on. Get local counsel.** |
| **Refund policy** | A first buyer with no track record needs a bounded, written guarantee to close. **Not yet drafted — blocker for first sale.** |

---

## 5. Delivery economics *(the binding constraint)*

Solo operator leveraged with agents. Realistic concurrency: **one Sprint at a
time, plus two diagnostics.**

| Scenario | Monthly volume | Gross (hypothesis) |
|---|---|---|
| Diagnostics only | 6 × $625 | ~$3,750 |
| Steady state | 1 Sprint @ $3,500 + 3 diagnostics @ $625 | ~$5,375 |
| Ceiling (solo) | 2 Sprints + 2 diagnostics | ~$8,250 |

**Three consequences that must be accepted or the model changes:**

1. **The Sprint does not scale with hours.** 14–21 days of a single operator's
   attention caps the business at roughly two per month regardless of AI
   leverage. Growth comes from *shortening* the Sprint via reuse, not from
   selling more of them.
2. **The diagnostic is the scalable tier.** It is time-boxed, agent-assisted,
   and produces the corpus. Treating it as a $250 lead magnet throws away the
   only leverage in the model.
3. **Write down the monthly number you need before the first sale.** If the
   ceiling above does not reach it, this is a bridge to a product, not a
   business — which is fine, but it must be a decision rather than a discovery.

**Open question requiring your answer:** what is the monthly figure this has to
clear? Every price in this document is unanchored until that exists.

---

## 6. What gets built, and when

**Governing rule:** no asset is built speculatively that a paid engagement could
produce as a side-effect.

### 6.1 Universal Practitioner Intake V1
Reconcile the three existing Notion questionnaires into one adaptable instrument.

- **Source of truth:** `Client Clarity Intake` — richest schema (origin, vision,
  ideal customer, offers, resistance, delivery preferences, consent, status,
  blueprint generation).
- **Merge in from `Theo`:** commercial reality — revenue, lead sources,
  conversion, client volume, capacity, budget, measurement readiness, 90-day targets.
- **Merge in from `Sheetal`:** worldview preservation — methodology, boundaries,
  authority, cultural language. This is what stops the system flattening
  practitioners into generic wellness marketing.
- **Three layers** (per your own "do not build before clarity" principle):
  **A. Quick Discovery** — qualify without overwhelming.
  **B. Business Diagnostic** — commercial reality; selects the Sprint scope.
  **C. Practitioner Blueprint** — philosophy, language, assets. **Collected only when a Stage 2 is agreed.**
- **Note:** the Notion page titled `CLIENT INTAKE - STB` is **blank**. A named
  page is not a working form. Fill or delete it — an empty canonical-looking
  page is worse than none.
- **Built during:** diagnostics 1–3. Each paid diagnostic refines it.

### 6.2 STB Diagnostic & Blueprint Engine
Converts intake responses into a structured assessment naming the highest-priority issue.

- **V1 is a prompt + a fixed template, not software.** Resist building an engine
  before ten diagnostics have shown what the output should contain.
- **The real asset is the defect taxonomy** — the severity-ranked checklist,
  identical across practitioners, that accumulates. This is the chairman's
  finding and your own compounding rule meeting. It is what eventually runs
  semi-automatically through HAMAL.
- **Built during:** diagnostics 1–6, by extracting what recurs.

### 6.3 Practitioner Website & Conversion Template
Extract reusable components from the Flo implementation, carrying no personal identity or assets.

**Already extracted and proven (this week):**
- `src/lib/intake.ts` — single enquiry routing point, no `mailto:` path by design
- Regression guard — fails the build if a `mailto:` submission or invented scarcity returns
- Asset-register test — fails if a declared asset does not exist
- Honest-state patterns — no confirmation without confirmation; blocked-popup fallback

**Must be stripped before reuse:** all Flo photography, copy, testimonials,
name, offers and prices. The components are reusable; the identity is not.

**Deliberately deferred:** multi-tenant configuration. Build the second
practitioner site by copying and editing. Extract a template at the **third**,
when the real variation is known rather than guessed.

### 6.4 HAMAL Delivery Playbook
Agents, skills, quality gates, approvals, handover.

| Stage | Skill / agent | Gate |
|---|---|---|
| Lead routing | `stb-doorkeeper` | Lane and first doorway assigned |
| Intake | Universal Intake V1 | All Layer A+B fields complete |
| Diagnostic | `stb-offer-architect` + defect taxonomy | One named bottleneck + scoped fix plan |
| Scope agreement | — | **Written scope, with out-of-scope items named.** Client signs. |
| Build | Template components | Typecheck + tests + render check pass |
| Pre-handover | Journey test | **Client's own test enquiry arrives in their CRM, witnessed by them** |
| Handover | Operating instructions | Client can run it without us |
| Evidence | `stb-evidence-tracker` | Before/after recorded |
| Learning | `hamal-learning-loop` (spec'd) | ≥1 transferable rule added to the taxonomy |

---

## 7. The compounding rule, made operational

> *Every practitioner implementation should improve the next implementation.*

This is the most important sentence in the commercial model, and it is worth
nothing as an aspiration. Made enforceable:

1. **An engagement is not closed until it has deposited something.** A new
   intake question, a taxonomy entry, a reusable component, or a test. The
   evidence tracker's close step checks for it.
2. **The taxonomy is versioned and append-only.** Every defect found in a real
   practitioner's funnel enters it with a severity and a standard fix.
3. **Nothing is rebuilt from memory.** If it was solved once, it exists as a
   component or a documented pattern, or it was not actually solved.
4. **Measure the compounding.** Log human hours per engagement. If engagement 6
   does not take meaningfully less time than engagement 2, the system is not
   compounding and the thesis is wrong — which you want to know early.

---

## 8. 30-day pilot execution plan

Entry condition: §4 blockers closed (refund policy drafted; DPA drafted if any
Stage 2 is contemplated). Do not sell before these exist.

| Week | Work | Gate |
|---|---|---|
| **0** (2 days) | Write the monthly revenue floor (§5). Draft refund policy. Build **one sample diagnostic against a property you control** — not Flo's. Strip internal codenames from anything client-facing. | A sample you can legally show a stranger exists |
| **1** | Universal Intake V1 from the three Notion sources. Fill or delete the blank `CLIENT INTAKE - STB`. One-page Stage 1 offer in the buyer's words. | Intake completable end-to-end by someone new |
| **2** | 10 conversations from the Bali + diaspora network. **Name the channel — this was a council blind spot; "ask people" is not a channel.** Close 3 diagnostics. | 3 paid |
| **3** | Deliver 3 diagnostics. Timebox 6 hours each; **log actual hours.** Extract taxonomy v0.1 from what recurs. | 3 delivered, hours logged |
| **4** | Convert ≥1 diagnostic to a Sprint with written scope. Record the practitioner's baseline numbers before any work. | 1 Sprint sold with baseline captured |

### Kill criteria — write these down before starting

- Fewer than **3 paid diagnostics by day 21** → the offer is not repeatable. Stop.
- Diagnostics averaging **over 12 hours** → not economic. Re-scope or stop.
- **Zero** diagnostics convert to a Sprint → the ladder is broken; the diagnostic
  may be a product but the Sprint is not its upsell.
- No Stage 3 pricing until **three** Sprints have measured before/after data.

### Naming

The council's Outsider was the only advisor to raise it and two reviewers
agreed: "Stop the Bleed," "Business Pressure Test," "Trip Wire Detector,"
"Doorkeeper," "Build While You Heal" are emergency-room metaphors sold to people
whose professional identity is calm. Keep them as **internal** names. Client-
facing, lead with the symptom they would say aloud — *"people message me and I
lose them."* Internal vocabulary stays internal.

---

## 9. Open decisions

| # | Decision | Needed by |
|---|---|---|
| D-1 | **What monthly revenue must this clear?** Every price is unanchored without it. | Before pricing |
| D-2 | Stage 1 at $500–750 (recommended) or $250–500 (as proposed)? | Week 0 |
| D-3 | Authorise push to `SPARK-LAB-STB` so this lands in its canonical home? | Immediate |
| D-4 | Which outreach channel for the 10 conversations? | Week 2 |
| D-5 | Seek Flo's written consent for reference use, or exclude her entirely? | Before any marketing |
| D-6 | Who drafts the DPA and refund policy? | Before first sale |

---

## 10. What this blueprint does not claim

- No validated market rate. All prices are hypotheses.
- No evidence any practitioner will pay. Zero have.
- No evidence the Sprint improves conversion. No before/after exists.
- No working multi-tenant platform. It is not built and is deliberately deferred.
- No case study. The one implementation was unpaid, undeployed and is
  unreferenceable without consent.

The purpose of the 30-day pilot is to convert the first three of these from
assertions into evidence.
