var mongoose = require('mongoose');
var Break = mongoose.model('Break');

module.exports = (function(){
	return {
		show: function (req, res){
			Break.find({}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		get_nba: function (req, res){
			Break.find({product_type: 'nba'}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		get_nfl: function (req, res){
			Break.find({product_type: 'nfl'}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		add: function (req, res){
			var card_break = new Break(req.body);

			card_break.save(function(err, result){
				if(err){
					console.log(err);
				} else {
					console.log("Order successfully added to DB");
					res.json(result);
				}

			})
		},
		single: function (req, res){
			Break.findOne({_id: req.body.break_id}, function(err, single_entry){
				if (err){
					console.log(err);
				} else{
					res.json(single_entry);
				}
			})
		},
		update: function (req, res){
			Break.update({_id: req.body._id}, req.body, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("Successful Update on DB");
					res.json();
				}
			})
		},
		update_break_qty: function (req, res){

			var items = req.body.order_items;

			// Counter used to determine the index position once inside the .findOne query
			var counter = -1;

			function update_qty(single) {
				var new_qty = individual.qty - items[counter]._quantity; // Original qty of product - qty of the order

				if (new_qty < 0){
					res.json({error_check: true});

				} else if (new_qty == 0){
					Break.update({_id: single._id}, {qty: new_qty, available: "Sold Out!"}, function(err){
						if (err){
							console.log(err);
						} else {
							console.log("Successful Removed from DB");
						}
					})
				} else {
					console.log("NEW QTY", new_qty)
					Break.update({_id: single._id}, {qty: new_qty}, function(err){

						if (err){
							console.log(err);
						} else {
							console.log("Successful Update from DB");
						}
					})
				}
			}

			for (var index in items) {

				var break_info = items[index]._data

				var pattern = new RegExp("^.*JBMIBreak.*$")
				var res_break = pattern.test(items[index]._name)

				if (res_break) {
					var individual = {};


					// Break.findOne gets called AFTER all other calls under the FOR LOOP (not just within the IF statement)
					// Therefore variables outside the .findOne query, such as the index and break_info._id is 'indexed' with the very last instance of the setting of the variable
					Break.findOne({_id: break_info._id}, function(err, single_entry){
						if (err){
							console.log(err);
						} else {
							individual = single_entry
							counter++
							update_qty(individual);
						}
					})
				}
			}

			res.json();
		},
		remove: function (req, res){

			Break.remove({_id: req.body.break_id}, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("Successful Removed from DB");
					res.json();
				}
			})

		} // end of methods
	} // end of return
})();
