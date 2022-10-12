
# Node Core

Node Core is a NodeJS framework built by cutting edge designs and techniques like clean architecture, domain driven design (DDD), singleton pattern, table inheritance, and more..., it's easy to maintain and expand the system, including the transition from monolithic to microservices. Besides, to increase the performance and stability of the project, the framework is also supported by powerful tools such as Redis, Typescript, Eslint, Grunt, TypeORM,...
Implementing advanced architectures like clean architecture and domain driven design will affect project development time, generator module is a great tool to overcome this problem, it even helps the team reduce development time more than conventional frameworks.

## Features

* Support both RESTful API and WebSocket.
* Support caching from Redis.
* Support database connection and database migration via TypeORM.
* Support unit test and coverage.
* Support auto-generating API documentation and expose to Swagger UI.
* Support docker container.
## Modules Integrated

* User: Register, active account, get profile, update profile,...
* User role: Super Admin, Manager, Client.
* Authorization: Login, forgot password, reset password, change password,...

## Service Integrated

* JSON Web Token (JWT).
* Mail Service: MailConsole (console log), Google SMTP, MailGun, SendInBlue.
* Payment Service: Paypal, Stripe.
* Socket Emitter.
* Storage Service: StorageConsole (console log), MinIO, AwsS3, GoogleStorage.

## Architecture & Design Patterns

- Clean architecture
- Domain driven design (DDD)
- CQRS pattern
- Repository pattern
- Transfer object pattern
- Data mapper pattern
- Singleton pattern
- Factory pattern

## Technologies and Tools

- NodeJS
- Typescript
- ExpressJS
- TypeORM
- PostgreSQL (or another database that suppored by TypeORM)
- Redis
- Socket.io
- Routing controllers
- Open API 3
- ESLint
- Mocha
- Nyc
- Grunt
- Docker
- Visual Code

## Required

- NodeJS version >= `14.17.x`, current version: NodeJS `v14.17.5` and NPM `v6.14.14` (We can install global `n` package to switch NodeJS versions easier).
- Knowledge of Typescript, ES6, TypeORM, PostgreSQL.

## Document Related

- [Typescript](https://github.com/Microsoft/TypeScript#documentation)
- [ES6 - ECMAScript 2015](http://es6-features.org)
- [JavaScript Standard Style](https://standardjs.com/rules.html)
- [TypeORM](https://github.com/typeorm/typeorm) & [Migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#migrations)
- [Routing controllers](https://github.com/typestack/routing-controllers#routing-controllers)
- [Socket IO](https://web.socket/docs/) & [Emit cheatsheet](https://web.socket/docs/emit-cheatsheet/)

## Source Structure

```sh
- |-- .vscode ----------------------------------------// Visual code configuration.
- |-- build -------------------------------------------// Built from the src directory.
- |-- node_modules
- |-- src --------------------------------------------// Source of development.
- |------ configs
- |------------ Configuration.ts ---------------------// Define environment variables from .env file.
- |------------ DbConfig.ts --------------------------// Database configuration.
- |------------ Enums.ts -----------------------------// Enums defination.
- |------------ ORM.ts -----------------------------// Enums defination.
- |------ core
- |------------ domain
- |------------------ entities
- |------------------ enums
- |------------------ interfaces
- |------------ gateways
- |------------------ repositories --------------------// Interface of repositories.
- |------------------ services ------------------------// Interface of services.
- |------------ shared --------------------------------// Common defination.
- |------------ usecases ------------------------------// Business logic.
- |------ infras
- |------------ api
- |------------------ controllers ---------------------// Navigate for requests.
- |------------------ middlewares
- |------------------------ BodyParserMiddleware.ts ---// Body parser.
- |------------------------ ErrorMiddleware.ts --------// Handling of errors.
- |------------------ ApiAuthenticator.ts
- |------------------ ApiDocument.ts ------------------// Initialize Api document.
- |------------------ ApiService.ts -------------------// Initialize Api service.
- |------------ data
- |------------------------ entities ------------------// Define database structure.
- |------------------------ migrations ----------------// Database migrations.
- |------------------------ repositories --------------// Execution operations.
- |------------------------ schemas -------------------// Define database schemas.
 - |------------------------DbContext.ts
 - |------------------------DbRegister.ts                          
- |------------ redis ---------------------------// In-memory database.
- |------------------------ repositories --------------// Execution operations.
- |------------------------ RedisContext.ts
- |------------------------ RedisRegister.ts
- |------------ services
- |------------------ authorization -------------------// Authentication service.
- |------------------ Crypto -----------------------------// Crypto service.
- |------------------ mail ----------------------------// Mail service.

- |------------------ ServiceRegister.ts
- |------------ SingletonRegister.ts ------------------// Define singleton and need to load first.
- |------------ socket
- |------------------ channels ------------------------// Initialize socket connection & event handling.
- |------------------ SocketService.ts ----------------// Initialize socket service
- |------ utils
- |------ index.ts --------------------------------------// Main application.
- |-- .dockerignore -----------------------------------// Docker ignore configuration.
- |-- .env --------------------------------------------// Configuration cloned from `.env.sample` and we need to add to `.gitignore`.
- |-- .gitignore --------------------------------------// Git ignore configuration.
- |-- docker-compose.yml ------------------------------// Docker configuration.
- |-- Dockerfile --------------------------------------// Used by `docker-compose.yml`.
- |-- nodemon.json
- |-- package-lock.json -------------------------------// Lock package version and should not add to `.gitignore`.
- |-- package.json
- |-- README.md ---------------------------------------// `IMPORTANT` to start the project.
- |-- tsconfig.json -----------------------------------// Typescript configuration.
```

## NPM Commands

npm run cache:clear ---------------------------// Clear cache of TypeORM.
npm run migration:generate {Migration_Name} ---// Generate migration for updating database structure.
npm run migration:up --------------------------// Run the next migrations for updating database structure.
npm run migration:down ------------------------// Revert migration for updating database structure.
npm run build ---------------------------------// Build source before start with production environment.
npm run dev -----------------------------------// Start with local environment (NODE_ENV into .env file).
npm start -------------------------------------// Start with production environment (NODE_ENV into .env file), 


```

## Deploy to server

- We must modify environment variables into `.env` on server and run the commands below:
```
- npm install
- npm run build
- npm test
- npm run migration:up
- npm start
```


## Configuration

- `.env` file is main configuration created by `.env.sample`.
- `.dockerignore` is Docker ignore configuration.
- `docker-compose.yml` is Docker configuration.
- `Dockerfile` is Docker script for build image.
- `.gitignore` is Git ignore configuration.
- `tsconfig.json` is Typescript configuration.

## Database Migration

- Database Migrations, a technique to help us keep our database changes under control. Database migration is the process of transforming data between various states without any human interaction. This process will allow us to track changes between schema updates.



- API controllers order should be arranged in turn according to GET, POST, PUT, PATCH, DELETE.
- The function order should be arranged in turn according to find, get, check, create, update, delete, remove.
- The query param (url-path?param1=&param2=) will be a string value, if you want to get another type (boolean, number,...), you need to parse them with decorator like `@IsBoolean()` into QueryInput object.
- If we use the table inheritance then we shouldn't use the enum type for parent table in database schema, with the logic code is still good.
- Refer the joining relations document to have the best practice: https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#joining-relations
- With TypeORM version < 0.3.0, there is a bug `Cannot read property 'databaseName' of undefined` when we use `join` + `orderBy` together, please follow this issue in [here](https://github.com/typeorm/typeorm/issues/4270). Temporary [solution](https://github.com/typeorm/typeorm/issues/747#issuecomment-519553920)
