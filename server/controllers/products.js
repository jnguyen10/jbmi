var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function(){
	return {
		show: function (req, res){
			Product.find({}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		search_all: function (req, res){
			console.log(req.body)

			// create an object with field key and regex search text
			var field = req.body.field;
			var text = new RegExp(req.body.text,'i');
			var new_filter = {};
			new_filter[field] = text;
			console.log(new_filter)

			Product.find(new_filter,function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		get_nba: function (req, res){
			Product.find({product_type: 'nba', available: 'Y'}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		search_nba: function (req, res){
			console.log(req.body)

			// create an object with field key and regex search text
			var field = req.body.field;
			var text = new RegExp(req.body.text,'i');
			var new_filter = {};
			new_filter[field] = text;
			console.log(new_filter)

			Product.find(new_filter,function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		get_nfl: function (req, res){
			Product.find({product_type: 'nfl', available: 'Y'}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		add: function (req, res){
			var product = new Product(req.body);

			console.log("Product to be added to DB", product)

			product.save(function(err, result){
				if(err){
					console.log(err);
				} else {
					console.log("Product successfully added to DB:", result);
					res.json(result);
				}

			})
		},
		single: function (req, res){
			console.log("Server-side controller ID", req.body.product_id)
			Product.findOne({_id: req.body.product_id}, function(err, single_entry){
				if (err){
					console.log(err);
				} else{
					// console.log("Successfully retrieved single entry:", single_entry);
					res.json(single_entry);
				}
			})
		},
		update: function (req, res){			
			Product.update({_id: req.body._id}, req.body, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("Successful Update on DB");
					res.json();
				}
			})
		},
		remove: function (req, res){
			
			Product.remove({_id: req.body.product_id}, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("Successful Removed from DB");
					res.json();
				}
			})
			
		} //end of methods
	} //end of return
})();

