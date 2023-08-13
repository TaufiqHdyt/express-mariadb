import database from '#helper/database.js';

import { logError } from '#helper/utils.js';

class m$product {
  add = async ({ name, description, price, username }) => {
    try {
      const sql = 'INSERT INTO d_product (name, description, price, username) VALUE (?, ?, ?, ?)';
      const value = [name, description, price, username];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module product add:', error);
      throw error;
    }
  }

  list = async ({ username }) => {
    try {
      const sql = 'SELECT id, name, description, price, discount FROM d_product WHERE username = ?';
      const value = [username];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module product list:', error);
      throw error;
    }
  }

  update = async ({ id, name, description, price, discount }) => {
    try {
      const sql = 'UPDATE d_product SET name = ?, description = ?, price = ?, discount = ? WHERE id = ?';
      const value = [name, description, price, discount, id];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module product update:', error);
      throw error;
    }
  }

  delete = async ({ id }) => {
    try {
      const sql = 'DELETE FROM d_product WHERE id = ?';
      const value = [id];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module product delete:', error);
      throw error;
    }
  }
}

export default new m$product();
