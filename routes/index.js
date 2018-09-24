var express = require('express');
var router = express.Router();

var users_data = require('../models/users_data');

// login
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
        return res.redirect('/user_dash_board', user_name);
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
