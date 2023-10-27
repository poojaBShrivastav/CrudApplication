require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginschema = mongoose.Schema({
    username : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    contact_no : {
        type : Number ,
        required : true
    }, 
    password : {
        type : String ,
        required : true
    },
     cnfm_password : {
        type : String ,
        required : true
    },
    tokens :[{
            token:{
            type:String,
            require : true
            }
        }]
})

loginschema.methods.generateAuthToken = async function(){

    try{
        const token = jwt.sign({_id : this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token : token})
        await this.save()
        console.log("save")
        
        return token
    }catch(err){
        console.log(err)
    }
}

//bcrpt password before store in database
loginschema.pre("save",async function(next){
    if(this.isModified("password")){
   
         this.password = await bcrypt.hash(this.password,10)
         this.cnfm_password = await bcrypt.hash(this.cnfm_password,10)
        
    }
    next()
})

const loginModel = mongoose.model("loginTable",loginschema)
module.exports = loginModel
