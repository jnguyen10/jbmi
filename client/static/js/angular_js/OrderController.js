jbmi_app.controller('OrderController', function($location, $scope, $rootScope, $http, ngCart, OrderFactory){

	$scope.orders = [];

    $scope.getOrders = function () {
    	OrderFactory.getOrders(function(data){
			console.log("Getting All Breaks", data);
			$scope.orders = data;
		})
    };

    $scope.removeOrder = function(order_id){
		OrderFactory.removeOrder(order_id, function(){
			$scope.getOrders();
		})
	};

	$scope.getOrders();

});
