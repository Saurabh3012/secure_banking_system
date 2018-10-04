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

    if (req.user){
        if (req.user.role == 1) {
            res.render("account_summary", {
                title:"Account Summary"
            })
        }
        else {
            // TODO: merchant payee (user role 4)
            res.render("make_transaction", {
                title: "Make a transaction"
            })
        }
    }

});


//create bank account
router.post("/", function (req, res) {

    res.send(req.user);

});


router.post("/do_transaction", function (req, res) {
    res.redirect("/make_transaction");
    console.log(req.toAccount + req.amount);
});

module.exports = router;
