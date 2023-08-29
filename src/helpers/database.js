import mariadb from 'mariadb';

import config from '#config';

import { logError } from '#helper/utils.js';

class database {
  #pool;

  constructor() {
    this.#pool = mariadb.createPool({
      ...config.db,
      bigIntAsNumber: true,
      dateStrings: true,
      insertIdAsNumber: true,
      trace: config.debug,
    });
  }

  escapeUndefined = (args) => {
    if (!(args instanceof Object)) {
      return args === undefined ? null : args;
    }

    for (const key in args) {
      if (args[key] === undefined) {
        args[key] === null;
      }
    }

    return args;
  };

  query = async (sql, params) => {
    const conn = await this.#pool.getConnection();

    try {
      const result = await conn.query({ sql }, this.escapeUndefined(params));

      if (Array.isArray(result) && !result.length && config.db.rejectEmpty) {
        throw {
          code: 404,
          message: 'Data not found!',
        };
      }

      return result;
    } catch (error) {
      logError('helpers database query:', error);
      if (Number.isInteger(error.code)) throw error;
      throw error?.code ?? error;
    } finally {
      if (conn) conn.release();
    }
  };
}

export default new database();
