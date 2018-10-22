var express = require('express');
var router = express.Router();


var Bank = require("../models/bank");


var authenticate = function(req, res, next){

    if(req.user){
        next();
    }else{
        res.render("login", {
            title: "Login",
            captcha:res.recaptcha
        });
    }

};

router.use(authenticate);


router.get("/", function (req, res) {



});


//create bank account
router.post("/", function (req, res) {

    res.send(req.user);

});


module.exports = router;
