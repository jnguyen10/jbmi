jbmi_app.controller('CheckoutConfirmationController', function($scope, $rootScope, $http, ngCart, ProductFactory){

    $scope.orderNumber = $rootScope.payPalSettings.paypal.item_number
    $scope.orderItems = ngCart.getItems()
    $scope.total = ngCart.totalCost()

    

});
