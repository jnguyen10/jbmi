// We want to create a file that has the schema for our orders
// and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	order_number: String,
	order_items: Array,
	shipping: Number,
	opt_in: { type: String, default: 'N' },
	name: { type: String, default: null },
	email: { type: String, default: null },
	price: Number,
	created_at: { type: Date, default: Date.now }
})

// use the schema to create the model
// Note that creating a model creates the collection in the DB
// (makes the collection plural)
mongoose.model('Order', OrderSchema);

// Notice that we aren't exporting anything -- this is because
// this file will be run when we require it using our config file
// and then since the model is defined we'll be able to access it
// from our controlller.
