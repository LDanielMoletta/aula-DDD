import { Money } from './money';

describe('Money', () => {
  it('deve guardar o valor em centavos', () => {
    const money = Money.fromReais(10.5);

    expect(money.cents).toBe(1050);
    expect(money.value).toBe(10.5);
  });

  it('deve somar valores sem o erro do ponto flutuante', () => {
    const result = Money.fromReais(0.1).add(Money.fromReais(0.2));

    expect(result.cents).toBe(30);
    expect(result.value).toBe(0.3);
  });

  it('deve demonstrar o problema de 0.1 + 0.2 com ponto flutuante', () => {
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(0.1 + 0.2).toBe(0.30000000000000004);
  });

  it('deve multiplicar retornando uma nova instância', () => {
    const money = Money.fromReais(10);
    const doubled = money.multiply(2);

    expect(doubled.value).toBe(20);
    expect(money.value).toBe(10);
    expect(doubled).not.toBe(money);
  });

  it('deve calcular percentual', () => {
    expect(Money.fromReais(100).percent(5).value).toBe(5);
    expect(Money.fromReais(100).percent(5).cents).toBe(500);
  });

  it('deve comparar valores pelo conteúdo', () => {
    expect(Money.fromReais(10).equals(Money.fromCents(1000))).toBe(true);
    expect(Money.fromReais(10).equals(Money.fromReais(11))).toBe(false);
  });

  it('deve criar o valor zero', () => {
    expect(Money.zero().value).toBe(0);
    expect(Money.zero().cents).toBe(0);
  });

  it('deve rejeitar centavos fracionados', () => {
    expect(() => Money.fromCents(10.5)).toThrow(
      'O valor em centavos deve ser um número inteiro',
    );
  });
});
