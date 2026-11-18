# Exercício 5 — Objeto de valor: Money

## Objetivo

Criar a classe `Money`:

- guardando o valor em **centavos** (número inteiro);
- com `add()`, `multiply()` e `percent()` retornando **sempre uma nova instância**;
- demonstrando por que `0.1 + 0.2` com ponto flutuante é um problema.

## Implementação

Arquivo: `src/modules/orders/domain/value-objects/money.ts`

```ts
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
```

## Por que guardar dinheiro em centavos?

Em JavaScript, números decimais usam ponto flutuante binário e nem todo valor é representado com exatidão:

```js
0.1 + 0.2; // 0.30000000000000004
0.1 + 0.2 === 0.3; // false
```

Se o sistema somasse preços diretamente como decimais, pequenos erros poderiam se acumular e gerar totais incorretos.

Com `Money`, os valores são inteiros:

```ts
const a = Money.fromReais(0.1); // 10 centavos
const b = Money.fromReais(0.2); // 20 centavos
const total = a.add(b);         // 30 centavos

total.cents; // 30
total.value; // 0.3
```

A conversão para reais acontece apenas na leitura/exibição, nunca no meio dos cálculos.

## Imutabilidade

`add()`, `multiply()` e `percent()` não alteram a instância original: sempre devolvem um novo `Money`.

```ts
const original = Money.fromReais(10);
const dobrado = original.multiply(2);

original.value; // 10 (continua igual)
dobrado.value;  // 20
original === dobrado; // false
```

## Arredondamento

Multiplicações e percentuais podem gerar frações de centavo. Por isso o resultado é arredondado com `Math.round`, mantendo o valor interno sempre inteiro:

```ts
Money.fromReais(100).percent(5); // 500 centavos = R$ 5,00
```

## Testes

Arquivo: `src/modules/orders/domain/value-objects/money.spec.ts`

| Teste | O que valida |
| --- | --- |
| `deve guardar o valor em centavos` | Conversão de reais para centavos. |
| `deve somar valores sem o erro do ponto flutuante` | `0.1 + 0.2` resulta exatamente em `0.3`. |
| `deve demonstrar o problema de 0.1 + 0.2 com ponto flutuante` | Comportamento nativo do JavaScript. |
| `deve multiplicar retornando uma nova instância` | Imutabilidade. |
| `deve calcular percentual` | `5%` de `R$ 100,00`. |
| `deve comparar valores pelo conteúdo` | `equals`. |
| `deve criar o valor zero` | `Money.zero()`. |
| `deve rejeitar centavos fracionados` | O valor interno precisa ser inteiro. |

## Como executar

```bash
npm run typecheck
npm test
```
