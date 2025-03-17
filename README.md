<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Manual

### Project setup

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Docker Compose

### Project setup

```bash
$ docker compose up -d
```

### Compile and run the project

```bash
# development
$ docker compose exec app npm run start
```

### Run tests

```bash
# unit tests
$ docker compose exec app npm run test

# e2e tests
$ docker compose exec app npm run test:e2e

# test coverage
$ docker compose exec app npm run test:cov
```

## API Test

```bash
# development
GET http://localhost:3000/awards/intervals
```