# Home Library Service

RS School NodeJS 2023 Q2 - Weeks 6-8 Task

Dockerized REST API with Prisma ORM & PostgreSQL database with Live-Reload support for files in `src/` folder

`Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Installation

**IMPORTANT**: Use Node.js LTS version (18.17.1 at the time of writing)

1. Clone this repository

2. Switch to `feature/docker-orm` branch: `git switch feature/docker-orm`

3. Install all project dependencies with `npm install`

4. Create `.env` config using `.env.example` as reference

5. Start _Docker Desktop_ (only if you are MS Windows user, otherwise skip this step)

6. Run `docker compose up -d` and wait until images are created & containers are started. You can check status of containers with `docker ps`

7. Run Prisma ORM migrations: `npm run prisma:migrate:dev`

8. Everything should be ready and now you can run tests with `npm t` and check final size of application image with `docker images`

## Available .env settings

- `PORT` - port number on which Home Library Service API will run in container and will be accessible outside
- `CRYPT_SALT` - number of rounds for salt creation (used to hash the passwords), the cost of processing the data
- `JWT_SECRET_KEY` - secret key used to sign the access token
- `JWT_SECRET_REFRESH_KEY` - secret key used to sign the refresh token
- `TOKEN_EXPIRE_TIME` - expiration time of access token (expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms))
- `TOKEN_REFRESH_EXPIRE_TIME` - expiration time of refresh token (expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms))
- `CUSTOM_NETWORK_SUBNET` - Subnet in CIDR format that represents a network segment used by custom network. **NOTE:** if you change this setting, you will also need to change `./database/pg_hba.conf` to be able to use GUI database manager such as `pgAdmin` to connect to the database running in the container
- `PGPORT` - port number on which PostgreSQL will run in container and will be accessible outside
- `POSTGRES_USER` - login of superuser which will be created when you start PostgreSQL container the first time
- `POSTGRES_PASSWORD` - password of superuser specified by `POSTGRES_USER` environment variable
- `POSTGRES_DB` - default database that is created when the image is first started
- `DATABASE_URL` - connection URL of Prisma ORM <https://www.prisma.io/docs/reference/database-reference/connection-urls#env>

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

### Prisma ORM

To generate assets like `Prisma Client` based on the generator and data model blocks defined in your `prisma/schema.prisma` file

```
npm run prisma:generate
```

To apply all pending migrations, and create the database if it does not exist. Primarily used in non-development environments

```
npm run prisma:migrate
```

To apply all migrations, then create and apply any new migrations. For use in development environments only

```
npm run prisma:migrate:dev
```

### Docker

To scan images for vulnerabilities

```
npm run docker:scan
```

Same as `prisma:generate` script, but will run inside the Docker container

```
npm run docker:prisma:generate
```

Same as `prisma:migrate` script, but will run inside the Docker container

```
npm run docker:prisma:migrate
```

Same as `prisma:migrate:dev` script, but will run inside the Docker container

```
npm run docker:prisma:migrate:dev
```

## API Endpoints

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
