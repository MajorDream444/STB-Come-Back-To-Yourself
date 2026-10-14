# Priority 4 — ECC Artifact Reconciliation

**Nothing was deleted.** Everything below is backed up at
`docs/ecc-audit/stage0/ecc-backup/hamal/` and proposed for approval.

## Inventory

ECC artifacts exist in exactly one repository in scope:
`MajorDream444/HAMAL_MOB_PLAYBOOKS`, all generated 2026-07-07T14:07 (one run).
`STB-Come-Back-To-Yourself`, `SPARK-LAB-STB` and `STB-COMMAND-CENTER` contain none.

| # | Artifact | Generated | Size | Status | Evidence |
|---|---|---|---|---|---|
| A-1 | `.claude/ecc-tools.json` | 2026-07-07 | v1.3 | **Stale** | `referenceSetReadiness: 0/7`, all items "missing". A 3-month-old readiness report scoring zero. |
| A-2 | `.claude/identity.json` | 2026-07-07 | v2.0 | **Conflicting** | Declares `domains: ["typescript"]`. HAMAL contains **zero** TypeScript files. |
| A-3 | `.claude/skills/HAMAL_MOB_PLAYBOOKS/SKILL.md` | 2026-07-07 | — | **Conflicting & active** | Auto-generated. Opens: *"The codebase is written in TypeScript"* and teaches *"Use **snake_case** for all file names."* |
| A-4 | `.claude/homunculus/instincts/inherited/HAMAL_MOB_PLAYBOOKS-instincts.yaml` | 2026-07-07 | 5,064 B | **Stale, inert** | ECC `continuous-learning-v2` instinct store. Populated but the observer daemon is not installed, so nothing reads or updates it. |

## The problem with A-3

`.claude/skills/` is **active context**. Any Claude session opened in
HAMAL_MOB_PLAYBOOKS loads this skill, which asserts the repository is a
TypeScript codebase with snake_case file conventions.

Measured reality:

```
120 .md    30 .yaml    28 .zip    4 .toml    4 .svg    2 .json    1 .csv
  0 .ts     0 .tsx
```

HAMAL_MOB_PLAYBOOKS is a documentation and playbook repository
(`00_stage_a_foundation` … `09_sources`, `SYSTEM.md`, `CONTEXT.md`). ECC's
repo-analysis misclassified it, then generated coding conventions for a
language it does not contain.

This is the §3 finding of the main audit — *prompt-only skills create false
assurance* — demonstrated on your own repository. The skill is confident,
specific, and wrong, and it has been loading into HAMAL sessions for three
months.

It also illustrates R-06 (doctrine collision): an auto-generated "development
patterns" skill sits alongside `SYSTEM.md` with no statement of which governs.

## Proposed actions — approval required, nothing done

| # | Artifact | Proposal | Why |
|---|---|---|---|
| 1 | A-3 skill | **Remove** | Actively wrong, and loads into every HAMAL session. Highest priority. |
| 2 | A-2 identity.json | **Remove or correct** | `typescript` is wrong. If kept, domains should describe a documentation repo. |
| 3 | A-1 ecc-tools.json | **Remove** | A stale 0/7 report. Re-run deliberately later if ECC Tools is adopted. |
| 4 | A-4 instincts.yaml | **Retain, inert** | Harmless while unread, and it is the only record of what ECC inferred. Revisit only if `continuous-learning-v2` is ever adopted (deferred — R-12). |

**Recommended sequence:** remove #1 first and on its own. It is the only
artifact changing agent behaviour today, and removing it needs no decision
about ECC adoption.

**Rollback:** restore from `docs/ecc-audit/stage0/ecc-backup/hamal/`.

**Out of scope:** HAMAL_MOB_PLAYBOOKS is attached read-only in this session, so
these changes cannot be made here regardless. They need a session with write
access to that repository.
