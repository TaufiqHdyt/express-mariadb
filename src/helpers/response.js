import { logError } from '#helper/utils.js';

const response = {
  send(res, code, data) {
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
};

export default response;
