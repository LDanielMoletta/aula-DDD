# Exercício 3 — Protegendo regras na entidade

## Objetivo

Adicionar à entidade `Order`:

- atributo privado `status`, iniciando em `PENDING`;
- método `cancel()`, que lança erro se o pedido já estiver `SHIPPED`;
- leitura do status apenas por `getStatus()`, sem setter público.

## Implementação

Arquivo: `src/modules/orders/domain/entities/order.ts`

```ts
import { OrderItem } from './order-item';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELED';

export class Order {
  private status: OrderStatus = 'PENDING';

  constructor(
    readonly id: string,
    readonly customerId: string,
    private readonly items: OrderItem[],
  ) {
    if (items.length === 0) {
      throw new Error('Pedido precisa de itens');
    }
  }

  cancel(): void {
    if (this.status === 'SHIPPED') {
      throw new Error('Pedido já enviado');
    }

    this.status = 'CANCELED';
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getItems(): readonly OrderItem[] {
    return this.items;
  }
}
```

## Explicação

- **`private status`:** o estado do pedido só pode ser alterado pela própria entidade.
- **`PENDING` como valor inicial:** todo pedido novo começa pendente.
- **`cancel()`:** concentra a regra "pedido enviado não pode ser cancelado". Quem chama o método não precisa conhecer essa regra.
- **`getStatus()`:** permite ler o status sem expor um setter. Não existe `setStatus()`.
- **`getItems()`:** devolve a lista como `readonly`, evitando alterações externas.
- **Ciclo de vida protegido:** criado (`PENDING`) → pago (`PAID`) → enviado (`SHIPPED`) → cancelado (`CANCELED`, apenas antes do envio).

## Testes

Arquivo: `src/modules/orders/domain/entities/order.spec.ts`

| Teste | O que valida |
| --- | --- |
| `deve criar um pedido com status PENDING` | Estado inicial correto. |
| `deve lançar erro ao criar pedido sem itens` | Invariante do Exercício 2. |
| `deve cancelar um pedido que ainda não foi enviado` | Transição `PENDING` → `CANCELED`. |
| `não deve cancelar um pedido já enviado` | Regra de proteção contra cancelamento após envio. |

Trecho principal dos testes:

```ts
it('deve cancelar um pedido que ainda não foi enviado', () => {
  const order = new Order('order-1', 'customer-1', [makeItem()]);

  order.cancel();

  expect(order.getStatus()).toBe('CANCELED');
});

it('não deve cancelar um pedido já enviado', () => {
  const order = new Order('order-1', 'customer-1', [makeItem()]);

  // Simula o pedido já enviado (a transição para SHIPPED será criada em outro exercício).
  (order as unknown as { status: string }).status = 'SHIPPED';

  expect(() => order.cancel()).toThrow('Pedido já enviado');
});
```

## Como executar

```bash
npm run typecheck
npm test
```

## Resultado

```text
PASS src/modules/orders/domain/entities/order.spec.ts
  Order
    √ deve criar um pedido com status PENDING
    √ deve lançar erro ao criar pedido sem itens
    √ deve cancelar um pedido que ainda não foi enviado
    √ não deve cancelar um pedido já enviado

Tests: 4 passed, 4 total
```
