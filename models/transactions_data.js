var mongoose = require('mongoose');


var transactions = new mongoose.Schema({
    user_id: {type: String}
});

module.exports = mongoose.model('transactionsSchema', transactions, "transaction_records");

var transactionsInRange = new mongoose.Schema({
    user_id: {type: String},
    from_date: {type: String},
    to_date: {type: String}
});

module.exports = mongoose.model('trainsactionsInRangeSchema', transactionsInRange, 'trasaction_records');
