jbmi_app.factory('OrderFactory', function($http){
	var factory = {};
	var orders = [];

	factory.getOrders = function(callback){
		$http.get('/orders').success(function(output){
			orders = output;
			callback(orders);
		})
	};

	factory.searchOrders = function(data,callback){
		$http.post('/orders/search_all', data).success(function(orders){
			callback(orders);
		})
	};

	factory.addOrder = function(info, callback){
		$http.post('/orders/add', info).success(function(single_output){
			// Because we're just adding a single order and returing a single order, we don't need to store an array of orders when it returns to the confirmation page
			callback(single_output);
		})
	};

	factory.updateOrder = function(order_info, callback){
		$http.post('/orders/update', order_info).success(function(){
				console.log("UPDATE WAS SUCCESSFUL");
				callback();
			});
	};

	factory.removeOrder = function(order_id, callback){
		$http.post('/orders/remove', {order_id: order_id}).success(function(){
			console.log("SUCCESSFULLY REMOVED PRODUCT");
			callback();
		})
	}

	return factory

})
