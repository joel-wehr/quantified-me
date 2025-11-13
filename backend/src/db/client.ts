import { Pool, PoolClient, QueryResult } from 'pg';
import fs from 'fs/promises';
import path from 'path';

interface DatabaseConfig {
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  ssl?: boolean;
}

class Database {
  private pool: Pool;
  private static instance: Database;

  private constructor(config?: DatabaseConfig) {
    // Use environment variables or provided config
    this.pool = new Pool({
      host: config?.host || process.env.DB_HOST || 'localhost',
      port: config?.port || parseInt(process.env.DB_PORT || '5432'),
      database: config?.database || process.env.DB_NAME || 'quantified_me',
      user: config?.user || process.env.DB_USER || 'postgres',
      password: config?.password || process.env.DB_PASSWORD,
      ssl: config?.ssl || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Handle pool errors
    this.pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err);
    });
  }

  public static getInstance(config?: DatabaseConfig): Database {
    if (!Database.instance) {
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  /**
   * Execute a query
   */
  async query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
      const result = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: result.rowCount });
      return result;
    } catch (error) {
      console.error('Database query error:', { text, error });
      throw error;
    }
  }

  /**
   * Get a client from the pool for transactions
   */
  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  /**
   * Execute a transaction
   */
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Run database migrations
   */
  async migrate(): Promise<void> {
    console.log('Running database migrations...');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedsPath = path.join(__dirname, 'seeds.sql');

    try {
      // Run schema
      const schema = await fs.readFile(schemaPath, 'utf-8');
      await this.query(schema);
      console.log('✓ Schema created successfully');

      // Run seeds
      const seeds = await fs.readFile(seedsPath, 'utf-8');
      await this.query(seeds);
      console.log('✓ Seed data inserted successfully');

      console.log('Database migration completed!');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  /**
   * Test database connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.query('SELECT NOW()');
      console.log('Database connection successful:', result.rows[0]);
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  /**
   * Close all connections
   */
  async close(): Promise<void> {
    await this.pool.end();
    console.log('Database pool closed');
  }
}

// Export singleton instance
export const db = Database.getInstance();

// Export types
export type { PoolClient, QueryResult };
