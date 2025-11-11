#!/usr/bin/env node

import { db } from './client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'up':
      console.log('🚀 Running database migrations...\n');
      try {
        await db.migrate();
        console.log('\n✓ Migrations completed successfully!');
        process.exit(0);
      } catch (error) {
        console.error('\n✗ Migration failed:', error);
        process.exit(1);
      }
      break;

    case 'test':
      console.log('🔍 Testing database connection...\n');
      try {
        const isConnected = await db.testConnection();
        if (isConnected) {
          console.log('\n✓ Database connection successful!');
          process.exit(0);
        } else {
          console.log('\n✗ Database connection failed!');
          process.exit(1);
        }
      } catch (error) {
        console.error('\n✗ Connection test failed:', error);
        process.exit(1);
      }
      break;

    default:
      console.log(`
Quantified Me - Database Migration Tool

Usage:
  npm run db:migrate <command>

Commands:
  up      Run all pending migrations
  test    Test database connection

Examples:
  npm run db:migrate up
  npm run db:migrate test
`);
      process.exit(0);
  }
}

main();
