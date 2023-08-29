import config from '#config';

class c$index {
  home = (req, res, next) => {
    res.send({ name: config.name });
  };
}

export default new c$index();
