import { Db, MongoClient } from 'mongodb';

export class MongoConnection {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(
    private readonly uri: string,
    private readonly databaseName: string,
  ) {}

  async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    this.client = new MongoClient(this.uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db(this.databaseName);

    return this.db;
  }

  async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.close();
    this.client = null;
    this.db = null;
  }
}
