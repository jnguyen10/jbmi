// We want to create a file that has the schema for our products
// and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	product_type: String,
	year: String,
	name: String,
	brand: String,
	card_num: String,
	card_type: String,
	img_url_front: String,
	img_url_back: String,
	price: Number,
	beckett_value: Number,
	description: String,
	available: { type: String, default: 'Y'},
	created_at: { type: Date, default: Date.now }
})

// use the schema to create the model
// Note that creating a model creates the collection in the DB
// (makes the collection plural)
mongoose.model('Product', ProductSchema);

// Notice that we aren't exporting anything -- this is because
// this file will be run when we require it using our config file
// and then since the model is defined we'll be able to access it
// from our controlller.
