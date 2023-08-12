import { Router } from 'express';

import c$index from '#controller/index.js';

const index = Router();

index.get('/', c$index.home);

export { index };
