jbmi_app.controller('NBAController', function($scope, $uibModal, ProductFactory){

	$scope.nba_products = [];
	$scope.orderByField = 'year';
	$scope.reverseSort = true;

	$scope.displayGrid = function() {
		if (!$scope.showGrid) {
			$scope.showGrid = true;
		} else {
			$scope.showGrid = false;
		}
	}

	// Create a custom ID for each order (deprecated)
  function customID() {
      var id = ""
      var possible = "0123456789"

      for (var i=0; i < 12; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return id
  };

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

	$scope.open = function(product_id){

		ProductFactory.getOneProduct({product_id: product_id}, function(data){

			$scope.item = data;

			var modalInstance = $uibModal.open({
				templateUrl: 'expandedPhoto.html',
				controller: 'ModalInstanceController',
				size: 'lg',
				resolve: {
					item: function(){
						return $scope.item;
					}
				}
			})
		})
	};


	$scope.product_count = 4;

	function more_products() {
		$scope.product_count += 4;
	}

	$scope.showMoreProducts = function(){
		setTimeout(more_products, 500);
	};

	$scope.getNBAProducts();
	$scope.displayGrid();

});
