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
