const lifemateService = require("../services/lifemateService");

async function register(req, res) {
  try {
    const result = await lifemateService.register(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function login(req, res) {
  try {
    const result = await lifemateService.login(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

module.exports = {
  register,
  login,
};
