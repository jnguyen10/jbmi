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
		'https://lh3.googleusercontent.com/2kb9_LkrkbR9UrvlsfQRqGyoZq3FdZgz-OJk1RkfdxQvPB1vruuazpNeh2R3flSmSQW_Es0KVV7iqAH5E2u_s3xo_9O5KNaJEjSU8pnKbZRX3PaaOI81WYPb_zZSwV01IGA2KV8w1EdwTWrjInuF1ulGjUJyCmv95WwHC6AHZ0ntu6rtQ4FdTHXMnxOHiHKJpF1aHomf8wiW5kFgPrCfmMRCGjUyHb6gQ4kASaYu5aBc_cMEQAwuymfU2GuM7tfHJiGmJBW4eeeqSNecnwVzwQtFdo3Y6NRgT4GWj_qEh6BWirpGlBqadmxZpR3maJk2VkBuL-WA2li7fFc0vOlPUHI7V-gOaaVDwaJ1VG4U1c9c4wiNMrioINQCFUCa47-jso7wdbPv4YyPxn-lMAEkHeZQJ_NkI0sSXMv-d-uuk8oyPkD10RCaeTRhb87iS1hW36ilV5yxnGivF0RSpZmu2-QVg8Hmcsglz8i_71FZ-ZnCkhw46zVNB_OYKhBkwqD-C0E957kGqWFpHwUlGCx5XhJJ1W9FUZVtHOyW8Nk7jaMTN6R5Gk83gPBlltDNJns2aIb3-6n2JRDX3Awzi3EPWQEud29DlNo=w650-h464-no',
		'https://lh3.googleusercontent.com/zwNTGKtAnRMf8amM6eNeToKq5IZrRW83dgvIBHlDVWAwrLkZBgJZaAm171msagQnbmqbD8WegItTRSjrHqVjV4rxxIOosukgzB4n2gzow0PTukVSkoUPYxDYHPXEmZFP_FDpRu-VAeS36Ffqii2m_dQOYKw-snmZhrYdtuUEx8GWKyHZ2wLQQ-LBibGwJmYHLZfLirUJI2C94s66brLVmI3sKTYZqhWc_cs3dGh57JrNsJbr_JO45zZ6AtFivYY-SAIGf1oCTs7nEkhEK8Y3R2Md5fOjTCflawYu6njsjjSL5_n-Zn5H75xDAFLXh3tfIswSNN4fzK0PD_QX96FrwPplCXYCUmmL0xpr5Q82oRc0skK-Oy7m6UOe1aof0eWqOV-V0RAw0h-tTVRuT269nbq3P_gKuxxZ1mK09SMOcHmuiUJ15GAV4h9IyCAYHrNenrH2320aG3o32NymQqr-DPPM8yEIkE3m7me_fW25a-NQa8JT-DB-j9WGk_HqWtuATZBVmnTqIk36WzVy55dndIFBUCBPGpFmhAzJ-guhfyO5Bisj6xHdpm04HglKoGFIa_DxqCVA1RKV9tQzuCibSjwt6NPJ8dw=w650-h464-no',
		'../img/signup_ad.png'
	];
	var product_type = ['signup', 'nba/breaks', 'nba/breaks', 'nba/breaks'];
	var names = ['Sign Up Today!', '2015-2016 Panini National Treasures', '2015-2016 Panini Gold Standard', 'Join Us Today!',];

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
