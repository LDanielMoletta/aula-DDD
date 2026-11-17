# LionsShop

API de pedidos da Lions Tech, estruturada com **DDD (Domain-Driven Design)** em Node.js + TypeScript.

## Estrutura

```text
src/
└── modules/
    └── orders/
        └── domain/
            └── entities/
                ├── order.ts
                ├── order-item.ts
                └── order.spec.ts
```

A estrutura segue a organização por contexto de negócio:

- `domain/` — entidades, objetos de valor, interfaces de repositório e serviços de domínio.
- `application/` — casos de uso.
- `infra/` — banco de dados, HTTP e integrações externas.
- `shared/` — código genérico usado por vários módulos.

## Documentação dos exercícios

### Teóricos

- [Pergunta 1 — Entidade vs. Objeto de Valor](docs/exercicios-teoricos/01-entidade-vs-objeto-de-valor.md)
- [Pergunta 2 — Domínio sem dependências de infraestrutura](docs/exercicios-teoricos/02-dominio-sem-dependencias.md)
- [Pergunta 3 — Interface de repositório no domínio](docs/exercicios-teoricos/03-repositorio-interface-vs-implementacao.md)
- [Pergunta 4 — Injeção de dependências e testes](docs/exercicios-teoricos/04-injecao-de-dependencias-e-testes.md)
- [Pergunta 5 — Organização de projetos com DDD](docs/exercicios-teoricos/05-organizacao-em-modulos.md)
- [Pergunta 6 — Refatorando um caso de uso](docs/exercicios-teoricos/06-refatoracao-caso-de-uso.md)

### Práticos

- [Exercício 1 — Mapeando a linguagem ubíqua](docs/exercicios-praticos/01-linguagem-ubiqua.md)
- [Exercício 2 — Primeira entidade](docs/exercicios-praticos/02-primeira-entidade.md)
- [Exercício 3 — Protegendo regras na entidade](docs/exercicios-praticos/03-protegendo-regras-na-entidade.md)

## Scripts

```bash
npm install       # instala as dependências
npm run typecheck # verifica os tipos
npm test          # executa os testes
npm run test:coverage
npm run build
```

## Exercícios práticos concluídos

- [x] **Exercício 1** — Glossário da linguagem ubíqua.
- [x] **Exercício 2** — Entidade `Order` com validação de pedido sem itens.
- [x] **Exercício 3** — Status privado, `cancel()` e `getStatus()`.
