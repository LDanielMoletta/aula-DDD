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
