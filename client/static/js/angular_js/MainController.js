jbmi_app.controller('MainController', function($scope, $rootScope, ProductFactory, BreakFactory){

	$scope.products = [];
	$scope.breaks = [];
	$scope.product_count = -3;

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	var image_links = [
		'https://lh3.googleusercontent.com/6MxLf9j64KWX0-NRFpu_3tHfAUHJFgIVQro90lPzz77pbWAuRidGd3oMUWEKt4YF1Zoici-rbMUP_zb2DOSIFNXeUZ8xt4dZp73qDgmHdFI77w2UHDkqNGwz0M0MeXthBL2IOuLnDUXeqssxDTNM4HHCNIF8caOEyJdn_la6l2HdT3iU3JY9n8p5JcbmRG-47KoSj9qSnXGp4aFEY1-Sj4A12VnI7w3DZRAclLW9LyttZAnStE1FPwKGz_rAtwjuPt9Vf1mVMOamC4s7ycCJI52NJU_K7pYVYxO5ztAyova2yfR3xz35IPTHFApUYC7kNyn7O-SZmj6_xj6wsum4m4cTz6tTKtBwdkgMahiD5X862LUOOduwZPDs7kjX6JyKOceE3gTDjT0fkcxjlPoJACvIH8j0hwiwgS7ysj2pggjTyrlZ81gklwIc7R4LNdOprJuP3CWBlGjOPD_MsrLD5U-yQpN_5wEGhkUbR229uzlzsAmKXE7gOdhrw2_hzSJIOcvYs_iiIz1XV0FDCf1SIqz1GiWUjiGQXX7YWjQCFruf2le3_f7TfhSvr2DFmpCFhX_wKgxqBP20moVvZQ62T96CINWUDb8=w1602-h1204-no',
		'https://lh3.googleusercontent.com/k-NIXgvZPw2Vx7yeQzlhk72Rdx9pjB77ZLQptwjfghWSjFJMJdNq0XMiL0X5joL8Q3Qd_IRf6kQd7LlEMj13Yyd6TLW3_wIaVU4qCbE4b1sVJ89vSu1JuxN5RcYFkxghe9C4dUJuReTBtBLow-uYv19l4x_T7EB567JPyowiY2vFvolbtIV6j-5G-K1_r65TrAAnTLKCcKfuE6vpYWRYwHLvZhIyFRS0DLv1PREiavzwFCh34f06Wv1piQSudIjGaJkJ1DjWoI1FuNPwDW3LhJKEmvM-4g6aa9BqUyrqEt7iJbTOdVjA_6eJdi2kOqtp1yqMuqu5YndEgXqcfHxov5yI9YtBBi1KuXGzz08-sANhObJWYHYCwzWRCy0dwXHAFmM19ubdaMxWh0rDcp3aNVetas9Vx7eFFCWnrZM68zg7KSnCr7O1eOEEPMU2uG4dr44L8Zm0-31TojxzFwC1Mvs0lZV1XFJySFhrKG-9hOzKOq0s4x3GPNYq7KBM4UREcrjtRdOBVShODCLKezVkz0jhYFtDCE6n4mjvBSfXnpobm4ACiOf0OvrfVRSfBsy0I7xXVo_HqmmmjxkwK8PBVRUs4JHxCgw=w825-h638-no',
		'https://lh3.googleusercontent.com/HdCAhvOnm1A0ATFjnv6ITokc-YseJKV9RhUFWYPP-W5_-oGZSgZTYEv4d5nfyWQGE2pqLZ1vZtewKguSuWdywKuKMRAWcaFeJaoJJqNadcGhU5k0f8hOIEhjsk_bXteUjbkFajnJQQJhOm5N1uikz0Xqbyy2mOMZfpGOnc2-y0s9wLgXYEY9l8F_ZUYJwLS_YyKgIMSgpWRs_DrYFiGNILTyENpS6fQ5r_NhvS7s9vYGg0fr5SmlYmHNpkz0aFqmvXZg4A85eB5oYwjKyeunPpJhEjdYQ-fMjGH407yyOcu-kfADGSvfRMIwYjlJShSUrqffKVc-KQIwA65znPpqe80MrMWoG-kXuXBDFXoQqf8VItFti9QLVn9edQJ90Xz35CIi8PlMEpnE1lLBkFWBmfJEZ-d2HjOQCE-uL9c0HQxxc0d_0lNw0ouQ8jXBeLB5AKst-iTCWGWUkXQHfU1wSqtKZNrXtHQdPp6zszw4p-lALOP-gMxA1lN4UTIM1HIE1fM_M3YKhXJ7q4FWvezNd_AanEiFmXCB5p_ExsvdXWv4qhqY8G38ZY93GxD410kg-Vs5ZvHTFkxFjzbvhieoGnZunJ92_mY=w1100-h850-no',
		'https://lh3.googleusercontent.com/ACRBDcI_hGZmm2l3aj69GjJuFFIog_Na5YaCkVcksGYKnrTT3PMH1GaS3-IK4iS-xG6NZlv_P1gBFnYjXcNDWV1b7BZu8ya3MsNLcbI99YujMz8jZC7_Xz5dH7ikPvW9k7BMxyBD1Byh5Z5ve5ybucmFqwlDvA7pHtY21AooPE771_AHxJq4CLD-xYRClAsBORDfdocP--bTFXq1Dex2cHFEdR5xxyicDptKNP9AZDrvh1vuUUKMMsEhZDf5fIHChRUwpKfVxQKNuHhg7b269gGGNv71Fe5H9dy8F2PpfR8IUY0QsmbIKhWZ2JN0_GJQ7NZKV3zKKREb11xE1XnSTiEbksqnuQVTkKqDUe5fSIYbfpBiViF-IzWXUYlEpwTzNH6fG7RrBdNn1koSqE5maGmfhcUwJtfLutrVzIKMNCyptuuGWLPrtD_EC50gh1vM85zPQVLAyGKpjZKrMrYlMr4gPWn50RnpI-SIefWmDDv61oH7ti9x3LkqoQO_gYAqdFjQviZSusU2eTDoJBq0Y3fjdEhqK1bBSP6dJkUmAqdSzSiqDLbCyysRIwBw6oJQv-3P3amcinUCgmLAJ6Wj5FaQYxLPCM0=w650-h464-no'
	];
	var product_type = ['nba/breaks', 'nba/breaks', 'nba/breaks', 'nba/breaks'];
	var names = ['3 x Panini Mixer Box Break', '2014-2015 Panini Gold Standard', '2015-2016 Panini Court Kings', '2015-2016 Panini Gold Standard'];

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
