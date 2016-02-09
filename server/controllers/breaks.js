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
		}
	}
})();

