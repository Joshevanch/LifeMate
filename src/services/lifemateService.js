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
  } 
  else {
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
  const {userId} = body
  const query = `SELECT * FROM account WHERE id = ${userId}`;
  const result = await db.query(query);
  user = result.rows[0]
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

async function insertRecord(body){
  const {idUser, height, weight, weeklyToDoList, userHelp, achievement, selfReward} = body
  if (!idUser || !height || !weight || !weeklyToDoList || !userHelp || !achievement || !selfReward){
    return {
      message: "Empty body"
    }
  }
  let query = `SELECT * FROM account where id = ${idUser};`
  const tempUser = await db.query(query)
  if (tempUser.rows[0] === 0 ){
    return {
      message: "Error"
    }
  }
  const user = tempUser.rows[0]
  if (user.gender === 'laki-laki'){

  }
  if (user.gender === 'perempuan'){

  }
  query = `INSERT INTO RECORD (height, weight, weeklytodolist, userhelp, achievement, selfreward, obesity, stress) VALUES (${height}, ${weight}, ${weeklyToDoList}, 
    ${userHelp}, ${achievement}, ${selfReward}, 1, 2 ); INSERT INTO ACCOUNTRECORD (accountid) values ('${idUser}');`;
  const result = await db.query(query);
  if (result[0].rowCount !== 0 && result[1].rowCount !== 0){
    return {
      message: "Record inserted",
      obesity: "normal",
      stress: "normal"
    };
  }
  else{
    return{
      message: "Error inserting record"
    }
  }
}

async function deleteRecord(body){
  const {recordId} = body
  let query = `DELETE FROM RECORD where id = ${recordId}; DELETE FROM ACCOUNTRECORD where recordid = ${recordId};`
  const result = await db.query(query);
  if (result[0].rowCount !== 0 && result[1].rowCount !== 0){
    return {
      message: "Record deleted",
    };
  }
  else{
    return{
      message: "Error deleting record"
    }
  }
}

async function getRecordById(body){
  const {userId} = body
  let query = `SELECT * FROM RECORD INNER JOIN ACCOUNTRECORD on RECORD.ID = ACCOUNTRECORD.RECORDID WHERE ACCOUNTRECORD.ACCOUNTID = ${userId};`
  const result = await db.query(query);
  if (result.rowCount !== 0){
    return {
      result: result.rows
    };
  }
  else{
    return{
      message: "Error getting record"
    }
  }
}


module.exports = {
  register,
  login,
  testProtected,
  getUserById,
  insertRecord,
  deleteRecord,
  getRecordById
};
