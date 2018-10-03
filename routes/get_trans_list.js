var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');
var UserDetails = require('../models/bank');
const config = require("../config/config.json");


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

router.get("/", function(req, res){
    res.render("get_trans_list", {title: "Get Transactions in Range"});
});



router.post("/get_list", function(req, res){
    console.log(req.body.from, req.body.to);
    res.render("get_trans_list", {title: "List of Transactions", list:"None"});
});

module.exports = router;
