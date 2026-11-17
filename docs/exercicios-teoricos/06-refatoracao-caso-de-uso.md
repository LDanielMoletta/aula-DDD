# Pergunta 6 — Refatorando um caso de uso

## Pergunta

Um colega escreveu este caso de uso: aponte quais princípios vistos no módulo ele viola e reescreva o código separando corretamente as responsabilidades entre entidade, caso de uso e controller.

```ts
// cancel-order.ts
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

export class CancelOrderUseCase {
  async execute(req: Request, res: Response) {
    const client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db('lionsshop');

    const order = await db.collection('orders').findOne({ _id: req.params.id });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    if (order.status === 'SHIPPED') {
      return res.status(400).json({ error: 'Pedido já enviado' });
    }

    await db.collection('orders').updateOne(
      { _id: req.params.id },
      { $set: { status: 'CANCELED' } }
    );

    return res.json({ ...order, status: 'CANCELED' });
  }
}
```

## Resposta

O código apresentado mistura várias responsabilidades em uma única classe. Os principais problemas são:

- O caso de uso cria diretamente o repositório com `new`, dificultando a troca de dependências.
- A comunicação com o MongoDB está misturada com a lógica do sistema.
- O código HTTP (`Request` e `Response`) está dentro do caso de uso.
- A regra de cancelamento deveria ficar dentro da entidade `Pedido`.

### 1. Entidade (`domain/order.ts`)

Responsável por controlar as regras do pedido.

```ts
export class Order {
  constructor(
    public id: string,
    private status: string
  ) {}

  cancel(): void {
    if (this.status === 'SHIPPED') {
      throw new Error('Pedido já enviado');
    }

    this.status = 'CANCELED';
  }

  getStatus(): string {
    return this.status;
  }
}
```

### 2. Caso de uso (`application/cancel-order.ts`)

Responsável por buscar o pedido, solicitar o cancelamento e salvar a alteração.

```ts
export class CancelOrderUseCase {
  constructor(private readonly repo: OrderRepository) {}

  async execute(id: string) {
    const order = await this.repo.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    order.cancel();

    await this.repo.save(order);

    return order;
  }
}
```

### 3. Controller (`infra/http/order-controller.ts`)

Responsável por receber a requisição e devolver a resposta.

```ts
import { Request, Response } from 'express';

export class OrderController {
  constructor(private readonly cancelOrder: CancelOrderUseCase) {}

  cancel = async (req: Request, res: Response) => {
    try {
      const order = await this.cancelOrder.execute(req.params.id);

      return res.json(order);
    } catch (error) {
      return res.status(400).json({
        error: (error as Error).message,
      });
    }
  };
}
```

## Conclusão

Com essa organização, cada parte do código tem sua própria responsabilidade. A entidade cuida das regras do pedido, o caso de uso executa o processo de cancelamento e o controller recebe as requisições HTTP. Dessa forma, o código fica mais organizado e fácil de testar e manter.
