jbmi_app.controller('MainController', function($scope, ProductFactory){

	$scope.customers = [];
	$scope.products = [];
	$scope.orders = [];
	$scope.product_count = -3;

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	var players = ['curry', 'cooper', 'posey', 'pavelski', 'media'];
	var product_type = ['nba', 'nfl', 'mlb', 'nhl', 'media']
	var names = ['Stephen Curry - NBA', 'Amari Cooper - NFL', 'Buster Posey - MLB', 'Joe Pavelski - NHL', 'Entertainment/Non-Sports Collectibles'];

	var slides = $scope.slides = [];

	$scope.addSlide = function(index){
		slides.push({
			image: 'img/'+players[index]+'.jpg',
			name: names[index],
			product_type: product_type[index]
		});
	}

	for (var i=0; i<5; i++){
		$scope.addSlide(i);

	}

	// $scope.getCustomers = function(){
	// 	CustomerFactory.getCustomers(function(data){
	// 		console.log("Getting All Customers", data);
	// 		$scope.customers = data;
	// 	})
	// };

	$scope.getProducts = function(){
		ProductFactory.getProducts(function(data){
			console.log("Getting All Products", data);
			$scope.products = data;
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
	$scope.getProducts();
	// $scope.getOrders();

});