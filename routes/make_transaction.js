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
    res.render("make_transaction", {title: "Make a transfer"});
});

router.post("/do_transfer", function (req, res) {
    console.log(req.body.toAccount, req.body.amount);
     var obj = {
        to :  req.body.toAccount,
        amount: req.body.amount,
         from: req.user.username,
         status : '-1'
        };

    trans = new Transaction(obj);

    trans.save(function (err, success) {
        if (err) {
            console.log("Error occured");
            console.log(err);
        }
        else {
            console.log(success);
            res.render("make_transaction", {title: "Successful transaction. Make another one ??? "});
        }
    })
});

module.exports = router;
