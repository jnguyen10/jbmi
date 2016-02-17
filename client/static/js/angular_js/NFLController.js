jbmi_app.controller('NFLController', function($scope, $uibModal, ProductFactory){

	$scope.nfl_products = [];
	$scope.orderByField = 'year';
	$scope.reverseSort = true;

	
	function customID() {
        var id = ""
        var possible = "0123456789"

        for (var i=0; i < 12; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id
    };

    $scope.product_count = 3;

	$scope.getNFLProducts = function(){
		ProductFactory.getNFLProducts(function(data){
			console.log("Getting All Products", data);
			// SET NEW CUSTOM ID FOR EACH ORDER
			for (each in data) {
				data[each].customID = customID();
			}
			$scope.nfl_products = data;

		})
	};

	$scope.searchNFLProducts = function(){

		// Pass in raw key and value as two separate key-value pairs
		ProductFactory.searchNFLProducts($scope.nfl_search, function(data){
			for (each in data) {
				data[each].customID = customID();
			}
			$scope.nfl_products = data;
		})
		
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

	$scope.more_products = function(product_id){
		$scope.product_count += 3;
	};

	// $scope.getCustomers();
	$scope.getNFLProducts();
	// $scope.getOrders();

});