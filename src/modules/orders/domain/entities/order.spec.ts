import { Money } from '../value-objects/money';
import { Order } from './order';
import { OrderItem } from './order-item';

function makeItem(): OrderItem {
  return new OrderItem('product-1', Money.fromReais(50), 2);
}

describe('Order', () => {
  it('deve criar um pedido com status PENDING', () => {
    const order = new Order('order-1', 'customer-1', [makeItem()]);

    expect(order.getStatus()).toBe('PENDING');
  });

  it('deve lançar erro ao criar pedido sem itens', () => {
    expect(() => new Order('order-1', 'customer-1', [])).toThrow(
      'Pedido precisa de itens',
    );
  });

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

  it('deve calcular o total somando os subtotais dos itens', () => {
    const order = new Order('order-1', 'customer-1', [
      new OrderItem('product-1', Money.fromReais(50), 2),
      new OrderItem('product-2', Money.fromReais(30), 1),
    ]);

    expect(order.total().value).toBe(130);
  });
});
