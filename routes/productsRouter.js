// camel case in routes 
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Hello productsRouter");
})

router.get("/hello", (req, res)=>{
    res.send("this is something better than unexpected");
})

module.exports = router;