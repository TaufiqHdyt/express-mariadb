import mariadb from 'mariadb';

import config from '#config' assert { type: 'json' };

import { logError } from '#helper/utils.js';

const pool = mariadb.createPool({
  ...config.db,
  trace: config.debug,
});

class database {
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

  query = async (sql, params, dateStrings = true, insertIdAsNumber = true) => {
    let conn;

    try {
      conn = await pool.getConnection();

      const result = await conn.query(
        { sql, dateStrings, insertIdAsNumber },
        this.escapeUndefined(params),
      );

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
