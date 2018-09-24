var express = require('express');
var router = express.Router();


var users_data = require('../models/users_data');



// login
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

router.get('/', function (req, res, next) {
    // users_data.find({"User ID": 76000}).then(function (doc) {
    //     console.log(doc);
    //     res.send(doc);
    // })q

    users_data.find( function (err,result) {
        if (err) throw err;
        console.log(result);
        res.send("result")

    });

});

module.exports = router;
