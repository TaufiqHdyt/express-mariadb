import config from '#config' assert { type: 'json' };

class c$index {
  home = (req, res, next) => {
    res.send({ name: config.name });
  };
}

export default new c$index();
