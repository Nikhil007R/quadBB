const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


module.exports.isLoggedIn = async function(req, res, next){

    // phle check krenge ki jo browser hai usme koi token pda hai ya nhi 

    if(!req.cookies.token){
        // flash message dikha do like ki user needs to login first before performing some task 
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }

    try{

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email})
        .select("-password");

        req.user = user;
        next();
    }
    catch(err){
        req.flash("error", "you need to login first");
        res.redirect("/")
    }

}