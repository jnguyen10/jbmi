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
		add: function (req, res){
			var order = new Order(req.body);

			console.log("Order to be added to DB", order)

			order.save(function(err, result){
				if(err){
					console.log(err);
				} else {
					console.log("Order successfully added to DB:", result);
					res.json(result);
				}

			})
		}
	}
})();

