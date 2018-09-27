// TODO: this file gets triggered with a transaction is initiated.
var express = require('express');
var router = express.Router();

var users_transactions = require('../models/users_transaction');

router.post('/external_transaction', function (req, res, next) {
    var user_id = req.body.user_id;

<<<<<<< HEAD
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

module.exports = router;
=======
// output: status, entry in corresponding table

var express = require('express');
var router = express.Router();


var users_data = require('../models/transactions_data');


// takes user_id, queries the transactions table and gives out the list of transactions. 
router.post('/', function (req, res, next) {
    var user_name = req.body.user_name;
    var password = req.body.password;

    users_data.findOne({'user_id': user_name}).then(function (doc) {
        // comapre the password.

        if(doc.password == password){
            console.log(doc);
            res.send("successful");
        }
        else {
            console.log(doc);
            res.send("Authentication failure " + doc.password + " " + doc.user_id);
        }
        // if ok, then redirect to account summary.

        // res.send(doc);
    }).catch(function (e) {
        console.error(e);
    })
});


module.exports = router;
>>>>>>> 7a8c5f501cf61dc3a474939f5ca5424950759e3d
