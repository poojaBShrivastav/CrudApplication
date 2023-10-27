require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require("path")
const hbs = require("hbs")
const register = path.join(__dirname,"./views/partials")
const loginRouter = require("./router/login")
const indexRouter = require("./router/home")
const registerRouter = require("./router/register")
const secretRouter = require("./router/secret")
const dashboardRouter = require("./router/dashboard")
const logoutRouter = require("./router/logout")
const db = require("./db/connect")
const loginModel = require("./db/schema")
const body_parser = require("body-parser");
const exp = require('constants');
const router = express.Router()
const cookie_parser = require("cookie-parser")
const auth = require("./middleware/auth")

console.log(process.env.SECRET_KEY)

//set Middleware
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie_parser())
//Set Template engine
app.set('view engine', 'hbs');
//Register partail
hbs.registerPartials(__dirname + '/views/partials');

//Router
app.use("/home",indexRouter)
app.use('/login',loginRouter)
app.use("/secret",secretRouter)
app.use("/register",registerRouter)
app.use("/dashboard",dashboardRouter)
app.use("/logout",logoutRouter)


app.listen(port,()=>{
    console.log("server is listening at port 4000")
})