# ExpressJS Boilerplate

## Tech stack

- Node JS
  - LTS with n (`n lts`)
  - pnpm with corepack (`corepack enable && corepack prepare pnpm@latest --activate`)
- Express
  - latest
- mySQL
  - mySQL DB with unix socket connection
  - mariaDB node driver

## Steps to Initialize

### New Project

```sh
mkdir express-mariadb
cd express-mariadb
pnpx express-generator --no-view --git
pnpm i # install dependencies
pnpm up -iL # interactively update dependencies to latest
```

### Refactor project with ESM

```
1. change `var` to `const`
2. change `require` to `import`
3. restructure file and folder
```

### Add config file

`config/index.js` can be created from `.src/config/index.example.js`

### Add mariadb

```sh
pnpm add mariadb
```

### Add authorization with jwt & hash

```sh
pnpm add jsonwebtoken bcrypt
```

### Add validation with yup

```sh
pnpm add yup
```

example:

```js
import { object, string } from 'yup';
const schema = object({
  name: string().required(),
  description: string().when('$ctx', ([ctx], s) => ctx ? s.required() : s.notRequired())
});
```

## Steps to Develop

### Setup

make `config/index.js` file

```sh
cp src/config/index.example.js src/config/index.js
```

edit `db` object in `config/index.js` based on mysql configuration

```js
export default {
  name: 'express-mariadb',
  port: 3500,
  db: {
    host: 'localhost',
    user: 'user',
    password: 'pw',
    database: 'db',
    socketPath: '/path/to/db.sock',
    charset: 'utf8mb4',
    rejectEmpty: true,
  },
  jwt: {
    secret: 'your-super-secrets-key',
    expired: 18000000,
  },
  debug: false,
};
```

### Start dev server

```sh
pnpm start:dev
```

## Steps to Deploy

same as develop, but using start deploy script to run in node server

```sh
pnpm start
```

## Notes

- using experimental assert json
- using node `--watch` mode for `start:dev` script

### Additional resource

- [Documenter Postman](https://documenter.getpostman.com/view/12986024/2s9Xy5LVVr)
