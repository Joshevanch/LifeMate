const express = require('express');
const router = express.Router();
const lifemateController = require('../controller/lifemateController');
const lifemateService = require('../services/lifemateService');
const middleware = require ('../middleware/auth')

router.post('/register', lifemateController.register);
router.post('/login', lifemateController.login);
router.get('/protected', middleware.verifyToken, lifemateController.testProtected);
router.get('/getUserById/:userId', middleware.verifyToken, lifemateController.getUserById);
router.post('/insertRecord', middleware.verifyToken, lifemateController.insertRecord);
router.delete('/deleteRecord/:recordId', middleware.verifyToken, lifemateController.deleteRecord);
router.get('/getRecordById/:userId', middleware.verifyToken, lifemateController.getRecordById);


module.exports = router;
