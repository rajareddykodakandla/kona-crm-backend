const express = require('express')
const { signup, signin } = require('../controller/userController')
const router = express.Router()

router.post("/register", signup);
router.post("/login", signin);

module.exports = router