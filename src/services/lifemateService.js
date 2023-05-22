const e = require("express");
const db = require("../config/config");
const jwt = require("jsonwebtoken");

async function register(body) {
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return {
      message: "Empty value",
    };
  }
  const query = `INSERT INTO account (NAME, EMAIL, PASSWORD) VALUES ('${name}', '${email}','${password}')`;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    return {
      message: "User Created",
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function login(body) {
  const { email, password } = body;
  const query = `SELECT * FROM account WHERE email = '${email}'`;
  const result = await db.query(query);
  if (result.rows.length === 0) {
    return {
      message: "User not found",
    };
  } 
  else {
    const user = result.rows[0];
    if (password === user.password){
      return {
        message: "Login successful",
        idUser: user.id,
      };
    }
    else {
      return {
        message: "Login failed",
      };
    }
  }
}

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N"; 
  jwt.verify(token, secretKey, (err, decoded)=> {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.idUser;
    next();
  });
}

module.exports = {
  register,
  login,
  verifyToken,
};
