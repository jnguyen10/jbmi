// We want to create a file that has the schema for our sendgrid API key
// and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

var SG_APISchema = new mongoose.Schema({
	api_key: String,
	// created_at: { type: Date, default: Date.now }
})

// use the schema to create the model
// Note that creating a model creates the collection in the DB
// (makes the collection plural)
mongoose.model('SG_API', SG_APISchema);

// Notice that we aren't exporting anything -- this is because
// this file will be run when we require it using our config file
// and then since the model is defined we'll be able to access it
// from our controlller.
