jbmi_app.controller('NFLController', function($scope, $uibModal, ProductFactory){

	// $scope.search_options = ['Player', 'Manufacture', 'Brand', 'Card Type', 'Year'];
	$scope.nfl_products = [];
	$scope.orderByField = 'year';
	$scope.reverseSort = true;

	// $scope.product_count = -3;

	$scope.getNFLProducts = function(){
		ProductFactory.getNFLProducts(function(data){
			console.log("Getting All Products", data);
			$scope.nfl_products = data;
		})
	};

	$scope.searchNFLProducts = function(){

		var key = $scope.nfl_search.field;
		var value = $scope.nfl_search.text;

		var new_filter = {};
		new_filter[key] = value;
		console.log(new_filter)
		console.log('get products:',$scope.nfl_search);
		
	};

	$scope.open = function(product_id){

		ProductFactory.getOneProduct({product_id: product_id}, function(data){

			console.log('data', data)
			$scope.item = data;
			console.log('inside callback', $scope.item)

			var modalInstance = $uibModal.open({
				templateUrl: 'expandedPhoto.html',
				controller: 'ModalInstanceController',
				size: 'lg',
				resolve: {
					item: function(){
						console.log('inside resolve', $scope.item)
						return $scope.item;
					}
				}
			})
		})
	};

	// $scope.getOrders = function(){
	// 	OrderFactory.getOrders(function(data){
	// 		console.log("Getting All Orders", data);
	// 		$scope.orders = data;
	// 	})
	// };

	// $scope.more_products = function(product_id){
	// 	$scope.product_count -= 3;
	// };

	// $scope.getCustomers();
	$scope.getNFLProducts();
	// $scope.getOrders();

});