jbmi_app.controller('MainController', function($scope, $rootScope, ProductFactory, BreakFactory, UserFactory){

	$scope.products = [];
	$scope.breaks = [];
	$scope.product_count = -3;

	// Always check to see if user is authenticated by checking to see if a token is present in localStorage
	(function() {
		if (localStorage.getItem('token')) {
			var token = localStorage.getItem('token')
			$rootScope.isUserLoggedIn = true;
			UserFactory.findUser(token, function(userData){
				$rootScope.singleUser = userData.userDataFromServer;
			})
		}
		else {
			$rootScope.singleUser = {};
			$rootScope.isUserLoggedIn = false;
		}
	})();


	// ############ Carousel ###############
	$scope.myInterval = 4000;
	$scope.noWrapSlides = false;
	var image_links = [
		'../img/jbmi_banner.png',
		'../img/panini_nt.jpg',
		'../img/panini_gs.jpg',
		'../img/signup_ad.png'
	];
	var product_type = ['signup', 'nba/breaks', 'nba/breaks', 'signup'];
	var names = ['Sign Up Today!', 'PAST BREAKS: 2015-2016 Panini National Treasures', 'PAST BREAKS: 2015-2016 Panini Gold Standard', 'Join Us Today!',];

	var slides = $scope.slides = [];

	$scope.addSlide = function(index){
		slides.push({
			image: image_links[index],
			name: names[index],
			product_type: product_type[index]
		});
	}

	for (var i=0; i<names.length; i++){
		$scope.addSlide(i);
	}

	// ######## Card Links ##########
	$scope.card_names = ['NBA', "NFL", "MLB", "NHL", "Breaks", "Blogs"];


	$scope.getProducts = function(){
		ProductFactory.getProducts(function(data){
			$scope.products = data;
		})
	};

	$scope.getBreaks = function(){
		BreakFactory.getAllBreaks(function(data){
			$scope.breaks = data;
		})
	}

	$scope.getProducts();
	$scope.getBreaks();

})
