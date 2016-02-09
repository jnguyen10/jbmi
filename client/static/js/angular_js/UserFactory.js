jbmi_app.factory('UserFactory', function($http){
	var factory = {};
	var users = [];

	// factory.getProducts = function(callback){
	// 	$http.get('/products').success(function(output){
	// 		products = output;
	// 		console.log("Received Data from Server-Side:", products);
	// 		callback(products);
	// 	})
	// };


	factory.addUser = function(info, callback){
		$http.post('/users/add', info).success(function(output){
			console.log("Received Data from Server-Side after Adding:", output);
			users.push(output);
			console.log("Pushed new data to orders array in factory:", users);
			callback(users);
		})
	};

	factory.loginUser = function(info, callback){
		//make sure product_id is an object
		console.log("USER ID and PW", info)
		$http.post('/users/login', info).success(function (single_entry){
			console.log("Received single product entry:", single_entry);
			callback(single_entry);
		})

	};

	factory.updateProduct = function(product_id, content, callback){
		// product_id passed in is an object with the "product_id" key
		// create a new key ('_id') and pass the product_id into the content object to pass as ONE JSON parameter
		var new_id = '_id'
		content[new_id] = product_id.product_id;
		

		$http.post('/products/update',content).success(function(){
				console.log("UPDATE WAS SUCCESSFUL");
				callback();
			});
	};

	factory.removeProduct = function(product_id, callback){
		$http.post('/products/remove', {product_id: product_id}).success(function(){
			console.log("SUCCESSFULLY REMOVED PRODUCT");
			callback();
		})
	}

	return factory

})