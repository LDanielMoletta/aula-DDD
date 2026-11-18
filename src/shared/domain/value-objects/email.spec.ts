import { Email } from './email';

describe('Email', () => {
  it('deve criar e normalizar o e-mail para minúsculas', () => {
    const email = Email.create('  Daniel@LionsTech.COM ');

    expect(email.value).toBe('daniel@lionstech.com');
  });

  it('deve rejeitar e-mail inválido', () => {
    expect(() => Email.create('invalido')).toThrow('E-mail inválido');
    expect(() => Email.create('a@b')).toThrow('E-mail inválido');
    expect(() => Email.create('a b@c.com')).toThrow('E-mail inválido');
  });

  it('deve comparar e-mails pelo valor', () => {
    const first = Email.create('daniel@lionstech.com');
    const second = Email.create('DANIEL@LIONSTECH.COM');
    const third = Email.create('outro@lionstech.com');

    expect(first.equals(second)).toBe(true);
    expect(first.equals(third)).toBe(false);
  });
});
