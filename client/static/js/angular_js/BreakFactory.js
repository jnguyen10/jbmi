jbmi_app.factory('BreakFactory', function($http){
	var factory = {};
	var breaks = [];

	factory.getAllBreaks = function(callback){
		$http.get('/breaks').success(function(output){
			products = output;
			console.log("Received Data from Server-Side:", products);
			callback(products);
		})
	};

	factory.getNBABreaks = function(callback){
		$http.get('/breaks/get_nba').success(function(nba_output){
			callback(nba_output);
		})
	};

	factory.getNFLBreaks = function(callback){
		$http.get('/breaks/get_nfl').success(function(nfl_output){
			callback(nfl_output);
		})
	};


	factory.addBreak = function(info, callback){
		$http.post('/breaks/add', info).success(function(output){
			console.log("Received Data from Server-Side after Adding:", output);
			breaks.push(output);
			console.log("Pushed new data to orders array in factory:", breaks);
			callback(breaks);
		})
	};

	factory.getOneBreak = function(break_id, callback){
		//make sure product_id is an object
		console.log("BREAK ID FROM FACTORY", break_id)
		$http.post('/breaks/single',break_id).success(function (single_entry){
			console.log("Received single product entry:", single_entry);
			callback(single_entry);
		})

	};

	factory.updateBreak = function(break_id, content, callback){
		// product_id passed in is an object with the "product_id" key
		// create a new key ('_id') and pass the product_id into the content object to pass as ONE JSON parameter
		var new_id = '_id'
		content[new_id] = break_id.break_id;
		

		$http.post('/breaks/update', content).success(function(){
				console.log("UPDATE WAS SUCCESSFUL");
				callback();
			});
	};

	factory.updateBreakQty = function(order_items, callback){
		
		$http.post('/breaks/update_break_qty', order_items).success(function(){
				console.log("UPDATE WAS SUCCESSFUL");
				callback();
			});
	};

	factory.removeBreak = function(break_id, callback){
		$http.post('/breaks/remove', {break_id: break_id}).success(function(){
			console.log("SUCCESSFULLY REMOVED PRODUCT");
			callback();
		})
	}

	return factory

})