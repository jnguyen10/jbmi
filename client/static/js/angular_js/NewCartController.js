jbmi_app.controller('NewCartController', function($scope, $location, $route, $rootScope, $http, ngCart){

    if (ngCart.getItems()[0] != undefined) {

        // Create custom item name and regex for "break"
        var custom_name = ""
        var pattern = new RegExp("^.*JBMIBreak.*$")

        var anchor = ngCart.getItems()[0]._name
        var additional = parseInt(ngCart.getTotalUniqueItems()) - 1

        if (additional == 0) {
            custom_name = anchor
        } else {
            custom_name = anchor + " & " + String(additional) + " additional item(s)"
        }

        // After creation of corrected custom_name, check to see if the order contains a BREAK
        var res_break = pattern.test(custom_name)

        if (ngCart.getSubTotal() > 20 || res_break ) {
            ngCart.setTaxRate(0.0);
            ngCart.setShipping(0.00);
        } else {
            ngCart.setTaxRate(0.0);
            ngCart.setShipping(2.00);
        }


        console.log("custom item name", custom_name)

        $rootScope.payPalSettings = { paypal: {
            business: 'jbmoderninserts@gmail.com', 
            // item_name: anchor + " & " + String(parseInt(ngCart.getTotalUniqueItems()) - 1) + " additional item(s)",
            item_name: custom_name,
            item_number: ngCart.getItems()[0]._id.slice(10),
            currency_code: 'USD'
            }
        };
    }

    // $scope.refresh = function() {
    //     console.log("REFRESH")
    //     $location.path('/cart');
    //     $route.reload();
    // }
    
    // console.log("new cart cartID", ngCart.generateCartID())
    console.log(ngCart.getItems())


});
