import { index } from '#route/index.js';
import { auth } from '#route/auth.js';

// api
import { product } from '#route/api/product.js';

const router = (app) => {
  app.use('/', index);
  app.use('/auth', auth);
  // api
  app.use('/api/product', product);
};

export { router };
