var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

module.exports = (function(){
	return {
		show: function (req, res){
			Blog.find({}, function (err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		add: function (req, res){
			var blog = new Blog(req.body);

			console.log("Order to be added to DB", blog)

			blog.save(function(err, result){
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

