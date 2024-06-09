// camel case in routes 
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Hello usersRouter");
})

module.exports = router;