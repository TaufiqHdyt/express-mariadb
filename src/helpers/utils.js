import jsonwebtoken from 'jsonwebtoken';

import config from '#config' assert { type: 'json' };

export const jwt = {
  sign: async (payload, options = { expiresIn: '1h' }) =>
    jsonwebtoken.sign(payload, config.jwt.secret, options),
  verify: async (token) => jsonwebtoken.verify(token, config.jwt.secret),
};

export const logError = (msg, err) => {
  if (config.debug) {
    console.error(`${msg}`, err);
  }
};
