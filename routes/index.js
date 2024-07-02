const express = require ('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const router =  express.Router();

router.get("/", (req, res)=>{

    let error = req.flash("error")
    res.render("index", {error, loggedin: false});
})

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
})

router.get("/cart", isLoggedIn, async function(req, res){

    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    // console.log(user);'
    // let bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    // res.render("cart", {user, bill});
    res.render("cart", {user});
})

router.get("/addtocart/:productid", isLoggedIn, async function(req, res){
    
    // finding that user where we are going to push the product id into the cart
    let user = await userModel.findOne({email: req.user.email});

    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
})

module.exports = router;
