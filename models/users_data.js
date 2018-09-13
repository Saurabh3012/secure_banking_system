var mongoose = require('mongoose');


var userAuthSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    password: {type: String, required: true}
    });

module.exports = mongoose.model('userAuthSchema', userAuthSchema, "users_data");
