// kabab case here
const mongoose = require("mongoose");
const config = require("config")


mongoose.connect(`${config.get("MONGO_URI")}/Scatch`)
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err);
})
// mongoose.connection will give you the whole control to the database (scatch).
module.exports = mongoose.connection