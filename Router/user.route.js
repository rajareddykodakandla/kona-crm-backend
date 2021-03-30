const express = require('express')
const { isAuthenticated } = require('../middlewares/auth.middleware');
const userctr = require('../controller/user.controller')
const router = express.Router()
const user = new userctr()

//console.log(user)
 router.post("/register", user.signup);
 router.post("/login", user.signin);
 router.post("/updatePassword", isAuthenticated, user.changepassword)

module.exports = router