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

`app.json` can be created from `.src/config/app.example.json`

### Add mariadb

```sh
pnpm add mariadb
```

## Steps to Develop

### Setup

make `app.json` file

```sh
cp src/config/app.example.json src/config/app.json
```

edit `db` object in `app.json` based on mysql configuration

```json
{
  "name": "express-mariadb",
  "port": 3500,
  "db": {
    "provider": "mysql",
    "host": "localhost",
    "user": "user",
    "password": "pw",
    "database": "db",
    "socket": "/path/to/db.sock",
    "charset": "utf8mb4",
    "rejectEmpty": true
  },
  "debug": false
}
```

### Start dev server

```sh
pnpm start:dev
```

## Notes

- using experimental assert json
- using node `--watch` mode for `start:dev` script

### Additional resource

- [Documenter Postman](https://documenter.getpostman.com/view/12986024/2s9Xy5LVVr)
