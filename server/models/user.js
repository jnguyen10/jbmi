var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

// Define our model
var userSchema = new Schema({
	'name': String,
 	'email': { type: String, unique: true, lowercase: true },
 	'password': String,
 	'created_at': { type: Date, default: Date.now }
});

// On 'Save' Hook, encrypt password
// Before saving model, run this function
userSchema.pre('save', function(next) {
 	// instance of user model
 	var user = this;

 	// generate a salt then run callback after salt has been created
 	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
     		return next(err);
		}
    	// hash (encrypt) our password using the salt
    	// Once password has been hashed run callback function
    	bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
    			return next(err);
     		}
      		// overwrite plain text password with encrypted password
			user.password = hash;
      		next();
    	})
 	})
});

// Add a new method to compare existing pw and candidate pw
userSchema.methods.comparePW = function(candidatePW, callback) {
	bcrypt.compare(candidatePW, this.password, function(err, isMatch) {
		if (err) { return callback(err) };

		callback(null, isMatch);
	})
}

// Create the model class
var userModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = userModelClass;
