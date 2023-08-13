import { Router } from 'express';

import c$auth from '#controller/auth.js';

import { checkSession } from '#helper/middleware.js';

const auth = Router();

auth.post('/register', c$auth.register);
auth.patch('/unregister', c$auth.unregister);
auth.post('/login', c$auth.login);
auth.get('/session', checkSession, c$auth.session);

export { auth };
