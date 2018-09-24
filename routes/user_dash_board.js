var express = require('express');
var router = express.Router();


var users_data = require('../models/users_data');



router.post('/', function (req, res, next) {
    var user_name = req.body.user_name;

    // TODO: create a new table for transactions

    // TODO: query for the trasactions, and pass user_id to this page

    users_data.find({}).then(function (doc) {
        res.send(doc);
    })
});

module.exports = router;
