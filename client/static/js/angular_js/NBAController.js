jbmi_app.controller('NBAController', function($scope, $uibModal, ProductFactory){

	// $scope.search_options = ['Player', 'Manufacture', 'Brand', 'Card Type', 'Year'];
	$scope.nba_products = [];
	$scope.orderByField = 'year';
	$scope.reverseSort = true;

	// $scope.product_count = -3;

	$scope.getNBAProducts = function(){
		ProductFactory.getNBAProducts(function(data){
			console.log("Getting All Products", data);
			$scope.nba_products = data;
		})
	};

	$scope.searchNBAProducts = function(){
		// Pass in raw key and value as two separate key-value pairs

		ProductFactory.searchNBAProducts($scope.nba_search, function(data){
			$scope.nba_products = data;
		})
	};

	// $scope.getOneProduct = function(product_id){
	// 	console.log("route params:", product_id)
		
	// };

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
	$scope.getNBAProducts();
	// $scope.getOrders();

});