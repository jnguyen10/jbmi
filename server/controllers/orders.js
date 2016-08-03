var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var SG_API = mongoose.model('SG_API');

var sendEmail = function(order_info) {
	SG_API.find({}, function(err, result){
		if (err) {
			console.log(err);
		} else {

			var sg_api_key = result[0].api_key;
			// JBMI_Customer_Receipt API Key
			var sendgrid = require('sendgrid')(sg_api_key)

			console.log("email sent")
			console.log(order_info);
			console.log("order item data", order_info.order_items[0]._data)

			var html_string = "";
			var total_items = order_info.order_items;

			for (each in total_items) {
				html_string = html_string + "<tr><td>" + total_items[each]._name + "</td> <td align='center'>" + total_items[each]._quantity + " </td> <td>$" + total_items[each]._price.toFixed(2) + "</td></tr>"
			}

			var payload = {
				to: order_info.email,
				from: 'jbmoderninserts@gmail.com',
				subject: 'JB Modern Inserts - Order Number: #' + order_info.order_number,
				html: "<div style='font-family: Avenir, sans-serif'><h1>Your Recent Order from JB Modern Inserts!</h1> <p>We would like to thank you for your recent purchase from JB Modern Inserts!  Below is a summary of your purchase.  Please respond or email us back at <a href='mailto:jbmoderninserts@gmail.com'>jbmoderninserts@gmail.com</a> with any questions or comments.  Thank you and please stop by again!</p> <br> <h3>JBMI Order Summary: Order #" + order_info.order_number + " </h3><table><thead> <tr> <th>Product</th> <th>Quantity</th><th>Total</th> </tr> </thead><tbody> " + html_string + " <tr><td align='right' style='font-weight: bold'>Shipping:</td><td></td><td> $" + order_info.shipping.toFixed(2) + " </td></tr><tr> <td align='right' style='font-weight: bold'>Order Total:</td><td></td><td style='font-weight: bold'> $" + order_info.price.toFixed(2) + " </td> </tr> </tbody></table><br><h4>Follow Us! Tell us what you'd like to see in our next break!</h4><a href='https://www.youtube.com/channel/UCYAXdoijV2VUP-rmB-M9cnw'>YouTube</a> | <a href='https://twitter.com/jbmoderninserts'>Twitter</a> | <a href='https://www.instagram.com/jb_moderninserts/'>Instagram</a></div>"
			};

			sendgrid.send(payload, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log('Email Sent Successfully')
				}
			})
		}
	})
}

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
			// create an object with field key and regex search text
			var field = req.body.field;
			var text = new RegExp(req.body.text,'i');
			var new_filter = {};
			new_filter[field] = text;

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

			Order.findOne({order_number: req.body.order_number}, function(err, single_entry){
				if (err){
					console.log(err)
				} else if (single_entry == null && req.body.order_number != null) {
					order.save(function(err, result){
						if(err){
							console.log(err);
						} else {
							console.log("Order successfully added to DB");
							if (req.body.email && req.body.name) {
								console.log("sending email");
								sendEmail(req.body);
							}
							res.json(result);
						}
					});
				} else {
					res.json(single_entry);
				}
			})

		},
		update: function (req, res){
			Order.update({order_number: req.body.order_number}, req.body, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("Successful Update on DB");
					sendEmail(req.body);
					res.json();
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
