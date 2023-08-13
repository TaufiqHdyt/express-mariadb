import { Router } from 'express';

import c$product from '#controller/product.js';

import { checkSession } from '#helper/middleware.js';

const product = Router();

product.post('/', checkSession, c$product.add);
product.get('/', checkSession, c$product.list);
product.put('/:id', checkSession, c$product.update);
product.delete('/:id', checkSession, c$product.delete);

export { product };
