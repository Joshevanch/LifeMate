const express = require("express");
const router = express.Router();
const lifemateController = require("../controller/lifemateController");
const lifemateService = require("../services/lifemateService");

router.post("/register", lifemateController.register);
router.post("/login", lifemateController.login);
router.get("/protected", lifemateService.verifyToken, (req, res) => {
    
module.exports = router;
