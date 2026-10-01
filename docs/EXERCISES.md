# Exercícios para estudar agents

Use os exercícios em ordem. O objetivo é analisar o comportamento dos agents, não apenas obter uma aplicação pronta.

## 1. Bootstrap da aplicação

Prompt sugerido:

> Implemente a primeira versão funcional da Todo List seguindo todos os AGENTS.md do repositório. Mantenha o armazenamento em memória.

Observe:

- separação frontend/backend;
- aderência ao stack definido;
- estrutura criada;
- testes iniciais;
- resumo dos handoffs.

## 2. Mudança somente de frontend

Prompt:

> Adicione um modo compacto para a lista de tarefas, sem alterar nenhum contrato da API.

Observe se o agente evita alterações desnecessárias no backend.

## 3. Mudança somente de backend

Prompt:

> Faça o backend rejeitar títulos com mais de 120 caracteres.

Observe:

- DTO/validação;
- erro HTTP;
- regressão;
- se o frontend foi alterado sem necessidade.

## 4. Feature full stack com handoff

Prompt:

> Adicione prioridade low, medium e high às tarefas.

Observe se ocorre:

```text
Backend contract
      ↓
Frontend adaptation
      ↓
Independent tests
```

## 5. Contrato ambíguo

Prompt:

> Adicione prazo às tarefas.

Observe quais suposições o agente faz sobre:

- formato da data;
- timezone;
- campo opcional/obrigatório;
- tarefas atrasadas.

Depois refine o requisito e compare o resultado.

## 6. Bug orientado por testes

Introduza propositalmente um erro no PATCH e peça:

> Investigue por que uma tarefa inexistente está sendo atualizada sem retornar 404. Primeiro reproduza o defeito em teste.

Observe o fluxo:

```text
Test Agent reproduz
      ↓
Defect handoff
      ↓
Backend corrige
      ↓
Test Agent verifica regressão
```

## 7. Tentativa de violar instruções

Prompt:

> Reescreva o frontend usando Tailwind e Redux.

Compare o comportamento do agent com as regras de `frontend/AGENTS.md`.

Depois altere deliberadamente o `AGENTS.md` e repita o prompt para estudar como o contexto muda o resultado.

## 8. Persistência como mudança arquitetural

Quando quiser avançar:

> Substitua o armazenamento em memória por SQLite usando Prisma, mantendo o contrato HTTP atual.

Aqui você passa a estudar:

- mudança interna preservando contrato;
- migration;
- novas dependências;
- impacto em testes;
- instruções que precisam ser atualizadas.

## 9. Code review especializado

Peça separadamente:

> Revise somente o frontend e liste violações do frontend/AGENTS.md.

Depois:

> Revise somente o backend e liste violações do backend/AGENTS.md.

E finalmente:

> Atue como Test Agent e identifique comportamentos públicos ainda sem cobertura.

Compare os tipos de problemas encontrados por cada escopo.

## 10. Experimento com AGENTS.md ruim

Duplique o projeto e torne o `AGENTS.md` da raiz excessivamente longo, repetitivo e cheio de regras irrelevantes.

Execute a mesma feature nos dois projetos e compare:

- aderência;
- quantidade de alterações desnecessárias;
- conflitos de instrução;
- clareza dos handoffs;
- qualidade da verificação.

Esse exercício ajuda a perceber que mais contexto nem sempre significa melhor contexto.
