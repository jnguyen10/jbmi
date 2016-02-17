jbmi_app.controller('DashboardController', function($scope, $location, ProductFactory, BreakFactory){

	$scope.products = [];
	$scope.breaks = [];
	$scope.orders = [];
	$scope.product_count = -9;

	// PRODUCTS
	$scope.getProducts = function(){
		ProductFactory.getProducts(function(data){
			console.log("Getting All Products", data);
			$scope.products = data;
		})

	};

	$scope.editProductPage = function(product_id){
		$location.path('/product/edit/'+product_id);
	};

	$scope.removeProduct = function(product_id){
		ProductFactory.removeProduct(product_id, function(){
			$scope.getProducts();
		})
	};

	// BREAKS
	$scope.getAllBreaks = function () {
    	BreakFactory.getAllBreaks(function(data){
			console.log("Getting All Breaks", data);
			$scope.breaks = data;
		})
    };

    $scope.editBreakPage = function(break_id){
		$location.path('/break/edit/'+break_id);
	};

	$scope.removeBreak = function(break_id){
		BreakFactory.removeBreak(break_id, function(){
			$scope.getAllBreaks();
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

	$scope.more_products = function(){
		$scope.product_count -= 3;
	};

	// $scope.getCustomers = function(){
	// 	CustomerFactory.getCustomers(function(data){
	// 		console.log("Getting All Customers", data);
	// 		$scope.customers = data;
	// 	})
	// };



	// $scope.getOrders = function(){
	// 	OrderFactory.getOrders(function(data){
	// 		console.log("Getting All Orders", data);
	// 		$scope.orders = data;
	// 	})
	// };

	// $scope.getCustomers();
	$scope.getProducts();
	$scope.getAllBreaks();
	// $scope.getOrders();

});