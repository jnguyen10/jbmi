jbmi_app.controller('BreakController', function($scope, $rootScope, $http, ngCart){

    function customID() {
        var id = ""
        var possible = "0123456789"

        for (var i=0; i < 10; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id+ngCart.getTotalUniqueItems()
    }
});