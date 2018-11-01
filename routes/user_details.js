var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');
var UserDetails = require('../models/bank');
const config = require("../config/config.json");
var Trans = require('../models/transaction');

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
    res.render("user_details", {title: "Your Details", name: req.user.name, ph: req.user.phone, dob: req.user.dob, bal: req.user.amount})
});


module.exports = router;
