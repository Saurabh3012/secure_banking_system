var express = require('express');
var router = express.Router();

var users_transactions = require('../models/users_transaction');

router.get('/', function(res,req) {
   var user_id = req.body.user_id;
   users_transactions.find({'user_id': user_id},function (err,doc) {
       if(err) {
//           res.render('/', );
           console.error(err);
           res.json({
               message: "Data fetching unsuccessful",
               success: false
           });
       }
       else
           res.json({
               users_transactions: doc,
               success: true
           });
   })

var users_data = require('../models/users_data');


router.post('/external_transaction', function (req, res, next) {
    var user_id = req.body.user_id;

    // TODO: create a new table for transactions

    // TODO: query for the transactions, and pass user_id to this page

    // TODO: Crate a tab;e for account numbers.
    var sender_acc = req.body.sender_acc_num;
    var receiver_acc = req.body.receiver_acc_num;
    var amount = req.body.amount;
    var remarks = req.body.remarks;
    var status = "Pending";
    users_transactions.insertOne(user_id, sender_acc, receiver_acc, amount, remarks, status);
});

// router.post('/external_transaction', function (req, res, next) {
//
//     // TODO: create a new table for transactions
//
//     // TODO: query for the transactions, and pass user_id to this page
//
//     // TODO: Crate a tab;e for account numbers.
//     var sender_acc = req.body.sender_acc_num;
//     var receiver_acc = req.body.receiver_acc_num;
//     var amount = req.body.amount;
//     var remarks = req.body.remarks;
//     var status = "Pending";
//     users_transactions.insertOne(user_id, sender_acc, receiver_acc, amount, remarks, status);
// });

// some changes

module.exports = router;
