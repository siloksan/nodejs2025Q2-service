# Home Library Service

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Git** - [Download & Install Git](https://git-scm.com/downloads).
- **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) (includes npm, the Node.js package manager).
- **Docker** (Optional) - [Download & Install Docker](https://www.docker.com/products/docker-desktop).

## Downloading the Repository

Clone the repository to your local machine:

```
git clone git@github.com:siloksan/nodejs2025Q2-service.git
```

## Checkout on the task branch

```
git checkout <task-name>
```

## Installing Dependencies

Install all necessary npm modules:

```bash
npm install
```

## Running the Application

Start the application with:

```bash
npm start
```

By default, the application will start on port **4000**. Once started, you can access the OpenAPI documentation in your browser by navigating to:

```
http://localhost:4000/doc/
```

For more information about OpenAPI/Swagger, visit [Swagger's official site](https://swagger.io/).

## Running in Development Mode

To start the application in watch mode:

```bash
npm run start:dev
```

To start the application in debug mode:

```bash
npm run start:debug
```

To start the application in production mode:

```bash
npm run start:prod
```

## Testing

To run tests, ensure the application is running, open a new terminal, and execute:

- **Run all tests without authorization:**

  ```bash
  npm run test
  ```

- **Run specific test suite without authorization:**

  ```bash
  npm run test -- <path-to-suite>
  ```

- **Run all tests with authorization:**

  ```bash
  npm run test:auth
  ```

- **Run a specific test suite with authorization:**

  ```bash
  npm run test:auth -- <path-to-suite>
  ```

- **Run tests in watch mode:**

  ```bash
  npm run test:watch
  ```

- **Run tests with coverage report:**
  ```bash
  npm run test:cov
  ```

## Debugging in VSCode

To debug the application in Visual Studio Code:

1. Press <kbd>F5</kbd> to start debugging.
2. Ensure you have a proper `launch.json` configuration for Node.js in your `.vscode` folder.

For more details, visit: [VSCode Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging).

## Formatting and Linting

- **Lint and fix issues:**

  ```bash
  npm run lint
  ```

- **Format code:**
  ```bash
  npm run format
  ```

## Docker

You can run the application using Docker for easier setup and environment consistency.

- **Start Docker containers in watch mode:**

  ```bash
  npm run docker:watch
  ```

- **Rebuild Docker containers:**

  ```bash
  npm run docker:rebuild
  ```

- **Stop Docker containers:**

  ```bash
  npm run docker:down
  ```

- **Scan Docker containers for vulnerabilities (requires Docker Scout):**
  ```bash
  npm run docker:scan
  ```

## Prisma

The application uses Prisma as an ORM. To apply the schema to the database:

```bash
npm run migrate
```

## Swagger/OpenAPI Documentation

API documentation is available at:

```
http://localhost:4000/doc/
```

Ensure the application is running before accessing this link.

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
