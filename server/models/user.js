var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_at: { type: Date, default: Date.now }
})

UserSchema.plugin(passportLocalMongoose)

// use the schema to create the model
// Note that creating a model creates the collection in the DB
// (makes the collection plural)
mongoose.model('User', UserSchema); 

// Notice that we aren't exporting anything -- this is because
// this file will be run when we require it using our config file
// and then since the model is defined we'll be able to access it
// from our controlller.