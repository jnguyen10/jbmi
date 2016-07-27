jbmi_app.controller('ProductController', function($scope, $location, ProductFactory){

	$scope.products = [];
	$scope.product_count = -9;

	$scope.getProducts = function(){
		ProductFactory.getProducts(function(data){
			$scope.products = data;
		})

	};

	$scope.searchProducts = function(){
		// Pass in raw key and value as two separate key-value pairs
		ProductFactory.searchProducts($scope.all_search, function(data){
			$scope.products = data;
		})
	};


	$scope.addProduct = function(){
		ProductFactory.addProduct($scope.new_product, function(data){
			$scope.products = data;
			$scope.new_product = {};
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

	$scope.getProducts();

});
