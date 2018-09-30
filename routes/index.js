var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');

router.get("/", function (req, res) {
    res.render('index', { user : req.user, title: "Dashboard" });
});

router.get("/login", function (req, res) {

    res.render("login", {
        title: "Login"
    });

});


router.post("/login", passport.authenticate('local'), function (req, res) {

    // var email = req.form.email;
    // var pass = req.form.pass;

    console.dir(req.body);
    res.redirect("/");

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get("/data", function (req, res) {

    console.log(req.user);
    res.send(req.user);

});

module.exports = router;
