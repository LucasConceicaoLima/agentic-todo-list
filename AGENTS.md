# Root Agent — Todo Agents Lab

## Mission

This repository is a learning laboratory for AI coding agents.

The application domain is intentionally small: a Todo List. The technical stack is realistic enough to exercise agent behavior without making framework learning the main objective.

Primary learning goals:

- instruction hierarchy;
- scope and ownership;
- context management;
- task decomposition;
- cross-area handoffs;
- contract-first changes;
- independent verification;
- regression prevention;
- minimal, reviewable changes.

## Repository map

```text
todo-agents-lab/
├── AGENTS.md
├── README.md
├── package.json
├── frontend/
│   ├── AGENTS.md
│   └── package.json
├── backend/
│   ├── AGENTS.md
│   └── package.json
├── tests/
│   ├── AGENTS.md
│   └── package.json
└── docs/
    ├── ARCHITECTURE.md
    └── EXERCISES.md
```

## Architecture

```text
┌──────────────────────────┐
│ Frontend                  │
│ React + TypeScript + MUI  │
└────────────┬─────────────┘
             │ HTTP/JSON
             ▼
┌──────────────────────────┐
│ Backend                  │
│ NestJS + TypeScript      │
└────────────┬─────────────┘
             │
             ▼
       In-memory storage
       (initially)

Tests verify the API and critical user flows independently.
```

Do not introduce a database, authentication, queues, Docker, Redis, Prisma, GraphQL, microservices, or other infrastructure unless a learning exercise explicitly asks for it.

## Product scope

The initial product should eventually support:

- list todos;
- create a todo;
- edit its title;
- mark complete/incomplete;
- delete a todo;
- basic filtering: all, active, completed.

A todo starts with this conceptual model:

```ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## API contract

The initial API contract is:

```text
GET    /todos
POST   /todos
PATCH  /todos/:id
DELETE /todos/:id
```

Suggested request bodies:

```json
POST /todos
{
  "title": "Study AGENTS.md"
}
```

```json
PATCH /todos/:id
{
  "title": "Study agent handoffs",
  "completed": true
}
```

Do not silently change this contract.

## Agent ownership

### Root / Orchestrator responsibility

For tasks spanning multiple areas, act as an orchestrator before editing.

Determine:

1. which areas are affected;
2. whether the public API contract changes;
3. the safest implementation order;
4. which tests must prove the behavior;
5. whether one area is blocked by another.

Recommended order for cross-area features:

```text
contract / acceptance criteria
          ↓
       backend
          ↓
       frontend
          ↓
        tests
          ↓
     final verification
```

This is a default, not a rigid rule. For a frontend-only visual change, do not manufacture backend work.

### Frontend ownership

Files under `frontend/` follow `frontend/AGENTS.md` in addition to this file.

Frontend owns presentation, browser state, API consumption, user interaction, accessibility, loading/error feedback, and MUI composition.

### Backend ownership

Files under `backend/` follow `backend/AGENTS.md` in addition to this file.

Backend owns HTTP endpoints, validation, domain rules, error semantics, DTOs, services, and in-memory persistence.

### Tests ownership

Files under `tests/` follow `tests/AGENTS.md` in addition to this file.

Tests own independent behavioral verification, API integration coverage, end-to-end scenarios, regression tests, and defect reproduction.

## Handoff protocol

When work crosses boundaries, record the handoff explicitly in your reasoning or final summary.

Use this structure:

```text
Handoff
From: Backend
To: Frontend
Contract: PATCH /todos/:id now accepts { priority: "low" | "medium" | "high" }
Frontend impact: add priority input and render priority
Verification: API integration test + E2E creation/edit flow
```

A handoff should communicate a contract or observable behavior, not internal implementation details.

## Change discipline

Before changing code:

1. read the closest applicable `AGENTS.md`;
2. inspect existing patterns before creating new ones;
3. identify the smallest coherent change;
4. state assumptions when the request is ambiguous;
5. avoid unrelated refactors.

During implementation:

- preserve public contracts unless change is intentional;
- keep types aligned across boundaries;
- do not duplicate domain rules in the frontend;
- do not weaken tests to make an implementation pass;
- prefer explicit, boring code over clever abstractions;
- do not add dependencies without a concrete need.

After implementation:

- run the relevant checks;
- verify the requested behavior;
- mention any checks you could not run;
- summarize changed areas and handoffs.

## Definition of done

A change is complete when all applicable conditions are true:

- requested behavior exists;
- acceptance criteria are satisfied;
- API contract is consistent;
- TypeScript compiles;
- lint passes;
- relevant tests pass;
- no unrelated files were changed;
- user-facing errors are understandable;
- agent handoffs, when needed, are explicit.

## Learning behavior

This repository is intended for studying agents. When finishing a substantial task, include a concise learning note containing:

- which `AGENTS.md` files governed the work;
- what was delegated or scoped;
- any handoff that occurred;
- what verification proved completion.

Do not produce long tutorials unless asked. The goal is to make agent behavior observable.
