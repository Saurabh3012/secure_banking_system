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
                        trans: trans,
                        bal : req.user.amount
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

router.post("/reject_transaction", function (req, res) {

    Trans.findByIdAndUpdate(
        req.body.transactionID,
        {status: 0},
        function (err, transaction) {
            if (err)
                return res.status(500).send(err);
            else{
                Trans.find( function(transactionError, allTransaction) {

                    res.render("account_summary_2", {
                        title: "Regular Employee Dashboard",
                        allTransaction: allTransaction,
                        userName: req.user.username,
                        userRole: req.user.role
                    })

                });
            }
        }
    );

});

router.post("/accept_transaction", function (req, res) {


    // console.log("This is how to print on console.");

    Trans.findOne(
        {_id: req.body.transactionID},
        function (err, executeTransaction) {
            if (err)
                return res.status(500).send(err);
            else {

                // To access transaction data:
                // executeTransaction.from

                Accounts.findOne(
                    {username: executeTransaction.from},
                    function (userError, userAccount) {
                        if(userError)
                            return res.status(500).send(userError);
                        else{
                            if(userAccount.amount>=executeTransaction.amount && executeTransaction.amount>0){

                                Accounts.findOne(
                                    {username: executeTransaction.from},
                                    function (senderError, senderAccount) {
                                        if(senderError)
                                            return res.status(500).send(senderError);
                                        else{
                                            var senderBalance=executeTransaction.amount*-1;
                                            Accounts.findByIdAndUpdate(
                                                senderAccount._id,
                                                { $inc: {amount: senderBalance}},
                                                function (updateBalanceError, updateBalance) {
                                                    if(updateBalanceError)
                                                        return res.status(500).send(updateBalanceError);
                                                }
                                            )
                                        }
                                    }
                                );

                                Accounts.findOne(
                                    {username: executeTransaction.to},
                                    function (receiverError, receiverAccount) {
                                        if(receiverError)
                                            return res.status(500).send(receiverError);
                                        else{
                                            Accounts.findByIdAndUpdate(
                                                receiverAccount._id,
                                                { $inc: {amount: executeTransaction.amount}},
                                                function (updateBalanceError, updateBalance) {
                                                    if(updateBalanceError)
                                                        return res.status(500).send(updateBalanceError);
                                                }
                                            )
                                        }
                                    }
                                );

                                Trans.findByIdAndUpdate(
                                    executeTransaction._id,
                                    {status: 1},
                                    function (markCompleteError, testTransaction) {
                                        if (markCompleteError)
                                            return res.status(500).send(markCompleteError);
                                    }
                                );


                            }
                            Trans.find( function(transactionError, allTransaction) {
                                res.render("account_summary_2", {
                                    title: "Regular Employee Dashboard",
                                    allTransaction: allTransaction,
                                    userName: req.user.username,
                                    userRole: req.user.role
                                })
                            });
                        }
                    }
                );
            }
        }
    );

});

module.exports = router;
