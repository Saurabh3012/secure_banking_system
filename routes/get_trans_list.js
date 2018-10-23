var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');
var UserDetails = require('../models/bank');
const config = require("../config/config.json");
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

router.get("/", function(req, res){
    res.render("get_trans_list", {title: "Get Transactions in Range", trans: null})
});



router.post("/get_list", function(req, res){
    console.log(req.body.from, req.body.to);
    Trans.find({from: req.user.username}, function (err, trans) {
        if (err) {
            console.log(err);
            res.send("sunthin wong");
        }
        else {
            res.render("get_trans_list", {title: "Change Range",
                trans: trans});
        }
    })

});

module.exports = router;
