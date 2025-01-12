#!/bin/sh

# This script is helpful when deploying applications in a containerized environment,
# ensuring that the application doesn't attempt to start before the database is available
# and the migrations have been executed.

echo "Waiting for Postgres..."
until nc -z -v -w30 "$POSTGRES_HOST" "$POSTGRES_PORT";
  do
  echo "Waiting for database connection on port $POSTGRES_PORT..."
  sleep 1
done

echo "Postgres is ready!"

echo "Running migrations..."
npx prisma migrate dev

echo "Starting the app..."
npm run start:dev
