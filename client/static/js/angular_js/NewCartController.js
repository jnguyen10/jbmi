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

        // Create a note with all the items being purchased
        var new_note = ""
        var item_count = 0
        var items = ngCart.getItems()

        for (each in items) {
            item_count++
            new_note += "(("+ item_count +")) " + items[each]._name + " QUANTITY: " + items[each]._quantity + " / PRICE: $" + items[each]._price + " each ### "
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


        console.log("custom item name", custom_name)

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

    // $scope.refresh = function() {
    //     console.log("REFRESH")
    //     $location.path('/cart');
    //     $route.reload();
    // }
    
    // console.log("new cart cartID", ngCart.generateCartID())
    console.log(ngCart.getItems())


});
