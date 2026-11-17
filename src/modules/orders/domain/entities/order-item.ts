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
