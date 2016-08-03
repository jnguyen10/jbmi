jbmi_app.controller('CheckoutController', function($location, $scope, $rootScope, $http, ngCart, ProductFactory, BreakFactory, OrderFactory){

	$scope.orders = [];

	if (ngCart.getItems()[0] != undefined) {

		var cart_name = ngCart.getItems()[0]._name
		var pattern = new RegExp("^.*JBMIBreak.*$")
		// After creation of corrected custom_name, check to see if the order contains a BREAK
	  var res_break = pattern.test(cart_name)


		if (ngCart.getSubTotal() > 20 || res_break ) {
			ngCart.setTaxRate(0.0);
			ngCart.setShipping(0.00);
		} else {
			ngCart.setTaxRate(0.0);
			ngCart.setShipping(2.00);
		}

		// Check to see if custom has signed in/is registered
		// If not, just save the order and give customer option to get email confirmation sent to them on the page
		if ($rootScope.singleUser.name && $rootScope.singleUser.email) {
			$scope.order_summary = {
				name: $rootScope.singleUser.name,
				email: $rootScope.singleUser.email,
				order_number: ngCart.getItems()[0]._id,
				order_items: ngCart.getItems(),
				shipping: ngCart.getShipping(),
				price: ngCart.totalCost()
			}
		} else {
			$scope.order_summary = {
				order_number: ngCart.getItems()[0]._id,
				order_items: ngCart.getItems(),
				shipping: ngCart.getShipping(),
				price: ngCart.totalCost()
			}
		}
	} else { // redirect to home page if page gets reloaded, as cart data is cleared
		$location.path('/');
		$scope.order_summary = {}
	}

	$scope.getOrders = function () {
		OrderFactory.getOrders(function(data){
			$scope.orders = data;
		})
	};

	$scope.removeBreak = function(order_id){
		OrderFactory.removeOrder(order_id, function(){
			$scope.getOrders();
		})
	};

	// Initial values to check if customer is registered and whether or not an email has been sent.
	$scope.registered = false;
	$scope.email_sent = false;

	// Once confirmation page is loaded
	// 1) Save the order (order number, products) once controller is called
	// 		- In case of refresh, check to see if the order already exists first (maybe do this on the server side) - saveOrder function
	$scope.addOrder = function(){
		if ($scope.order_summary.name && $scope.order_summary.email) {
			OrderFactory.addOrder($scope.order_summary, function(data){
				// If customer is signed in, we initiate an email in the backend
				$scope.order_summary = data;
				$scope.registered = true;
				$scope.email_sent = true;
			})
		} else {
			OrderFactory.addOrder($scope.order_summary, function(data){
				// If no customer is logged in/registered, we will present the customer with a form to initiate a form
				$scope.order_summary = data;
				$scope.registered = false;
			})
		}

	};

	$scope.addOrder();

	// 2) Update the products purchased to "available: N" - updateProduct, maybe incorporate into saveOrder function
	$scope.updateAvailability = function(){
		ProductFactory.updateAvailability({order_items: $scope.order_summary.order_items}, function(){
			console.log("Update of Availablity Complete!");
		})
	}

	$scope.updateAvailability();

	$scope.updateBreakQty = function(){
		BreakFactory.updateBreakQty({order_items: $scope.order_summary.order_items}, function(){
			console.log("Update of Break Qty Complete!");
		})
	}

	$scope.updateBreakQty();

	// 3) Provide a form for user to enter in email and have receipt sent to them of the order (save the order again with an email address)
	$scope.updateOrder = function() {
		// $scope.order_update info passed when customer enters in a name and email
		$scope.order_summary.name = $scope.order_update.name;
		$scope.order_summary.email = $scope.order_update.email;

		// Order gets updated with name and email and also initates sending the email
		OrderFactory.updateOrder($scope.order_summary, function() {
			$scope.email_sent = true
			$scope.order_update = {}
		})

	}

	// 4) Clear the cart
	ngCart.empty()

});
