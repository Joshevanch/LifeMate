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
    if (result.message === "Login successful") {
      const token = generateToken(result.idUser);
      res.json({ ...result, token });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.json(err.detail);
  }
}

function generateToken(idUser) {
  const payload = { idUser };
  const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N";
  const options = { expiresIn: "1h" }; 
  return jwt.sign(payload, secretKey, options);
}

module.exports = {
  register,
  login,
};
