var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bank = new Schema({
    username: String,
    account_no: Number,
    dob: String,
    funds: Number
});



module.exports = mongoose.model('Bank', Bank);