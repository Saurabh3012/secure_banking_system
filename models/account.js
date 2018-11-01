var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    role: String,
    amount: Number, 
    name: String, 
    dob: String, 
    phone: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);