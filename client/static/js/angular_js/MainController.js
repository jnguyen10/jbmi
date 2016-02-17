jbmi_app.controller('MainController', function($scope, $rootScope, ProductFactory, BreakFactory){

	$scope.products = [];
	$scope.breaks = [];
	$scope.product_count = -3;

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	var players = ['court_kings', 'anthony_davis', 'kat_russ'];
	var product_type = ['nba/breaks', 'nba/breaks', 'nba/breaks']
	var names = ['2015-2016 Panini Court Kings - 2 Box Break', 'Anthony Davis - Box Topper', 'On-Card Rookie Autographs'];

	var slides = $scope.slides = [];

	$scope.addSlide = function(index){
		slides.push({
			image: 'img/'+players[index]+'.jpg',
			name: names[index],
			product_type: product_type[index]
		});
	}

	for (var i=0; i<names.length; i++){
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

	$scope.getBreaks = function(){
		BreakFactory.getAllBreaks(function(data){
			console.log("Getting All Products", data);
			$scope.breaks = data;
		})
	}

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
	$scope.getBreaks();
	// $scope.getOrders();

});