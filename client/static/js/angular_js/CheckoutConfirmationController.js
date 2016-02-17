jbmi_app.controller('CheckoutConfirmationController', function($location, $scope, $rootScope, $http, ngCart, ProductFactory, BreakFactory, OrderFactory){

    // $scope.orderNumber = $rootScope.payPalSettings.paypal.item_number
    if (ngCart.getItems()[0] != undefined) {

  //   	if (ngCart.getItems()[0]._id.length == 12) {
  //   		var orderID = ngCart.getItems()[0]._id
  //   	} else {
  //   		var orderID = ngCart.getItems()[0]._id.slice(10)
  //   	}

		// $scope.orderItems = ngCart.getItems()
		// $scope.total = ngCart.totalCost()
		// $scope.orderNumber = orderID

		$scope.order_summary = {
			order_number: ngCart.getItems()[0]._id,
			order_items: ngCart.getItems(),
			shipping: ngCart.getShipping(),
			price: ngCart.totalCost()
		}
    } else { // redirect to home page if page gets reloaded, as cart data is cleared
    	$location.path('/');
    	$scope.order_summary = {}
    }

	// console.log("confirm cartID", ngCart.getCartID())

	// Once confirmation page is loaded
	// 1) Save the order (order number, products) once controller is called
	// 		- In case of refresh, check to see if the order already exists first (maybe do this on the server side) - saveOrder function
	$scope.addOrder = function(){
		console.log("Adding New Order (Client-Side Controller)", $scope.order_summary)

		OrderFactory.addOrder($scope.order_summary, function(data){
			$scope.order_summary = data;
			console.log("callback", $scope.order_summary)
		})
	};

	$scope.addOrder();

	// 2) Replace all the $scope data from cart with the data from the order collection in DATABASE - getOrder function - NOT POSSIBLE ATM

	
	// 3) Update the products purchased to "available: N" - updateProduct, maybe incorporate into saveOrder function
	$scope.updateAvailability = function(){
		console.log("Removing availablity of product (Client-Side Controller)", $scope.order_summary.order_items)
		ProductFactory.updateAvailability({order_items: $scope.order_summary.order_items}, function(){
			console.log("Update of Availablity Complete!");
		})
	}

	$scope.updateAvailability();

	$scope.updateBreakQty = function(){
		console.log("Update the break quantity of product (Client-Side Controller)", $scope.order_summary.order_items)
		BreakFactory.updateBreakQty({order_items: $scope.order_summary.order_items}, function(){
			console.log("Update of Break Qty Complete!");
		})
	}

	$scope.updateBreakQty();


	// 4) Provide a form for user to enter in email and have receipt sent to them of the order (save the order again with an email address) - ADD LATER
	// 5) Clear the cart
	ngCart.empty()

});
