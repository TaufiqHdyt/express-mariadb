import m$product from '#module/product.module.js';

import { response, logError } from '#helper/utils.js';

class c$product {
  add = async (req, res, next) => {
    try {
      const { name, description, price } = req.body;
      const message = await m$product.add({
        name,
        description,
        price,
        username: req.user.username,
      });
      return response.send(res, 201, message);
    } catch (error) {
      logError('controller product add:', error);
      return response.send(res, 500, error);
    }
  };

  list = async (req, res, next) => {
    try {
      const { username } = req.user;
      const data = await m$product.list({ username });
      return response.send(res, 200, data);
    } catch (error) {
      logError('controller product list :', error);
      return response.send(res, 500, error);
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, discount } = req.body;
      const data = await m$product.update({ id, name, description, price, discount });
      return response.send(res, 200, data);
    } catch (error) {
      logError('controller product update:', error);
      throw error;
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await m$product.delete({ id });
      return response.send(res, 200, data);
    } catch (error) {
      logError('controller product delete:', error);
      throw error;
    }
  }
}

export default new c$product();
