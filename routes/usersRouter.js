// camel case in routes 
const express = require("express");
const router = express.Router();
// const userModel = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");
// const {generateToken} = require("../utils/generateToken"); 

// const {userRegister} = require("../controllers/authController")
const {registerUser, loginUser, logout} = require("../controllers/authController")

router.get("/", (req, res)=>{
    res.send("Hello usersRouter");
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout)

module.exports = router;