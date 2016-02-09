jbmi_app.controller('LogoutController', function($scope, $location, AuthService){

	$scope.login = function(){
		$scope.isUserLoggedIn = AuthService.getUserStatus()
		console.log("login", AuthService.getUserStatus());

		$location.path('/login');
	}

	$scope.logout = function(){
		
		$scope.isUserLoggedIn = AuthService.getUserStatus()

		console.log("logout", AuthService.getUserStatus());

		// call logout from service
		AuthService.logout()
		.then(function() {
			$location.path('/login');
		})
	};

});