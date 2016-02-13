jbmi_app.controller('CheckoutConfirmationController', function($scope, $rootScope, $http, ngCart, ProductFactory){

    // $scope.orderNumber = $rootScope.payPalSettings.paypal.item_number

    $scope.orderItems = ngCart.getItems()
    $scope.total = ngCart.totalCost()
	$scope.orderNumber = ngCart.getItems()[0]._id.slice(10)

	// console.log("confirm cartID", ngCart.getCartID())
	console.log("shipping", ngCart.getShipping())

	// Once confirmation page is loaded
	// 1) Save the order (order number, products) once controller is called
	// 		- In case of refresh, check to see if the order already exists first (maybe do this on the server side) - saveOrder function
	// 2) Replace all the $scope data from cart with the data from the order collection in DATABASE - getOrder function
	// 3) Update the products purchased to "available: N" - updateProduct, maybe incorporate into saveOrder function
	// 4) Provide a form for user to enter in email and have receipt sent to them of the order (save the order again with an email address)
	// 5) Clear the cart
	//		ngCart.empty()

});
