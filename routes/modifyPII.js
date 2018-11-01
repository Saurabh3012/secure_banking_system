var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');
var Transaction = require('../models/transaction');
const config = require("../config/config.json");


var authenticate = function (req, res, next) {

    if (req.user) {
        next();
    } else {
        res.render("login", {
            title: "Login",
            captcha: res.recaptcha
        });
    }

};

router.use(authenticate);

router.get("/", function (req, res) {
    res.render("modifyPII", {title: "Change information"});
});