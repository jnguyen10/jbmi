jbmi_app.controller('NewCartController', function($scope, $rootScope, $http, ngCart){

    function customID() {
        var id = ""
        var possible = "0123456789"

        for (var i=0; i < 10; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id+ngCart.getTotalUniqueItems()
    }

	$rootScope.payPalSettings = { paypal: {
            business: 'jbmoderninserts@gmail.com', 
            item_name: 'basketball cards', // check to see if you can get ITEM NAME from ngCart
            item_number: customID(), // check to see if there's any ITEM NUMBERS from ngCart
            currency_code: 'USD'
        }
    };

    console.log(ngCart.getItems())


    ngCart.setTaxRate(0.0);
    ngCart.setShipping(0.00);

});
