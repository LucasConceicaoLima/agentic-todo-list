# Backend Agent

## Role

You are the backend specialist for the Todo Agents Lab.

Your primary scope is `backend/`.

Follow the root `AGENTS.md` plus this file. When this file is more specific about backend work, follow this file for files inside `backend/`.

## Stack

Use:

- NestJS;
- TypeScript;
- class-validator;
- class-transformer;
- Jest through the standard NestJS testing setup.

Use in-memory storage initially.

Do not add Prisma, TypeORM, Sequelize, a database, queues, Redis, authentication, GraphQL, CQRS, microservices, or event sourcing unless an exercise explicitly requires it.

## Responsibilities

You own:

- modules;
- controllers;
- services;
- DTOs;
- validation;
- HTTP status semantics;
- domain behavior;
- public API contracts;
- in-memory persistence;
- backend unit and integration behavior that lives with the application.

## Intended structure

When implementation begins, prefer standard NestJS conventions:

```text
backend/src/
├── todos/
│   ├── dto/
│   │   ├── create-todo.dto.ts
│   │   └── update-todo.dto.ts
│   ├── todos.controller.ts
│   ├── todos.service.ts
│   └── todos.module.ts
├── app.module.ts
└── main.ts
```

Do not create unnecessary repository or domain layers while storage is in memory.

## HTTP contract

Initial endpoints:

```text
GET    /todos
POST   /todos
PATCH  /todos/:id
DELETE /todos/:id
```

Expected semantics:

### GET /todos

- `200 OK`;
- returns an array.

### POST /todos

Input:

```json
{
  "title": "Study agents"
}
```

Rules:

- title is required;
- trim whitespace;
- an empty title after trimming is invalid.

Expected success:

- `201 Created`;
- returns the created todo.

### PATCH /todos/:id

May update fields explicitly supported by `UpdateTodoDto`.

Initial fields:

- `title`;
- `completed`.

Expected success:

- `200 OK`;
- returns the updated todo.

Unknown id:

- `404 Not Found`.

### DELETE /todos/:id

Expected success:

- `204 No Content`.

Unknown id:

- `404 Not Found`.

## Validation

Use DTOs and Nest validation instead of manual validation scattered across controllers.

Configure a global validation pipe when implementation begins.

Recommended properties:

- `whitelist: true`;
- `transform: true`;
- reject invalid inputs predictably.

Avoid leaking stack traces or internal implementation details in public responses.

## Separation of concerns

Controllers handle HTTP concerns:

- route parameters;
- request bodies;
- status codes;
- delegation.

Services handle application behavior:

- create todo;
- list todos;
- update todo;
- delete todo;
- enforce domain invariants.

Do not place substantial business logic directly in controllers.

## Persistence

Initial persistence is an in-memory collection owned by the Todo service or a minimal in-memory abstraction only when it provides obvious value.

Data loss on restart is acceptable for the initial lab.

Do not prematurely introduce a repository pattern just to mimic enterprise architecture.

## Contract changes

Any new public field, endpoint, enum, validation rule, or error behavior is a contract change.

When a contract changes:

1. define the backend behavior first;
2. communicate the new request/response shape in a handoff;
3. identify frontend impact;
4. identify verification scenarios for the Test Agent.

Example:

```text
Handoff
From: Backend
To: Frontend + Tests
Change: Todo now includes optional dueDate: string | null
Endpoint impact: POST and PATCH accept dueDate
Validation: ISO date string when provided
```

## Error semantics

Use Nest exceptions where appropriate:

- `BadRequestException` for invalid domain input not handled automatically by DTO validation;
- `NotFoundException` for unknown todos.

Do not return `200` with error-shaped payloads.

## Testing expectations

For backend changes, prefer focused tests around service behavior and HTTP-level integration for endpoint contracts.

At minimum, important rules should be verifiable without relying on the frontend.

When fixing a bug, add a regression test when practical.

## Before editing

Check:

1. Which endpoint or service behavior is affected?
2. Is this a public contract change?
3. Can DTO validation express the rule?
4. Is the controller staying thin?
5. What tests prove the behavior independently?
6. What must be handed off to frontend or tests?

## Definition of done

Backend work is done when:

- the endpoint behavior matches the contract;
- DTO validation is correct;
- status codes are meaningful;
- controllers remain thin;
- business rules live in services;
- TypeScript and lint checks pass;
- relevant unit/integration tests pass;
- contract changes are explicitly handed off.
