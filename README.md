
## Features
* Support both RESTful API 
* Support database connection and database migration via TypeORM.
* Support auto-generating API documentation and expose to Swagger UI.
## Modules Integrated

* User: Register, active account, get profile, update profile,...
* User role: Super Admin, Manager, Client.
* Authorization: Login, forgot password, reset password, change password,...

## Service Integrated

* JSON Web Token (JWT).
* Mail Service: Node Mailer.
* Payment Service: Paypal, Stripe.

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
- |------------ ORM.ts -----------------------------// connect db defination.
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
- |------------ server
- |------------------ http ------------------------// Initialize http.
- |------------------ Socket----------------// Initialize socket 
- |------------ services
- |------------------ authorization -------------------// Authentication service.
- |------------------ Crypto -----------------------------// Crypto service.
- |------------------ mail ----------------------------// Mail service.

- |------------------ ServiceRegister.ts
- |------------ SingletonRegister.ts ------------------// Define singleton and need to load first.

- |------ utils //
- |------ index.ts --------------------------------------// Main application.
- |-- .env --------------------------------------------// Configuration cloned from `.env.sample` and we need to add to `.gitignore`.
- |-- .gitignore --------------------------------------// Git ignore configuration.
- |-- buildspec.yml ----------------------------------// File for run pipeline on aws
- |-- nodemon.json
- |-- package-lock.json -------------------------------// Lock package version and should not add to `.gitignore`.
- |-- package.json
- |-- README.md ---------------------------------------// `IMPORTANT` to start the project.
- |-- tsconfig.json -----------------------------------// Typescript configuration.
```

## NPM Commands


npm run migration:generate --name={Migration_Name} ---// Generate migration for updating database structure.
npm run migration:up --------------------------// Run the next migrations for updating database structure.
npm run migration:down ------------------------// Revert migration for updating database structure.
npm run build ---------------------------------// Build source before start with production environment.
npm run dev -----------------------------------// Start with local environment (NODE_ENV into .env file).
npm start -------------------------------------// Start with production environment (NODE_ENV into .env file), 


```

## Deploy to server

```
- create db name and config db host, db pass
- npm install
- npm run migration:up
- npm run build
- npm start 
```

## Configuration

- `.env` file is main configuration created by `.env.sample`.
- `.gitignore` is Git ignore configuration.
- `tsconfig.json` is Typescript configuration.

## Database Migration

- Database Migrations, a technique to help us keep our database changes under control. Database migration is the process of transforming data between various states without any human interaction. This process will allow us to track changes between schema updates.

