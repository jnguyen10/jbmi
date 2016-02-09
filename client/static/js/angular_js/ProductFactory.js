jbmi_app.factory('ProductFactory', function($http){
	var factory = {};
	var products = [];

	factory.getProducts = function(callback){
		$http.get('/products').success(function(output){
			products = output;
			console.log("Received Data from Server-Side:", products);
			callback(products);
		})
	};

	factory.searchProducts = function(data,callback){
		$http.post('/products/search_all', data).success(function(nba_output){
			callback(nba_output);
		})
	};

	factory.getNBAProducts = function(callback){
		$http.get('/products/get_nba').success(function(nba_output){
			callback(nba_output);
		})
	};

	factory.searchNBAProducts = function(data,callback){
		$http.post('/products/search_nba', data).success(function(nba_output){
			callback(nba_output);
		})
	};

	factory.getNFLProducts = function(callback){
		$http.get('/products/get_nfl').success(function(nfl_output){
			callback(nfl_output);
		})
	};


	factory.addProduct = function(info, callback){
		$http.post('/products/add', info).success(function(output){
			console.log("Received Data from Server-Side after Adding:", output);
			products.push(output);
			console.log("Pushed new data to orders array in factory:", products);
			callback(products);
		})
	};

	factory.getOneProduct = function(product_id, callback){
		//make sure product_id is an object
		console.log("PRODUCT ID FROM FACTORY", product_id)
		$http.post('/products/single',product_id).success(function (single_entry){
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