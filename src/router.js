import { index } from '#routes/index.js';
import { users } from './routes/users.js';

const router = (app) => {
  app.use('/', index);
  app.use('/users', users);
};

export { router };
