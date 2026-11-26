import { env } from '../config/env';
import { MongoConnection } from './mongo-connection';

async function main(): Promise<void> {
  const connection = new MongoConnection(env.mongoUri, env.mongoDb);

  try {
    const db = await connection.connect();
    await db.command({ ping: 1 });

    console.log(`Conexão com o MongoDB OK — banco: ${db.databaseName}`);
  } finally {
    await connection.disconnect();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(`Falha ao conectar no MongoDB: ${message}`);
  process.exitCode = 1;
});
