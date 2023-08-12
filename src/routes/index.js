import { Router } from 'express';
import config from '#config' assert { type: 'json' };

const index = Router();

/* GET home page. */
index.get('/', function (req, res, next) {
  res.send({ name: config.name });
});

export { index };
