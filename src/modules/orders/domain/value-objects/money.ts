export class Money {
  private constructor(private readonly amountInCents: number) {
    if (!Number.isInteger(amountInCents)) {
      throw new Error('O valor em centavos deve ser um número inteiro');
    }
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  static fromReais(reais: number): Money {
    if (!Number.isFinite(reais)) {
      throw new Error('O valor em reais deve ser um número finito');
    }

    return new Money(Math.round(reais * 100));
  }

  static zero(): Money {
    return new Money(0);
  }

  get cents(): number {
    return this.amountInCents;
  }

  get value(): number {
    return this.amountInCents / 100;
  }

  add(other: Money): Money {
    return new Money(this.amountInCents + other.amountInCents);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amountInCents * factor));
  }

  percent(percentage: number): Money {
    return new Money(Math.round((this.amountInCents * percentage) / 100));
  }

  equals(other: Money): boolean {
    return this.amountInCents === other.amountInCents;
  }

  toString(): string {
    return (this.amountInCents / 100).toFixed(2);
  }
}
