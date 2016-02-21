jbmi_app.controller('CheckoutController', function($location, $scope, $rootScope, $http, ngCart, ProductFactory, BreakFactory, OrderFactory){

	$scope.orders = [];
	$scope.email_sent = false

    if (ngCart.getItems()[0] != undefined) {

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

    $scope.getOrders = function () {
    	OrderFactory.getOrders(function(data){
			console.log("Getting All Breaks", data);
			$scope.orders = data;
		})
    };

    $scope.removeBreak = function(order_id){
		OrderFactory.removeOrder(order_id, function(){
			$scope.getOrders();
		})
	};

	console.log("Checkout scope", $scope.order_summary)

	$scope.sendEmail = function() {
		console.log("SEND EMAIL ORDER SUMMARY", $scope.order_summary)
		// $scope.order_update info passed when customer enters in a name and email (and opt-in choice)
		$scope.order_summary.name = $scope.order_update.name;
		$scope.order_summary.email = $scope.order_update.email;
		if ($scope.order_update.opt_in) {
			$scope.order_summary.opt_in = $scope.order_update.opt_in;
		}
		

		console.log("name and email added to order_summary", $scope.order_summary)
		
		// Order gets updated with name and email (and opt-in choice) and also initates sending the email
		OrderFactory.updateOrder($scope.order_summary, function() {
			$scope.email_sent = true
    		$scope.order_update = {}
		})


	}

	// console.log("confirm cartID", ngCart.getCartID())

	// Once confirmation page is loaded
	// 1) Save the order (order number, products) once controller is called
	// 		- In case of refresh, check to see if the order already exists first (maybe do this on the server side) - saveOrder function
	$scope.addOrder = function(){
		console.log("Adding New Order (Client-Side Controller) as a JSON OBJECT", $scope.order_summary)

		OrderFactory.addOrder($scope.order_summary, function(data){
			if (data.shipping == null) {
				data.shipping = 0;
			};

			$scope.order_summary = data;
			console.log("callback returned as a single JSON OBJECT", $scope.order_summary)

			ngCart.empty()
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
