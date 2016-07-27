jbmi_app.controller('EditController', function($scope, $routeParams, $location, ProductFactory, BreakFactory){

	$scope.getOneProduct = function(){
		ProductFactory.getOneProduct($routeParams, function(data){
			if (data) {
				$scope.item = data;
			}
		})
	};

	$scope.updateProduct = function(){
		ProductFactory.updateProduct($routeParams, $scope.new_product, function(){
			$location.path('/admin/dashboard/add_products');
			// $scope.new_product = {};
		})
	};

	$scope.getOneBreak = function(){
		BreakFactory.getOneBreak($routeParams, function(data){
			if (data) {
				$scope.item = data;
			}

		})
	};

	$scope.updateBreak = function(){
		BreakFactory.updateBreak($routeParams, $scope.new_break, function(){
			$location.path('/admin/dashboard/add_breaks');
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
		
		return input;
	};

	$scope.getOneProduct();
	$scope.getOneBreak();

});
