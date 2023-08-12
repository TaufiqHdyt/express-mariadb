import { Router } from 'express';

import c$auth from '#controller/auth.js';

const auth = Router();

auth.post('/register', c$auth.register);
auth.post('/login', c$auth.login);

export { auth };
