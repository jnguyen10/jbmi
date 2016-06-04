jbmi_app.controller('MainController', function($scope, $rootScope, ProductFactory, BreakFactory){

	$scope.products = [];
	$scope.breaks = [];
	$scope.product_count = -3;

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	var image_links = [
		'https://lh3.googleusercontent.com/a1Oma_UuhEl_JDDDdwoplTSihl-WcungEWU9QeoJXOcppcFPzZOU46118mzRfF5owL-qfhcEje5ZPx7ML-NHKhA50AJ9qVGVTYOYEKp-nfgi-hhRBHyfpqKwUTarroq1wivtlwcUgkwOIQo2INH92gP2CmfGup5koqD5il_KJEsdqbDlFyySNg2PCVOv_I0CugZgP9QxiQouINBxiGa6DHdHXdIMMOkBr4P0P3ketwnPXaHjrheuFabw4ndexPaAspeqdqcnxWUg2z5lxLqmZY6uWZxj03DavCMQu3-kgI5a21kye--OBHnwxOZmJDhuJLF0NKBfkyCJOre01orSsCuzaX5eVqRcIGLrZk8aZQE7wniSmdrAKRh0C6RzaS69SYajOGcySsvH795LnlaUXunHV4J3cD29qNaoKLsTLfHnQ0q55cDFYiQCNnMB6jm-Mt25OidJe-ZN9zr5C49TsE__FqKYttR-aDBgo3J3_Y02VrkC16F_DW3JpOb76VZmyBfJXoqIAeURhQAcaGJScJ0S8Q_XSJUAuOEt1hngQTlOyr3RspUAGHfYe0JmkWZ8N3LR5yOrrmzgH1EEL9ZikbIAE82XkUc=s1298-no',
		'https://lh3.googleusercontent.com/lE36hK3E-J_hkrJof5Qd-3rzU9d3wJOy7bFbKr5QNFglj-bGtYJszmLM64QuXSG68oKwltSGAD6fi7_bVb-0vhNcRcIVPMy9C20laSmUbYuMnor1A9UZH_Zg9CXV3Xo5B5xqaRWADUjsLteJeLyijskpkqDf0_dBlnK70Rc73W8UhbToTET7-IkgsR-BXtWWErf_fy0_WKjMT7qNxfYvf4NK1UDCOgyxWN682GdYrIK18MmAy64HiaUGxwgRPPIX4ItZgscvacLBw7r6a-OC3EpPenMNDaD4HHWmVHsbIioP9mvDpteQ7um_0jTxXh2bcXNDmII6DMVc1hbKqj20HPqjIcSolV4hWf5n070goFP9abs-vGrUFaZDGrhh8EWAIQ_IPcGTh-sLsx2eAT0zpqrBeT6P63-Ynu60NXADD0vUe-5C6gQ2j6kcmZAyZnDLpVCANcnZ1mFIbCrNC1GTd_M_KUDdd8-RNSEdrJvDfA-aq62xE8oX-UZqCqVI9_TFnVxDr5dk_-mkGC1_myPzMMK5fh1m9R8qna3FCTOtFhtdyvxfN1E-6q1oNS60UPGtTPrS6qQNlnaRKygyNmStrsxSa2us-Hw=w650-h464-no',
		'https://lh3.googleusercontent.com/ACRBDcI_hGZmm2l3aj69GjJuFFIog_Na5YaCkVcksGYKnrTT3PMH1GaS3-IK4iS-xG6NZlv_P1gBFnYjXcNDWV1b7BZu8ya3MsNLcbI99YujMz8jZC7_Xz5dH7ikPvW9k7BMxyBD1Byh5Z5ve5ybucmFqwlDvA7pHtY21AooPE771_AHxJq4CLD-xYRClAsBORDfdocP--bTFXq1Dex2cHFEdR5xxyicDptKNP9AZDrvh1vuUUKMMsEhZDf5fIHChRUwpKfVxQKNuHhg7b269gGGNv71Fe5H9dy8F2PpfR8IUY0QsmbIKhWZ2JN0_GJQ7NZKV3zKKREb11xE1XnSTiEbksqnuQVTkKqDUe5fSIYbfpBiViF-IzWXUYlEpwTzNH6fG7RrBdNn1koSqE5maGmfhcUwJtfLutrVzIKMNCyptuuGWLPrtD_EC50gh1vM85zPQVLAyGKpjZKrMrYlMr4gPWn50RnpI-SIefWmDDv61oH7ti9x3LkqoQO_gYAqdFjQviZSusU2eTDoJBq0Y3fjdEhqK1bBSP6dJkUmAqdSzSiqDLbCyysRIwBw6oJQv-3P3amcinUCgmLAJ6Wj5FaQYxLPCM0=w650-h464-no',
		'https://lh3.googleusercontent.com/k-NIXgvZPw2Vx7yeQzlhk72Rdx9pjB77ZLQptwjfghWSjFJMJdNq0XMiL0X5joL8Q3Qd_IRf6kQd7LlEMj13Yyd6TLW3_wIaVU4qCbE4b1sVJ89vSu1JuxN5RcYFkxghe9C4dUJuReTBtBLow-uYv19l4x_T7EB567JPyowiY2vFvolbtIV6j-5G-K1_r65TrAAnTLKCcKfuE6vpYWRYwHLvZhIyFRS0DLv1PREiavzwFCh34f06Wv1piQSudIjGaJkJ1DjWoI1FuNPwDW3LhJKEmvM-4g6aa9BqUyrqEt7iJbTOdVjA_6eJdi2kOqtp1yqMuqu5YndEgXqcfHxov5yI9YtBBi1KuXGzz08-sANhObJWYHYCwzWRCy0dwXHAFmM19ubdaMxWh0rDcp3aNVetas9Vx7eFFCWnrZM68zg7KSnCr7O1eOEEPMU2uG4dr44L8Zm0-31TojxzFwC1Mvs0lZV1XFJySFhrKG-9hOzKOq0s4x3GPNYq7KBM4UREcrjtRdOBVShODCLKezVkz0jhYFtDCE6n4mjvBSfXnpobm4ACiOf0OvrfVRSfBsy0I7xXVo_HqmmmjxkwK8PBVRUs4JHxCgw=w825-h638-no',
	];
	var product_type = ['nba/breaks', 'nba/breaks', 'nba/breaks', 'nba/breaks'];
	var names = ['3 x Panini Mixer Box Break', '2015-2016 Panini National Treasures', '2015-2016 Panini Gold Standard', '2014-2015 Panini Gold Standard',];

	var slides = $scope.slides = [];

	$scope.addSlide = function(index){
		slides.push({
			// image: 'img/'+players[index]+'.jpg',
			image: image_links[index],
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

})
