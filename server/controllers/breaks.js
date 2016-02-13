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
		add: function (req, res){
			var card_break = new Break(req.body);

			console.log("Order to be added to DB", card_break)

			card_break.save(function(err, result){
				if(err){
					console.log(err);
				} else {
					console.log("Order successfully added to DB:", result);
					res.json(result);
				}

			})
		},
		single: function (req, res){
			console.log("Server-side controller ID", req.body.break_id)
			Break.findOne({_id: req.body.break_id}, function(err, single_entry){
				if (err){
					console.log(err);
				} else{
					// console.log("Successfully retrieved single entry:", single_entry);
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
		update_qty: function (req, res){
			console.log("Update Request", req.body);
			Product.findOne({name: req.body.product_name}, function(err, single_entry){
				if (err){
					console.log(err);
				} else{
					console.log("Single Entry in Server-Side Controller", single_entry);

					var new_qty = single_entry.qty - req.body.qty; // Original qty of product - qty of the order

					if (new_qty < 0){
						res.json({error_check: true});

					} else if (new_qty == 0){
						console.log(new_qty, "qty.  Time to delete product.");
						Product.remove({name: req.body.product_name}, function(err){
							if (err){
								console.log(err);
							} else {
								console.log("Successful Removed from DB");
								res.json();
							}
						})
					} else{
						console.log("NEW QTY", new_qty)
						Product.update({name: req.body.product_name}, {qty: new_qty}, function(err, single_entry){
							if (err){
								console.log(err);
							} else {
								console.log("Successful Update from DB");
								res.json();
							}
						})
					}

					
				}
			})
		}
	}
})();

