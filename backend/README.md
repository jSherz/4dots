# 4dots (backend)

This is a backend API to the 4dots game, written with [hapi](https://hapijs.com/).

## Developing locally

`yarn` can be substituted with `npm` below.

```bash
# Install deps
yarn install

# Run the server
yarn run start

# Run the tests
yarn run test
```

## Deploying

The API will read the `DATABASE_URL` env var to overwrite the DB connection string.

If the `NODE_ENV` is not set to `dev`, it will bind to all addresses rather than localhost.

```bash
yarn install
NODE_ENV=production DATABASE_URL=mongodb://super-secret-cluster/4dots yarn run start
```
