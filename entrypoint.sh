#!/bin/sh

echo "Postgres is ready!"

echo "Running migrations..."
npx prisma migrate dev

echo "Starting the app..."
npm run start:debug
