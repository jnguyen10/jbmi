jbmi_app.controller('NewCartController', function($rootScope, $scope, $location, $route, $rootScope, $http, ngCart){
    $rootScope.cart_updated = false;

    if (ngCart.getItems()[0] != undefined) {

        // Create custom item name and regex for "break"
        var custom_name = ""
        var pattern = new RegExp("^.*JBMIBreak.*$")

        var anchor = ngCart.getItems()[0]._name
        var additional = parseInt(ngCart.getTotalUniqueItems()) - 1

        if (additional == 0) {
            custom_name = anchor
        } else {
            custom_name = anchor + " & " + String(additional) + " additional item(s) -- TOTAL QTY: " + ngCart.getTotalItems()
        }

        // Create a note with all the items being purchased
        var new_note = ""
        var item_count = 0
        var items = ngCart.getItems()

        for (each in items) {
            item_count++
            new_note += "(("+ item_count +")) " + items[each]._name + " QUANTITY: " + items[each]._quantity + " / PRICE: $" + items[each]._price + " each ###"
        }

        console.log("new_note string", new_note)

        // After creation of corrected custom_name, check to see if the order contains a BREAK
        var res_break = pattern.test(custom_name)

        if (ngCart.getSubTotal() > 20 || res_break ) {
            ngCart.setTaxRate(0.0);
            ngCart.setShipping(0.00);
        } else {
            ngCart.setTaxRate(0.0);
            ngCart.setShipping(2.00);
        }


        $rootScope.payPalSettings = { paypal: {
            business: 'jbmoderninserts@gmail.com',
            // item_name: anchor + " & " + String(parseInt(ngCart.getTotalUniqueItems()) - 1) + " additional item(s)",
            item_name: custom_name,
            item_number: ngCart.getItems()[0]._id,
            currency_code: 'USD',
            no_note: new_note
            }
        };
    }

    $scope.reloading = false;

    $scope.refresh = function() {
        console.log("REFRESH")
        $scope.reloading = true;

        setTimeout(function() {
          $scope.reloading = false;
          $location.path('/cart');
          $route.reload();
        }, 2000)
    }



})
.run(['$rootScope', 'ngCart','ngCartItem', 'store', function ($rootScope, ngCart, ngCartItem, store) {

    $rootScope.$on('ngCart:change', function(){
        $rootScope.cart_updated = true;
    });

}]);
