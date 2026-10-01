# Arquitetura do laboratório

## Visão geral

```text
Browser
  │
  ▼
React + MUI
  │
  │ HTTP/JSON
  ▼
NestJS API
  │
  ▼
In-memory Todo collection
```

Os testes E2E observam o sistema externamente:

```text
Playwright
    │
    ▼
Frontend ───────► Backend
```

## Por que manter armazenamento em memória?

A persistência não é o objetivo inicial do laboratório. Um banco adicionaria decisões de modelagem, migrations, ORM e infraestrutura que desviariam atenção do comportamento dos agents.

Uma evolução posterior pode introduzir persistência justamente como um exercício de mudança arquitetural.

## Fronteiras

### Frontend

Sabe como exibir e manipular dados, mas não é a autoridade das regras do domínio.

### Backend

É a autoridade do contrato HTTP, validação e regras da Todo List.

### Testes

Validam contratos e fluxos observáveis de forma independente.

## Fluxo recomendado para uma feature full stack

Exemplo: adicionar `priority`.

```text
Pedido do usuário
       │
       ▼
Orquestração / decomposição
       │
       ├──► Backend define contrato e validação
       │          │
       │          ▼
       │      Handoff do contrato
       │          │
       ├──────────► Frontend consome e apresenta
       │
       └──────────► Tests validam API + jornada E2E
```

O objetivo do laboratório é tornar esse fluxo observável.
