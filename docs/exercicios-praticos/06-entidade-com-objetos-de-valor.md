# Exercício 6 — Entidade com objetos de valor

## Objetivo

- Criar `OrderItem` com `productId`, `unitPrice: Money` e `quantity`, além do método `subtotal()`.
- Adicionar `total()` na entidade `Order`, somando os subtotais dos itens.

## Implementação

### `OrderItem`

Arquivo: `src/modules/orders/domain/entities/order-item.ts`

```ts
import { Money } from '../value-objects/money';

export class OrderItem {
  constructor(
    readonly productId: string,
    readonly unitPrice: Money,
    readonly quantity: number,
  ) {
    if (quantity <= 0) {
      throw new Error('A quantidade do item deve ser maior que zero');
    }

    if (unitPrice.value < 0) {
      throw new Error('O preço unitário não pode ser negativo');
    }
  }

  subtotal(): Money {
    return this.unitPrice.multiply(this.quantity);
  }
}
```

### `Order.total()`

Arquivo: `src/modules/orders/domain/entities/order.ts`

```ts
import { Money } from '../value-objects/money';
import { OrderItem } from './order-item';

export class Order {
  // ...construtor, cancel() e getStatus()

  total(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      Money.zero(),
    );
  }
}
```

## Explicação

- **`unitPrice: Money`:** o item não trabalha mais com `number` solto. Todo cálculo monetário passa pelo objeto de valor.
- **`subtotal()`:** multiplica o preço unitário pela quantidade e devolve um novo `Money`.
- **`total()`:** percorre os itens somando os subtotais, começando de `Money.zero()`.
- **Agregado:** o `Order` é quem calcula o total; ninguém precisa replicar essa soma em controllers ou casos de uso.
- **Imutabilidade:** cada `add()` e `multiply()` cria uma nova instância de `Money`, sem alterar os valores anteriores.

Exemplo:

```ts
const order = new Order('order-1', 'customer-1', [
  new OrderItem('product-1', Money.fromReais(50), 2), // R$ 100,00
  new OrderItem('product-2', Money.fromReais(30), 1), // R$ 30,00
]);

order.total().value; // 130
order.total().cents; // 13000
```

## Testes

Arquivos:

- `src/modules/orders/domain/entities/order-item.spec.ts`
- `src/modules/orders/domain/entities/order.spec.ts`

| Teste | O que valida |
| --- | --- |
| `deve calcular o subtotal do item` | `unitPrice × quantity`. |
| `deve rejeitar quantidade menor ou igual a zero` | Validação do item. |
| `deve rejeitar preço unitário negativo` | Validação do item. |
| `deve calcular o total somando os subtotais dos itens` | Soma de múltiplos itens no pedido. |

## Como executar

```bash
npm run typecheck
npm test
```
