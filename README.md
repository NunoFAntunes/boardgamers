# Boardgamers Project

A full-stack application for board game enthusiasts.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development without Docker)

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd boardgamers
   ```

2. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your preferred configuration values.

3. Start the development environment:
   ```bash
   docker compose up -d
   ```

This will start:
- PostgreSQL database on port 5432
- Backend service on port 3000
- Frontend service on port 5173

## Accessing the Services

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

## Development Workflow

### Using Docker (Recommended)

1. The services are configured with hot-reload enabled:
   - Frontend changes will automatically reflect in the browser
   - Backend changes will automatically restart the server
   - Database changes require manual migration

2. View logs:
   ```bash
   docker compose logs -f [service-name]
   ```
   Replace [service-name] with 'frontend', 'backend', or 'postgres'

3. Stop the services:
   ```bash
   docker compose down
   ```

### Local Development (Without Docker)

1. Start the database:
   ```bash
   docker compose up postgres -d
   ```

2. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Database Management

The PostgreSQL database is configured with the following default credentials:
- Username: boardgamers
- Password: boardgamers
- Database: boardgamers

You can connect to the database using any PostgreSQL client with these credentials.

## Troubleshooting

1. If services fail to start, check the logs:
   ```bash
   docker compose logs
   ```

2. To reset the database:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

3. If you need to rebuild the containers:
   ```bash
   docker compose build
   docker compose up -d
   ```

## Backend Structure

The backend follows a modular, feature-based organization:

```
├── src
│   ├── reviewer
│   │   ├── reviewer-handlers.js
│   │   ├── reviewer-service.js
│   │   ├── reviewer-queries.js
│   │   ├── reviewer-handlers.test.js
│   │   ├── index.js
│   ├── board-game
│   │   ├── board-game-handlers.js
│   │   ├── board-game-service.js
│   │   ├── board-game-queries.js
│   │   ├── board-game-handlers.test.js
│   │   ├── index.js
```

Each module follows a layered architecture:
- **Handlers**: Handle HTTP requests and responses
- **Services**: Contain business logic and validation
- **Queries**: Interface with the database using Prisma
- **Validation**: Validate incoming request data using express-validator

## Development Guidelines

- Each domain feature has its own directory (user, game, team)
- Each feature contains its own handlers, services, and data access layers
- Tests are co-located with the implementation files

- Index.js files are used to expose the public API of each module
- The application is structured in modules representing parts of the domain
- Implementation is split into layers (handlers, services, queries)
- Validation is done in middleware before handlers
- Business logic is in service layer, not middleware
- Error handling is centralized
- Format: All caps for constants, camel case for functions/variables, Pascal case for classes/models, kebab case for files/folders
- Each module holds all its routes
- Authentication attaches user to res.locals
- Use promises instead of callbacks
- The application should be strucured in modules representing a part of the domain, with all handlers, models, tests, and business logic for a part of the business. Examples of modules are: user, order, catalog, team, player, etc etc.
- The implementation should be split in layers. Handlers should not have too many responsabilities, they should be concise and only handle the HTTP logic/transport.
- The service later should manage the domain and data access logic without knowing whether it's responding to an HTTP request or a message from an event-driven system.
- Concerns of a module should not cross to other modules. Instead, the module that needs another module's function should call that function from the specific module that serves it.
- If data requires transformation, it shouldnt be transformed just before it is sent. It should be transformed as soon as possible. The service should define a domain entity and transform the data from the store to it as soon as possible. For example, a repository might get the item from the database, map it immediatley to a itemEntity and return it. ONLY DO THIS IF DATA TRANSFORMATIONS ARE NEEDED.
- Utils folder outside modules should only contain functions common to most or all modules. It shouldn't contain any logic specific to any module. If that is the case, teh function should be inside said module.
- The REST APIs should use hypertext.
- Request structure should be validated, if possible with a library such as Joi, ajv or express-validator.
- Validation should be done in the middleware, before the handler.
- The business logic should NOT BE IN THE MIDDLEWARE. Instead, it should be delegated to a service call in another module/function.
- Prefer handler functions to controller classes. For example, instead of creating a UserController with register and authenticate, just export simple handler functions instead
- Always use the error object or extend it for errors. Don't throw writen strings with no tracing.
- Create a central error handling service to handle the responsibility of errors.
- 404 responses should be handled in the middleware. You should add a middleware that gets executed after all routes. This way, if it's ever reached without an error being passed to it, then no route was ever executed and you can safely rase a 404 error from there, which will be handled by the central error handler. 
- Set up Eslint and Prettier
- Format things the following way: All caps for constants. Camel case for functions and variables. Pascal case for classes and models. Kebab case for files and folders.
- A module should hold all its routes.
- The user should be always attached to res.locals of authenticated requests
- Always use promises instead of callback-based api's.


