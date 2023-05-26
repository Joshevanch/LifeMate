const lifemateService = require("../services/lifemateService");
const jwt = require("jsonwebtoken");

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

async function testProtected(req,res){
  try {
    const result = await lifemateService.testProtected(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getUserById(req,res){
  try {
    const result = await lifemateService.getUserById(req.params);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}


module.exports = {
  register,
  login,
  testProtected,
  getUserById
};
