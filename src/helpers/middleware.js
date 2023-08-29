import config from '#config';

import m$auth from '#module/auth.module.js';

import { jwt, logError, response } from '#helper/utils.js';

export const checkSession = async (req, res, next) => {
  try {
    const { headers } = req;

    const token = headers?.authorization?.startsWith('Bearer')
      ? headers?.authorization?.split(' ')?.[1]
      : null;

    if (!token) {
      throw {
        code: 401,
        message: 'Not Authenticated!',
      };
    }

    const decoded = await jwt.verify(token, config.jwt.secret);

    if (!decoded) {
      throw {
        code: 401,
        message: 'Not Authenticated!',
      };
    }

    const [{ password, ...user }] = await m$auth.login({ username: decoded.u });

    req.user = user;

    next();
  } catch (error) {
    logError('helper middleware checkSession:', error);
    response.send(res, 500, error);
  }
};
