#!/bin/sh

echo "Postgres is ready!"

echo 'Prisma generating...'
npx prisma generate

echo "Running migrations..."
npx prisma migrate dev

echo "Starting the app..."
npm run start:prod
