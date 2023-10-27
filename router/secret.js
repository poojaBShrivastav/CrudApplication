const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

router.get('/',auth,(req,res) => {
    // console.log(` this is our cookie ${req.cookies.jwt}`)
    res.render('secret');
});

module.exports = router;

  