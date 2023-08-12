import { index } from '#route/index.js';
import { auth } from '#route/auth.js';

const router = (app) => {
  app.use('/', index);
  app.use('/auth', auth);
};

export { router };
