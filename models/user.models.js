var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// Define the schema for our user model
var userSchema = Schema({

    local: {
        email: String,
        password: String,
        nom: String,
        prenom: String,
    }
});

// Methods generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to our application
module.exports = mongoose.model('User', userSchema);