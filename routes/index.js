var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');

const config = require("../config/config.json");

var Recaptcha = require('express-recaptcha').Recaptcha;
var recaptcha = new Recaptcha(config.google_captcha.siteKey, config.google_captcha.secretKey);


router.get("/", function (req, res) {
    res.render('index', {user: req.user, title: "Dashboard"});
});

router.get("/login", recaptcha.middleware.render, function (req, res) {

    res.render("login", {
        title: "Login",
        captcha: res.recaptcha
    });

});


router.post("/login", [recaptcha.middleware.verify, passport.authenticate('local')], function (req, res) {

    // var email = req.form.email;
    // var pass = req.form.pass;
    if (!req.recaptcha.error) {
        // console.dir(req.body);
        if(req.username == 'avinash'){
            // redirect to the approprite screen
            // this is a regular employee
        }

        if(req.username == 'dwaraka'){
            // redirect to the approprite screen
            // this is a system manager
        }

        if(req.username == 'saurabh'){
            // redirect to the approprite screen
            // this is system administrator
        }

        if(req.username == 'ronak'){
            // redirect to the approprite screen
            // this is individual user

            res.redirect("/banking");
        }

        if(req.username == 'rohit'){
            // redirect to the approprite screen
            // this is merchant or organization.
        }

        res.redirect("/banking");
    } else {
        res.redirect("/banking");
        //res.send("Captcha Error");
    }


});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get("/data", function (req, res) {

    console.log(req.user);
    res.send(req.user);

});

// router.get('/register', function(req, res) {
//     Account.register(new Account({ username : "rohit", role: 5 }), "nodejs", function(err, account) {
//         if (err) {
//             console.error(err);
//             // return res.render('register', { account : account });
//             res.send(err)
//         }
//
//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/');
//         });
//     });
// });

router.post('/register', function (req, res) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', {account: account});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;
