// TODO: this file gets triggered with a transaction is initiated.

// take amount, finish teh transaction.

// input : nothing (amount maybe)

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
