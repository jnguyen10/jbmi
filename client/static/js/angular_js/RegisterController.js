jbmi_app.controller('RegisterController', function($scope, $rootScope, $location, AuthService){

	console.log(AuthService.getUserStatus());

	$scope.register = function(){

		// initial values
		$scope.error = false;
		$scope.disabled = true;

		console.log("register", AuthService.getUserStatus());

		if ($scope.registerForm.password == $scope.registerForm.confirm_pw) {
			// call login from service
			AuthService.register($scope.registerForm.name, $scope.registerForm.username, $scope.registerForm.password)
			// handle success
			.then(function() {
				$rootScope.isUserLoggedIn = AuthService.getUserStatus()
				console.log("register getUserStatus", AuthService.getUserStatus());
				$location.path('/');
				$scope.disabled = false;
				$scope.registerForm = {};
			})
			// handle error
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = "Email already exists!";
				$scope.disabled = false;
				$scope.registerForm = {};
			});
		} else {
			$scope.error = true;
			$scope.errorMessage = "Passwords must match";
			$scope.disabled = false;
			$scope.registerForm = {};
		}
		
	};

});