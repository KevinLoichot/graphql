# Contribution Guide - GraphQL Profile Page

Personal conventions used on this solo project.

---

## Table of contents

- [Git Workflow](#git-workflow)
- [Branch naming](#branch-naming)
- [Commit conventions](#commit-conventions)
- [Code standards](#code-standards)
- [Bug tracking](#bug-tracking)

---

## Git Workflow

```bash
# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Create a branch following the naming convention
git checkout -b feat/feature-name

# 3. Commit one logical change at a time
git add path/to/file
git commit -m "feat(scope): short description"

# 4. Push and merge into main when stable
git push origin feat/feature-name
git checkout main
git merge feat/feature-name
```

### Branch strategy

```
main  ← stable branch
 ├── feat/login
 ├── feat/graphql-queries
 ├── feat/svg-graphs
 ├── fix/jwt-expiry
 └── docs/readme
```

**Rules:**

- Never work directly on `main`
- Each feature / fix gets its own branch
- Merge into `main` only when functional

---

## Branch naming

| Prefix      | Usage                              | Example               |
| ----------- | ---------------------------------- | --------------------- |
| `feat/`     | New feature                        | `feat/svg-graphs`     |
| `fix/`      | Bug fix                            | `fix/jwt-expiry`      |
| `refactor/` | Refactoring or dead code cleanup   | `refactor/cleanup`    |
| `docs/`     | Documentation only                 | `docs/readme`         |
| `chore/`    | Maintenance (config, .gitignore…)  | `chore/gitignore`     |

> The name after the prefix must be in **kebab-case** (lowercase, hyphens), short and descriptive.

---

## Commit conventions

[Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

### Types

| Type       | Description                        |
| ---------- | ---------------------------------- |
| `feat`     | New feature                        |
| `fix`      | Bug fix                            |
| `docs`     | Documentation                      |
| `style`    | Formatting (no logic change)       |
| `refactor` | Refactoring                        |
| `chore`    | Maintenance                        |

### Examples

```bash
git commit -m "feat(auth): add JWT login with base64 basic auth encoding"
git commit -m "feat(graphql): add nested query result + user"
git commit -m "feat(graphs): add SVG line chart for XP over time"
git commit -m "fix(auth): fix error message on invalid credentials"
git commit -m "refactor(profile): simplify section rendering"
git commit -m "docs: update README with hosting link"
```

---

## Code standards

### JavaScript

- **Vanilla JS only** — no framework (React, Vue, etc.)
- Naming: `camelCase` for functions and variables
- Render functions prefixed with `render*` (e.g. `renderProfile`, `renderGraph`)
- API functions prefixed with `api*` (e.g. `apiLogin`, `apiQuery`)
- No `console.log` left in production

### CSS / HTML

- **Indentation**: 2 spaces
- **Quotes**: Double `"` in HTML, single `'` in JS and CSS
- **Semicolons**: Required in JS
- CSS classes in `kebab-case`

### GraphQL

- Queries are centralised in a dedicated file (e.g. `queries.js`)
- All 3 query types must be covered: normal, nested, with arguments
- JWT is sent via `Authorization: Bearer <token>`

### SVG

- Graphs are generated dynamically in JS via `document.createElementNS`
- No external library (D3, Chart.js, etc.)

### Comments

- All code comments are written in **English**
- Single line: `// comment`
- Multi-line:
  ```js
  /*
   * First line.
   * Second line.
   */
  ```

---

## Bug tracking

Personal template to note a bug to fix:

```
## Bug: [short title]

- Steps to reproduce: ...
- Expected behaviour: ...
- Actual behaviour: ...
- Environment: Browser + version
- Console logs: ...
```
