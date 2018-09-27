var express = require('express');
var router = express.Router();


var users_data = require('../models/users_data');



// login takes user id and password.
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




router.post('/login', function (req, res, next) {
    var user_name = req.body.user_id;
    var pwd = req.body.password;

    // compare the password.
    users_data.find({'user_id': user_name, 'password': pwd}, function(err, user){
        if(err)
        {
            console.log(err);
            return res.status(500).send();
        }
        if(!user)
        {
            console.log("Invalid Username or Password");
            return console.status(404).send();
        }
        // if ok, then redirect to account summary.
        return res.redirect('./routes/user_dash_board');
    }).catch(function (e) {
        console.error(e);
    })
});

module.exports = router;
