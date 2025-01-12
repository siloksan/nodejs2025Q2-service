# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Docker

In order to run docker container in watch mode run the following command:

```
npm docker:watch
```

Docker container could be rebuilt this command:

```
npm docker:rebuilt
```

## Prisma

In order to apply new schema with database use command:

```
npx prisma migrate dev,
```

## Swagger

Documentation for app available on link http://localhost:4000/docs/.
Convince that you run app previously.

## Testing

After application running open new terminal and enter:

```
npm run test
```

To run all tests without authorization

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Scan Docker containers

You can also run a report on scanning Docker images for vulnerabilities using the docker scout tool.

```aiignore
npm docker:scan
<!-- ------------------------------------------------------------------ -->

### Prisma migration

**_For migration prisma usage entrypoint.sh script._**

#### Description:

This script is used to wait for a PostgreSQL database to become available, run migrations, and then start the application. The script is typically used as an entry point for a Docker container running a Node.js application.

#### Steps performed by the script:

Wait for PostgreSQL to be ready:

The script waits until the PostgreSQL database, identified by the environment variables POSTGRES_DB (host) and POSTGRES_PORT (port), is ready to accept connections.
The script uses the nc (Netcat) command with the -z option to check the availability of the specified port on the host.

#### Run database migrations:

Once the database is ready, it runs the migration process using npm run migrate dev. This ensures that the database schema is up-to-date before starting the application.

#### Start the application:

After migrations are completed successfully, the script starts the Node.js application using npm run start:dev.
<!-- ------------------------------------------------------------------ -->
```
