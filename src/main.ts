import { configureDns } from './shared/infra/config/dns';
import { env } from './shared/infra/config/env';
import { MongoConnection } from './shared/infra/database/mongo-connection';

configureDns();

async function bootstrap(): Promise<void> {
  const connection = new MongoConnection(env.mongoUri, env.mongoDb);
  const db = await connection.connect();

  console.log(`MongoDB conectado — banco: ${db.databaseName}`);
  console.log(
    'Aplicação pronta para receber os próximos módulos (HTTP e casos de uso).',
  );

  const shutdown = async (): Promise<void> => {
    await connection.disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(`Falha ao iniciar a aplicação: ${message}`);
  process.exit(1);
});
