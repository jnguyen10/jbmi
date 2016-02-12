jbmi_app.controller('LoginController', function($scope, $rootScope, $location, AuthService){

	$scope.login = function(){
		// initial values
		$scope.error = false;
		$scope.disabled = true;

		// call login from service
		AuthService.login($scope.loginForm.username, $scope.loginForm.password)
		// handle success
		.then(function() {
			$rootScope.isUserLoggedIn = AuthService.getUserStatus()
			console.log("login isUserLoggedIn", $rootScope.isUserLoggedIn);
			$location.path('/');
			$scope.disabled = false;
			$scope.loginForm = {};
		})
		// handle error
		.catch(function() {
			$scope.error = true;
			$scope.errorMessage = "Invalid username and/or password";
			$scope.disabled = false;
			$scope.loginForm = {};
		});
	};

	$scope.logout = function(){

		// call logout from service
		AuthService.logout()
		.then(function() {
			$rootScope.isUserLoggedIn = false
			console.log("logout isUserLoggedIn", $rootScope.isUserLoggedIn)

			$location.path('/login');
		})
	};

});