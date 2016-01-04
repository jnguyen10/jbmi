jbmi_app.controller('DashboardController', function($scope, $location, ProductFactory){

	$scope.products = [];
	$scope.orders = [];
	$scope.product_count = -9;

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
	// $scope.getOrders();

});