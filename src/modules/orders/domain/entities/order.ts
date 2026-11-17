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
