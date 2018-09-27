


var express = require('express');
var router = express.Router();


var trasaction_db = require('../models/transactions_data');


router.post('/get_account_summary', function (req, res, next) {
    var user_id = req.body.user_id;

    // TODO: Query for all transactions on a user name, and return json.
});


module.exports = router;
