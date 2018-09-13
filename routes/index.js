var express = require('express');
var router = express.Router();


var users_data = require('../models/users_data');



router.post('/', function (req, res, next) {
    var user_name = req.body.user_name;
    var password = req.body.password;

    users_data.find().then(function (doc) {
        res.send(doc);
    })
});

router.get('/', function (req, res, next) {
    // users_data.find({"User ID": 76000}).then(function (doc) {
    //     console.log(doc);
    //     res.send(doc);
    // })

    users_data.find({user_id: "76000"}, function (err,result) {
        if (err) throw err;
        console.log(result)
        res.send("ghanta")

    });

});

module.exports = router;
