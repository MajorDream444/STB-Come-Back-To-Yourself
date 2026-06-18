---
name: update-feature-implementation-and-related-forms
description: Workflow command scaffold for update-feature-implementation-and-related-forms in STB-Come-Back-To-Yourself.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-feature-implementation-and-related-forms

Use this workflow when working on **update-feature-implementation-and-related-forms** in `STB-Come-Back-To-Yourself`.

## Goal

Update a core feature (e.g., booking or lead capture) and its related forms and backend/API integration, or simplify/remove backend logic and update forms accordingly.

## Common Files

- `api/book.ts`
- `src/components/BookingSession.tsx`
- `src/components/BreathReset.tsx`
- `vercel.json`
- `.env.example`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Modify or remove API/backend route files as needed (e.g., api/book.ts).
- Update corresponding frontend components that interact with the backend or handle form logic (e.g., src/components/BookingSession.tsx, src/components/BreathReset.tsx).
- Adjust configuration files for deployment or environment as necessary (e.g., vercel.json, .env.example).

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.