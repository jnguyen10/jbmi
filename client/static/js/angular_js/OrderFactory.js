jbmi_app.factory('OrderFactory', function($http){
	var factory = {};
	var orders = [];

	factory.getOrders = function(callback){
		$http.get('/orders').success(function(output){
			orders = output;
			console.log("Received Data from Server-Side:", orders);
			callback(orders);
		})
	};

	factory.searchOrders = function(data,callback){
		$http.post('/orders/search_all', data).success(function(orders){
			callback(orders);
		})
	};

	factory.addOrder = function(info, callback){
		$http.post('/orders/add', info).success(function(output){
			console.log("Received Data from Server-Side after Adding:", output);
			orders.push(output);
			console.log("Pushed new data to orders array in factory:", orders);
			callback(orders);
		})
	};

	// factory.updateProduct = function(product_id, content, callback){
	// 	// product_id passed in is an object with the "product_id" key
	// 	// create a new key ('_id') and pass the product_id into the content object to pass as ONE JSON parameter
	// 	var new_id = '_id'
	// 	content[new_id] = product_id.product_id;
		

	// 	$http.post('/products/update',content).success(function(){
	// 			console.log("UPDATE WAS SUCCESSFUL");
	// 			callback();
	// 		});
	// };

	factory.removeOrder = function(order_id, callback){
		$http.post('/orders/remove', {order_id: order_id}).success(function(){
			console.log("SUCCESSFULLY REMOVED PRODUCT");
			callback();
		})
	}

	return factory

})