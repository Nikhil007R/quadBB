const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken"); 

module.exports.registerUser = async function(req, res){
    
    try{

        let {fullname, email, password} = req.body;

        let user = await userModel.findOne({email: email});

        if(user) return res.status(401).send("User Already Created , Please Login !!");

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err) res.send(err.message);
                else{
                    
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
            
                    // generating token which is situated in util folder 
                    let token = generateToken(user);

                    // setting token value in user's browser   
                    res.cookie("token", token);
                    // res.send("User Created successfully: ")
                    res.redirect("/shop")
                }
            })
        })

    }
    catch(err){
        console.log(err);
    }
}

module.exports.loginUser = async function(req, res){

    let {email, password } = req.body;
    
    let user = await userModel.findOne({email});
    if(!user) return res.status(400).send("User or Password is incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(err) res.status(400).send(err.message);
        
        if(result){

            let token = generateToken(user);
            res.cookie("token", token);
            // res.send("Logged in Successfully: ");
            res.redirect("/shop");
        }
        else{
            req.flash("error", "email or password is incorrect")
            return res.redirect("/")
        }
    })
}

module.exports.logout = function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}