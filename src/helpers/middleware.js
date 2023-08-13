import config from '#config' assert { type: 'json' };

import m$auth from '#module/auth.module.js';

import { response, jwt, logError } from '#helper/utils.js';

export const checkSession = async (req, res, next) => {
  const { headers } = req;
  const token = headers?.authorization?.startsWith('Bearer')
    ? headers?.authorization?.split(' ')?.[1]
    : null;

  if (!token) {
    response.send(res, 401, 'Not Authenticated!');
  }

  try {
    const decoded = await jwt.verify(token, config.jwt.secret);

    if (!decoded) {
      response.send(res, 401, 'Not Authenticated!');
    }

    const [{ password, ...user }] = await m$auth.login({ username: decoded.u });

    req.user = user;

    next();
  } catch (error) {
    logError('helper middleware checkSession:', error);
    response.send(res, 500, error);
  }
};
