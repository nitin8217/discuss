#!/bin/bash
# Railway database initialization script

# Generate Prisma client
npx prisma generate

# Push the database schema (creates tables)
npx prisma db push

# Start the application
npm start
