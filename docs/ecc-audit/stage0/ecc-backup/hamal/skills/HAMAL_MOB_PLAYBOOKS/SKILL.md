```markdown
# HAMAL_MOB_PLAYBOOKS Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns, coding conventions, and workflows used in the `HAMAL_MOB_PLAYBOOKS` repository. The codebase is written in TypeScript and follows a set of conventions for file naming, imports, exports, and testing. This guide will help new contributors quickly align with the project's standards and efficiently collaborate on code.

## Coding Conventions

### File Naming
- Use **snake_case** for all file names.
  - **Example:**  
    ```
    user_profile.ts
    data_loader.test.ts
    ```

### Import Style
- Use **relative imports** for referencing modules within the project.
  - **Example:**  
    ```typescript
    import { fetchData } from './data_loader';
    ```

### Export Style
- Use **named exports** for all modules.
  - **Example:**  
    ```typescript
    // In data_loader.ts
    export function fetchData() { ... }
    ```

### Commit Messages
- Commit messages are **freeform** and often start with a short prefix, averaging 50 characters.
  - **Example:**  
    ```
    Add initial data loader for user profiles
    Fix bug in fetchData error handling
    ```

## Workflows

### Adding a New Module
**Trigger:** When you need to add a new feature or utility module  
**Command:** `/add-module`

1. Create a new file using snake_case (e.g., `feature_name.ts`).
2. Implement your logic using TypeScript.
3. Use named exports for all functions or constants.
4. Import dependencies using relative paths.
5. Write a corresponding test file named `feature_name.test.ts`.
6. Commit your changes with a clear, concise message.

### Writing and Running Tests
**Trigger:** When you need to verify the correctness of your code  
**Command:** `/run-tests`

1. Create a test file using the pattern `*.test.ts` (e.g., `data_loader.test.ts`).
2. Write tests for each exported function or feature.
3. Use the project's preferred (currently undetected) testing framework.
4. Run tests using the project's test runner (see project documentation or package.json for details).

### Refactoring Existing Code
**Trigger:** When improving or updating existing modules  
**Command:** `/refactor-module`

1. Locate the target file (use snake_case naming).
2. Make improvements, ensuring all imports remain relative.
3. Update named exports as needed.
4. Update or add tests to cover changes.
5. Commit with a descriptive message about the refactor.

## Testing Patterns

- Test files follow the `*.test.ts` naming convention.
- Each test file should correspond to a module and cover all exported functions.
- The testing framework is currently unknown; check the project documentation or package.json for details.
- Example test file:
  ```typescript
  // data_loader.test.ts
  import { fetchData } from './data_loader';

  describe('fetchData', () => {
    it('should return data for valid input', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command         | Purpose                                   |
|-----------------|-------------------------------------------|
| /add-module     | Scaffold and add a new module             |
| /run-tests      | Run all tests in the repository           |
| /refactor-module| Refactor an existing module               |
```
