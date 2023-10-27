const express = require("express");
const router = express.Router();
const loginModel = require("../db/schema")
const bcrypt = require("bcrypt")




router.get('/', (req,res) => {
    res.render('login');
});

router.post("/",async (req,res)=>{
    console.log(req.body);
    try{

    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await loginModel.findOne({email : email});
    
    const isMatch = await bcrypt.compare(password,userEmail.password)
    const token = await userEmail.generateAuthToken()
    res.cookie("jwt",token,{
        expires : new Date(Date.now() + 60000),
        httpOnly : true,
        
    })
    
    console.log("1 token"+token)
    
    if(isMatch){
    res.status(200).render("index")
    console.log("successfully login")

    }else{
        res.send("Password does not match")
    }
    // res.send(userEmail)
   
    }catch(err){
        console.log(err)
        res.send("invalid Email")
    }
})

module.exports = router;

  