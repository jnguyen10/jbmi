jbmi_app.controller('EditController', function($scope, $routeParams, $location, ProductFactory){

	$scope.getOneProduct = function(){
		console.log("route params:", $routeParams)
		ProductFactory.getOneProduct($routeParams, function(data){
			console.log('data', data)
			$scope.item = data;
		})
	};

	$scope.updateProduct = function(){
		console.log($scope.new_product);

		ProductFactory.updateProduct($routeParams, $scope.new_product, function(){
			$location.path('/admin/dashboard/add_products');
			// $scope.new_product = {};
		})

		
	};

	// new method to create a range with two end points for the quantity
	$scope.range = function(min, max, step){
		step = step || 1;
		var input = [];
		for (var i = min; i <= max; i += step){
			input.push(i);
		}
		// console.log("RANGE:",input);
		return input;
	};

	$scope.getOneProduct();

});