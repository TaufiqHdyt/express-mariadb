import m$product from '#module/product.module.js';

import { response, logError } from '#helper/utils.js';

import {
  object,
  string,
  number,
} from 'yup';

const schema = object({
  id: number().when('$del', ([del], s) => del ? s.required() : s.notRequired()),
  name: string().when('$del', ([del], s) => !del ? s.required() : s.notRequired()),
  description: string().when('$del', ([del], s) => !del ? s.required() : s.notRequired()),
  price: number().when('$del', ([del], s) => !del ? s.required() : s.notRequired()),
  discount: number().nullable()
});

class c$product {
  add = async (req, res, next) => {
    try {
      const { name, description, price } = req.body;

      await schema.validate({ name, description, price });

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
      await schema.validate({ name, description, price, discount });
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
      await schema.validate({ id }, { context: { del: true } });
      const data = await m$product.delete({ id });
      return response.send(res, 200, data);
    } catch (error) {
      logError('controller product delete:', error);
      throw error;
    }
  }
}

export default new c$product();
