var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function(){
	return {
		show: function (req, res){
			Order.find({}, function (err, results){
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

			Order.find(new_filter,function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		add: function (req, res){
			var order = new Order(req.body);

			console.log("Order to be added to DB", order)
			Order.findOne({order_number: req.body.order_number}, function(err, single_entry){

				console.log("Searching first", order)
				if (err){
					console.log(err)
				} else if (single_entry == null && req.body.order_number != null) {
					order.save(function(err, result){
						if(err){
							console.log(err);
						} else {
							console.log("Order successfully added to DB:", result);
							res.json(result);
						}
					});
				} else {
					// console.log("Successfully retrieved single entry:", single_entry);
					res.json(single_entry);
				}
			})
			
		},
		remove: function (req, res){
			Order.remove({_id: req.body.order_id}, function(err){
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

