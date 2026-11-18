export class Email {
  private static readonly PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly address: string) {}

  static create(value: string): Email {
    const normalized = value.trim().toLowerCase();

    if (!Email.PATTERN.test(normalized)) {
      throw new Error('E-mail inválido');
    }

    return new Email(normalized);
  }

  get value(): string {
    return this.address;
  }

  equals(other: Email): boolean {
    return this.address === other.address;
  }

  toString(): string {
    return this.address;
  }
}
