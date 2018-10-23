var express = require('express');
var router = express.Router();


var Bank = require("../models/bank");
var transaction = require('../models/transaction');

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

    transaction.find(function (err, result) {

        if (err) {
            console.error(err);
            res.send("Something went wrong")
        }else{
            res.send(result)
        }

    });

});


//create bank account
router.post("/", function (req, res) {

    res.send(req.user);

});

// router.put("/accept", function (req, res) ) {

// }

// router.put("/reject", function (req, res) ) {
//     transaction.findByIdAndUpdate(
//         req.params._id,
//         {status:0},
//         (err, todo) => {
//             if (err) return res.status(500).send(err);
//                 return res.send(transaction);
//         }
//     )
// }

module.exports = router;
