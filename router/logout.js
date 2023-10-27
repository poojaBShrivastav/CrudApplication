const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

router.get('/',auth,async(req,res) => {
    // console.log(` this is our cookie ${req.cookies.jwt}`)
  try{
        req.user.tokens = req.user.tokens.filter((element)=>{
            return element.token !== req.token
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login")
        console.log("log out")

  }catch(err){
    res.status(500).send(err)
  }
});

module.exports = router;

  