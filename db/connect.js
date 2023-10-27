require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.CONNECT)
.then(
    console.log("Connection Stable")
)
.catch((err)=>{
    console.log("Error" + err)
})