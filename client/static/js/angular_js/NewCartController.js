jbmi_app.controller('NewCartController', function($scope, $http, ngCart){

	$scope.payPalSettings = { paypal: {
            business: 'jbmoderninserts@gmail.com', 
            item_name: 'basketball cards', // check to see if you can get ITEM NAME from ngCart
            item_number: '00000', // check to see if there's any ITEM NUMBERS from ngCart
            currency_code: 'USD' 
        }
    };

    console.log(ngCart.getItems())

    ngCart.setTaxRate(0.0);
    ngCart.setShipping(0.00);

});
