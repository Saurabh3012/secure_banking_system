var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    user_id : {type: String},
    sender_acc_num :  {type: Number},
    receiver_acc_num : {type: Number},
    amount : {type: Number},
    remarks : {type: String},
    status : {type: String}
});

module.exports = mongoose.model('transactionSchema', transactionSchema, "users_transactions");
