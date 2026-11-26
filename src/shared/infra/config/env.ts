import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  }

  if (value.includes('<') || value.includes('>')) {
    throw new Error(
      `A variável ${name} ainda contém placeholders. Preencha o arquivo .env.`,
    );
  }

  return value;
}

export const env = {
  get mongoUri(): string {
    return required('MONGODB_URI');
  },
  get mongoDb(): string {
    return process.env.MONGODB_DB ?? 'lionsshop';
  },
  get dnsServers(): string[] {
    return (process.env.DNS_SERVERS ?? '')
      .split(',')
      .map((server) => server.trim())
      .filter((server) => server.length > 0);
  },
  get port(): number {
    return Number(process.env.PORT ?? 3000);
  },
};
