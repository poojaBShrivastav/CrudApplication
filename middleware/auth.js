const jwt = require("jsonwebtoken")
const loginModel = require("../db/schema")
const auth = async (req,res,next) => {
    try{

        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
        console.log(verifyUser);
        const user = await loginModel.findOne({_id:verifyUser._id})
        console.log(user);

        req.token = token;
        req.user = user;
        next()

    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}

module.exports = auth;