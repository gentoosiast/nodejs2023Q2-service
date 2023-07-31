# Home Library Service

RS School NodeJS 2023 Q2 - Week 6 Task

`Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Installation

**IMPORTANT**: Use Node.js LTS version (18.17.0 at the time of writing)

Clone this repository

Install all dependencies with `npm install`

Create `.env` config using `.env.example` as reference.

## Provided NPM scripts

### Running application

```
npm start
```

You can start application in watch mode (enables live-reloading on changes in source files)

```
npm run start:dev
```

Additionally to watch mode you can also enable debug mode

```
npm run start:debug
```

There is also a script to build & start application in production mode

```
npm run start:prod
```

You can also build application without starting it

```
npm run build
```

### Testing

**After application is running open new terminal and enter:**

To run all tests without authorization

```
npm run test
```

To run only specific test suite without authorization

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

**NOTE: authorization will be implemented later, in 3rd part of this task assignment**

```
npm run test:auth -- <path to suite>
```

To start Jest in watch mode

```
npm run test:watch
```

To display test coverage (for all tests, **includes test suite with authorization**)

```
npm run test:cov
```

### Linting with ESLint and formatting with Prettier

```
npm run lint
```

```
npm run format
```

## API Endpoints

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
