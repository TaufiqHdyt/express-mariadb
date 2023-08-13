import bcrypt from 'bcrypt';

import m$auth from '#module/auth.module.js';

import { response, jwt, logError } from '#helper/utils.js';

class c$auth {
  register = async (req, res, next) => {
    try {
      const { name, username, password, role } = req.body;
      const message = await m$auth.register({ name, username, password, role });
      return response.send(res, 200, message);
    } catch (error) {
      logError('controller auth register:', error);
      return response.send(res, 500, error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const [{ password: userPassword, ...user }] = await m$auth.login({ username });

      if (!user) {
        throw 'User not found!';
      }

      const checkPassword = await bcrypt.compare(password, userPassword);

      if (!checkPassword) {
        throw 'Wrong password!';
      }

      const payload = {
        u: user.username,
        r: user.role
      };

      const token = await jwt.sign(payload);

      return response.send(res, 200, {
        token,
      });
    } catch (error) {
      logError('controller auth register:', error);
      return response.send(res, 500, error);
    }
  };

  session = async (req, res, next) => {
    try {
      return response.send(res, 200, req.user);
    } catch (error) {
      logError('controller auth session:', error);
      return response.send(res, 500, error);
    }
  }
}

export default new c$auth();
