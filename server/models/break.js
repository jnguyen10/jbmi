// We want to create a file that has the schema for our breaks
// and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

var BreakSchema = new mongoose.Schema({
	product_type: String,
	year: String,
	title: String,
	img_url: String,
	qty: Number,
	price: Number,
	description: String,
	available: { type: String, default: 'In Stock' },
	created_at: { type: Date, default: Date.now }
})

// use the schema to create the model
// Note that creating a model creates the collection in the DB
// (makes the collection plural)
mongoose.model('Break', BreakSchema);

// Notice that we aren't exporting anything -- this is because
// this file will be run when we require it using our config file
// and then since the model is defined we'll be able to access it
// from our controlller.
