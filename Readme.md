## Church Admin Dashboard local setup

### Requirements

 - NodeJS
 - Git
 - Yarn
 - Docker (optional)
 - MongoDB (if you don't want to use docker)
 - VSCode (or whatever editor you prefer)

#### Download Docker

Although not required, docker can be used to setup all parts of the system at once instead of individually
Docker can be downloaded here https://www.docker.com/products/docker-desktop/


### Local setup (with Docker)

Make sure you have docker running. Secondly make sure your terminal is on the project root directory.
```sh
$ docker-compose up -d
```

### Local setup (Frontend, no Docker)

Assuming you are already on the project root directory.
```sh
$ cd frontend
$ yarn install
$ yarn dev
```

The terminal should show you the address on your localhost where you can access the frontend and make live changes.

### Local setup (Backend, no Docker)

Assuming you are already on the project root directory, and MongoDB is already running.

```sh
$ cd backend
$ cp sample.env .env
$ npm install
$ npm run start:dev
```

Inspect the `.env` to make sure the database connection URL is correct to avoid startup errors




