# Todo Agents Lab

Projeto-base para estudar **AI coding agents e arquivos `AGENTS.md`** usando uma aplicação simples de Todo List.

A aplicação final usa uma stack suficientemente realista para permitir mudanças full stack, mas o objetivo principal **não é estudar React ou NestJS**. O foco é observar como instruções, escopo, handoffs, contratos e testes influenciam o comportamento do agente.

## Stack planejada

### Frontend

- React
- TypeScript
- Vite
- Material UI (MUI)

### Backend

- NestJS
- TypeScript
- `class-validator`
- armazenamento em memória inicialmente

### Testes

- Jest / Supertest para comportamento de API quando necessário
- Playwright para fluxos E2E

## Estrutura

```text
todo-agents-lab/
├── AGENTS.md                 # instruções globais / orquestração
├── README.md
├── package.json
│
├── frontend/
│   ├── AGENTS.md             # especialista de frontend
│   └── package.json
│
├── backend/
│   ├── AGENTS.md             # especialista de backend
│   └── package.json
│
├── tests/
│   ├── AGENTS.md             # especialista independente de QA/testes
│   └── package.json
│
└── docs/
    ├── ARCHITECTURE.md
    └── EXERCISES.md
```

## Como usar este repositório

Neste ZIP ainda **não existe implementação da Todo List**. Isso é proposital.

A primeira experiência pode ser simplesmente abrir o projeto em uma ferramenta que reconheça `AGENTS.md` e pedir:

> Implemente a primeira versão funcional da Todo List descrita no repositório.

O interessante é observar se o agente:

- lê o `AGENTS.md` da raiz;
- respeita as instruções locais de `frontend/`, `backend/` e `tests/`;
- cria o contrato do backend antes de integrar o frontend;
- mantém responsabilidades separadas;
- adiciona testes coerentes;
- relata handoffs entre áreas.

## AGENTS.md hierárquicos

A organização foi feita para permitir estudar instruções em diferentes níveis.

```text
AGENTS.md da raiz
      │
      ├── frontend/AGENTS.md
      ├── backend/AGENTS.md
      └── tests/AGENTS.md
```

O arquivo da raiz contém regras do projeto inteiro. Os arquivos das subpastas especializam as instruções para cada responsabilidade.

Isso permite experimentar conceitos como:

- escopo;
- contexto local;
- especialização;
- limites de responsabilidade;
- handoff;
- verificação independente.

## Escopo funcional inicial

A Todo List deve suportar:

- criar tarefa;
- listar tarefas;
- editar título;
- concluir/reabrir tarefa;
- excluir tarefa;
- filtrar por todas, pendentes e concluídas.

Modelo inicial:

```ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

API inicial:

```text
GET    /todos
POST   /todos
PATCH  /todos/:id
DELETE /todos/:id
```

## Instalação futura

Depois que os agents criarem a implementação:

```bash
npm install
```

O projeto raiz usa npm workspaces para `frontend`, `backend` e `tests`.

Os scripts foram preparados como convenções esperadas, mas alguns só funcionarão depois que a estrutura de código for criada pelos agents.

## O que observar durante os exercícios

Não avalie apenas se o código funciona. Observe também:

- o agente alterou somente o que precisava?
- identificou corretamente o dono da mudança?
- respeitou o contrato entre frontend e backend?
- comunicou uma mudança de contrato?
- os testes verificam comportamento ou implementação?
- houve duplicação de regra de negócio?
- adicionou bibliotecas desnecessárias?
- criou abstrações sem necessidade?
- informou como validou a tarefa?

Veja `docs/EXERCISES.md` para uma sequência de experimentos.
