import bcrypt from 'bcrypt';

import database from '#helper/database.js';

import { logError } from '#helper/utils.js';

class m$auth {
  register = async ({ name, username, password, role = 'member' }) => {
    try {
      const hashed = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO auth_user (name, username, password) VALUE (?, ?, ?);';
      const value = [name, username, hashed];
      const result = await database.query(sql, value);
      await database.query('INSERT INTO auth_user_role (username, role) VALUES (?, ?)', [username, role])
      return result;
    } catch (error) {
      logError('module auth register:', error);
      throw error;
    }
  }

  unregister = async ({ username }) => {
    try {
      const sql = 'DELETE FROM auth_user WHERE username = ?;';
      const value = [username];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module auth unregister:', error);
      throw error;
    }
  }

  login = async ({ username }) => {
    try {
      const sql = 'SELECT id, u.username, password, aur.role role FROM auth_user u JOIN auth_user_role aur ON u.username = aur.username WHERE u.username = ?';
      const value = [username];
      const result = await database.query(sql, value);
      return result;
    } catch (error) {
      logError('module auth login:', error);
      throw error;
    }
  }

  getRoles = async () => {
    try {
      const result = await database.query('SELECT * FROM auth_role');
      return result;
    } catch (error) {
      logError('module auth getRoles:', error);
      throw error;
    }
  }
}

export default new m$auth();
