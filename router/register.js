const express = require("express");
const router = express.Router();
const db = require("../db/connect")
const loginModel = require("../db/schema");
const { default: mongoose } = require("mongoose");

router.get('/', (req,res) => {
    res.render('register');
});

router.post("/",async(req,res)=>{
    console.log(req.body);

    if(req.body.password === req.body.cnfm_password){
   
    try{
        const userDetail = new loginModel(
            {
                username : req.body.username,
                email : req.body.email,
                contact_no : req.body.contact_no,
                password : req.body.password,
                cnfm_password : req.body.cnfm_password
            }
        )
        const token = await userDetail.generateAuthToken()
        res.cookie("jwt",token,{
            expires : new Date(Date.now() + 30000),
            httpOnly : true
        })
        // console.log(cookie)
        const registered = await userDetail.save()
        console.log(token)
        res.render("index")
        
    
    }catch(err){
        console.log(err)
    }
}else{
    res.send("password does not matching")
}
   
})

module.exports = router;

  