const e = require("express");
const db = require("../config/config");
const jwt = require("jsonwebtoken");
const security = require("../utils/security")
const middleware = require ("../middleware/auth")

async function register(body) {
  const { name, email, password, gender, birthDate } = body;
  if (!name || !email || !password || !gender || !birthDate) {
    return {
      message: "Empty value",
    };
  }
  const hashPassword = await security.hashPassword(password)
  const query = `INSERT INTO account (NAME, EMAIL, PASSWORD, GENDER, BIRTHDATE) VALUES ('${name}', '${email}','${hashPassword}', '${gender}', '${birthDate}')`;
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
    if (await security.comparePassword(password, user.password)){
      const token = await middleware.generateToken(user.id)
      return {
        message: "Login successful",
        idUser: user.id,
        token: token,
      };
    }
    else {
      return {
        message: "Login failed",
      };
    }
  }
}

async function testProtected(body) {
  return {
    message: "Protected route accessed successfully"
  };
}

async function getUserById(body){
  const {id} = body
  const query = `SELECT * FROM account WHERE id = ${id}`;
  const result = await db.query(query);
  user = result.rows[0]
  console.log(user)
  if (result.rows.length === 0) {
    return {
      message: "User not found",
    };
  } 
  else{
    return {
      idUser: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      birthDate: user.birthdate
    };
  }
}
module.exports = {
  register,
  login,
  testProtected,
  getUserById
};
