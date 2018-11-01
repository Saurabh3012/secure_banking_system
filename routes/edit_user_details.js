var express = require('express');
var router = express.Router();

var Accounts = require("../models/account");
var Bank = require("../models/bank");
var Trans = require('../models/transaction');

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
