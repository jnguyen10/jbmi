jbmi_app.controller('UserController', function($scope, $routeParams, $location, UserFactory){

	$scope.users = []

	$scope.addUser = function(){
		console.log($scope.new_user)
		UserFactory.addUser($scope.new_user, function(data){
			console.log("Getting User Data Back", data);
			$scope.users = data;
		})

	};

	$scope.loginUser = function(){
		UserFactory.loginUser($scope.new_user, function(data){
			console.log("Getting All Products", data);
			$scope.users = data;

			$location.path('/admin/dashboard/'+data._id)
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
	// $scope.getUsers();
	// $scope.getOrders();

});