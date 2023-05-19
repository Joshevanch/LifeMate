const express = require("express");
const router = express.Router();
const lifemateController = require("../controller/lifemateController");

router.post("/register", lifemateController.register);
router.post("/login", lifemateController.login);

module.exports = router;
