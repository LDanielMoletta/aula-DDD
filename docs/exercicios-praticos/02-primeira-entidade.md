# Exercício 2 — Primeira entidade

## Objetivo

Criar a classe `Order` em `src/modules/orders/domain/entities/order.ts` com `id`, `customerId` e `items`, lançando um erro no construtor se o pedido for criado sem itens.

## O que foi implementado

Arquivos criados:

- `src/modules/orders/domain/entities/order.ts`
- `src/modules/orders/domain/entities/order-item.ts`

### `OrderItem`

O item do pedido guarda o produto, o preço unitário e a quantidade. Ele também valida os próprios dados e calcula o subtotal.

```ts
export class OrderItem {
  constructor(
    readonly productId: string,
    readonly unitPrice: number,
    readonly quantity: number,
  ) {
    if (quantity <= 0) {
      throw new Error('A quantidade do item deve ser maior que zero');
    }

    if (unitPrice < 0) {
      throw new Error('O preço unitário não pode ser negativo');
    }
  }

  subtotal(): number {
    return this.unitPrice * this.quantity;
  }
}
```

### `Order`

A entidade é criada com identidade (`id`), o cliente (`customerId`) e os itens. Se a lista estiver vazia, o construtor lança erro.

```ts
import { OrderItem } from './order-item';

export class Order {
  constructor(
    readonly id: string,
    readonly customerId: string,
    private readonly items: OrderItem[],
  ) {
    if (items.length === 0) {
      throw new Error('Pedido precisa de itens');
    }
  }
}
```

> No Exercício 3 esta classe ganha o `status` e o método `cancel()`. A versão final está em [`03-protegendo-regras-na-entidade.md`](./03-protegendo-regras-na-entidade.md).

## Explicação

- **Identidade:** `id` é o que diferencia dois pedidos, mesmo que eles tenham os mesmos itens.
- **Agregado:** `items` pertence ao pedido; a lista é privada para que ninguém altere os itens por fora.
- **Invariante:** "todo pedido precisa ter pelo menos um item" é uma regra de negócio, por isso fica no construtor da entidade.
- **Validação centralizada:** qualquer caminho que crie um `Order` (controller, caso de uso ou teste) passa pela mesma regra.
- **Falha cedo:** o pedido inválido nunca chega a existir no sistema.

## Como verificar

```bash
npm run typecheck
npm test
```

O teste `deve lançar erro ao criar pedido sem itens` cobre essa regra.

## Resultado

- `Order` criada com `id`, `customerId` e `items`.
- Erro `Pedido precisa de itens` ao tentar criar sem itens.
- Teste correspondente passando.
