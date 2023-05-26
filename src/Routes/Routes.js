const express = require('express');
const router = express.Router();
const lifemateController = require('../controller/lifemateController');
const lifemateService = require('../services/lifemateService');
const middleware = require ('../middleware/auth')

router.post('/register', lifemateController.register);
router.post('/login', lifemateController.login);
router.get('/protected', middleware.verifyToken, lifemateController.testProtected);
router.get('/getUserById/:id', middleware.verifyToken, lifemateController.getUserById);

module.exports = router;
