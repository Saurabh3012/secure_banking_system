var mongoose = require('mongoose');

var userAuthSchema = new mongoose.Schema({
    user_id: {type: String},
    password: {type: String}
    });

module.exports = mongoose.model('userAuthSchema', userAuthSchema, "users_data");

