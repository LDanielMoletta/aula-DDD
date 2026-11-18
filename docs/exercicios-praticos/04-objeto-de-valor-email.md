# Exercício 4 — Objeto de valor: Email

## Objetivo

Criar a classe `Email` com:

- construtor privado;
- método estático `create(value)`;
- validação de formato;
- normalização para minúsculas;
- erro quando o e-mail for inválido;
- método `equals(other)` comparando pelo valor.

## Implementação

Arquivo: `src/shared/domain/value-objects/email.ts`

```ts
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
```

## Explicação

- **Construtor privado:** impede criar `new Email('qualquer coisa')` sem passar pela validação.
- **`create(value)`:** é o único ponto de criação do objeto de valor. Ele valida e normaliza antes de instanciar.
- **`trim()`:** remove espaços acidentais no início e no fim.
- **`toLowerCase()`:** `Daniel@LionsTech.com` e `daniel@lionstech.com` passam a ser o mesmo e-mail.
- **Validação:** a expressão regular exige algo antes do `@`, um domínio e um ponto com sufixo.
- **`equals(other)`:** compara pelo conteúdo (`address`), não pela referência do objeto.
- **Imutabilidade:** não existe setter; para obter outro e-mail, cria-se uma nova instância.

## Testes

Arquivo: `src/shared/domain/value-objects/email.spec.ts`

| Teste | O que valida |
| --- | --- |
| `deve criar e normalizar o e-mail para minúsculas` | `trim` + `toLowerCase`. |
| `deve rejeitar e-mail inválido` | Formatos sem `@`, sem domínio ou com espaço. |
| `deve comparar e-mails pelo valor` | Dois e-mails iguais são equivalentes. |

## Como executar

```bash
npm run typecheck
npm test
```
