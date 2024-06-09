// camel case in routes 
const express = require("express");
const router = express.Router();

const ownerModel = require("../models/ownerModel");

const dotenv = require("dotenv").config();

// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){

    router.post("/create", async (req, res)=>{

        let owners = await ownerModel.find();
        if(owners.length >= 1) return res.status(500).send("you do not have permission to create a new owner");

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })

        res.status(201).send(createdOwner);
    })
}   

router.get("/", (req, res)=>{
    res.send("Hello ownerRoutes");
})


module.exports = router;