var express = require('express');
var router = express.Router();


var users_data = require('../models/users_data');



router.post('/', function (req, res, next) {
    var user_name = req.body.user_name;
    var password = req.body.password;

    // res.send(user_name + " " + password);

    users_data.find({}).then(function (doc) {
        res.send(doc);
    })
});

module.exports = router;
