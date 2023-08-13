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

export const response = {
  send: async (res, code, data) => {
    try {
      if (data === 'Data not found!') code = 404;
      return res.status(code).json(
        code === 200
          ? {
              data,
            }
          : {
              error: data?.message ?? data,
            },
      );
    } catch (error) {
      logError('helper response send:', error);
      throw error;
    }
  },
  catchAll: (req, res, next) => {
    res.status(404).json({
      error: "Cant't find this route",
    });
  },
};
