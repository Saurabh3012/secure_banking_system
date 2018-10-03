var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    from: String,
    to: String,
    amount:  Number,
    status: Number,
    timestamp: Date,
});


module.exports = mongoose.model('Transaction', Transaction);