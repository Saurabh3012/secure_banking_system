// see all corresponding external employee requests.
var express = require('express');
var router = express.Router();

var users_transactions = require('../models/users_transactions');

router.post('/internal_dashboard', function (req, res, next) {
    var user_id = req.body.user_id;
});

module.exports = router;

