```markdown
# STB-Come-Back-To-Yourself Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides guidance for contributing to the **STB-Come-Back-To-Yourself** codebase, a TypeScript project built with the Vite framework. It covers the project's coding conventions, key development workflows (especially around feature and form updates), and testing patterns. Use this as a reference to ensure consistency and efficiency when working on this repository.

## Coding Conventions

### File Naming
- **CamelCase** is used for file names.
  - Example: `BookingSession.tsx`, `BreathReset.tsx`

### Import Style
- Both **default** and **named** imports are used, depending on the module.
  - Example (named import):
    ```typescript
    import { useState } from 'react';
    ```
  - Example (default import):
    ```typescript
    import React from 'react';
    ```

### Export Style
- **Named exports** are preferred.
  - Example:
    ```typescript
    export function BookingSession() {
      // ...
    }
    ```

### Commit Patterns
- Commit messages are **freeform**, sometimes with prefixes, averaging 59 characters.
  - Example:  
    ```
    Update booking form to include new session types
    ```

## Workflows

### Update Feature Implementation and Related Forms
**Trigger:** When you need to add, remove, or change a major feature that involves both frontend forms and backend/API logic.  
**Command:** `/update-feature-and-forms`

1. **Modify or remove API/backend route files as needed.**
   - Example: Edit or delete `api/book.ts` to reflect new business logic.
   ```typescript
   // api/book.ts
   export async function bookSession(req, res) {
     // Updated booking logic here
   }
   ```
2. **Update corresponding frontend components that interact with the backend or handle form logic.**
   - Example: Update `src/components/BookingSession.tsx` and `src/components/BreathReset.tsx` to match backend changes.
   ```typescript
   // src/components/BookingSession.tsx
   import { bookSession } from '../../api/book';

   function BookingSession() {
     // Updated form and API call logic
   }
   ```
3. **Adjust configuration files for deployment or environment as necessary.**
   - Example: Edit `vercel.json` or `.env.example` if endpoints or environment variables change.
   ```json
   // vercel.json
   {
     "rewrites": [{ "source": "/api/(.*)", "destination": "/api/book.ts" }]
   }
   ```
   ```env
   // .env.example
   API_BASE_URL=https://your-api-url.com
   ```

**Files Typically Involved:**
- `api/book.ts`
- `src/components/BookingSession.tsx`
- `src/components/BreathReset.tsx`
- `vercel.json`
- `.env.example`

**Frequency:** ~2x/month

---

## Testing Patterns

- **Test Framework:** Not explicitly detected.
- **Test File Pattern:** Files follow the `*.test.*` naming convention.
  - Example: `BookingSession.test.tsx`
- **Test Example:**
  ```typescript
  // BookingSession.test.tsx
  import { render } from '@testing-library/react';
  import { BookingSession } from './BookingSession';

  test('renders booking form', () => {
    render(<BookingSession />);
    // assertions here
  });
  ```

## Commands

| Command                    | Purpose                                                                 |
|----------------------------|-------------------------------------------------------------------------|
| /update-feature-and-forms  | Update a core feature and its related forms and backend/API integration. |
```
