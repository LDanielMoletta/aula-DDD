import { Money } from '../value-objects/money';
import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('deve calcular o subtotal do item', () => {
    const item = new OrderItem('product-1', Money.fromReais(50), 2);

    expect(item.subtotal().value).toBe(100);
    expect(item.subtotal().cents).toBe(10000);
  });

  it('deve rejeitar quantidade menor ou igual a zero', () => {
    expect(() => new OrderItem('product-1', Money.fromReais(50), 0)).toThrow(
      'A quantidade do item deve ser maior que zero',
    );
  });

  it('deve rejeitar preço unitário negativo', () => {
    expect(() => new OrderItem('product-1', Money.fromReais(-1), 1)).toThrow(
      'O preço unitário não pode ser negativo',
    );
  });
});
