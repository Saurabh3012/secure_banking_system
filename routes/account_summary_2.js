var express = require('express');
var router = express.Router();

var Bank = require("../models/bank");
var transaction = require('../models/transaction');

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

    transaction.find(function (err, result) {

        if (err) {
            console.error(err);
            res.send("Something went wrong")
        } else {
            res.send(result)
        }

    });

});


//create bank account
router.post("/", function (req, res) {

    res.send(req.user);

});

module.exports = router;
