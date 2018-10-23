var express = require('express');
var router = express.Router();


var Bank = require("../models/bank");
var Trans = require('../models/transaction')


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

        Trans.find({from: req.user.username}, function (err, trans) {
            if (err){
                console.log(err);
                res.send('something went wrong')
            }
            else {

                if (req.user.role == 1) {

                    res.render("account_summary", {
                        title:"Account Summary",
                        trans: trans
                    })
                }
                else if (req.user.role == 2 || req.user.role == 3) {

                    Trans.find( function(transactionError, allTransaction) {

                        res.render("account_summary_2", {
                            title:"Regular Employee Dashboard",
                            allTransaction: allTransaction,
                            userName: req.user.username,
                            userRole: req.user.role
                        })

                    });
                }
                // else if (req.user.role == 3) {
                //
                //     Trans.find( function(transactionErrors, allTransactions) {
                //
                //         res.render("account_summary_3", {
                //             title:"External User Dashboard.",
                //             allTransactions: allTransactions,
                //             userName: req.user.username
                //         })
                //
                //     });
                // }
                else if (req.user.role == 4) {
                    res.render("account_summary_4", {
                        title: "External User Dashboard.",
                        trans: trans
                    })
                }
                else {
                    // TODO: merchant payee (user role 4)
                    res.render("make_transaction", {
                        title: "Make a transaction",
                        trans: trans
                    })
                }
            }
        });


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
