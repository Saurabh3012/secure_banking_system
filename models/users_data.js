var mongoose = require('mongoose');

var userAuthSchema = new mongoose.Schema({
    user_id: {type: String},
    password: {type: String}
    });

<<<<<<< HEAD
module.exports = mongoose.model('userAuthSchema', userAuthSchema, "users_data");

=======
module.exports = mongoose.model('userAuthSchema', userAuthSchema, "ids_n_passwords");
>>>>>>> 7a8c5f501cf61dc3a474939f5ca5424950759e3d
