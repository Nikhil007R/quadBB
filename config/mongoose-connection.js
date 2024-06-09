// kabab case here
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Scatch")
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err);
})
// mongoose.connection will give you the whole control to the database (scatch).
module.exports = mongoose.connection