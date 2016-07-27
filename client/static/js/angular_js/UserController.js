jbmi_app.controller('UserController', function($scope, $rootScope, $routeParams, $location, UserFactory){

	$scope.users = [];

	// Always check to see if user is authenticated by checking to see if a token is present in localStorage
	(function() {
		if (localStorage.getItem('token')) {
			var token = localStorage.getItem('token')
			$rootScope.isUserLoggedIn = true;
			UserFactory.findUser(token, function(){
				console.log("YES CALLBACK WORKED!")
			})
		}
		else {
			$rootScope.isUserLoggedIn = false;
		}
	})();

	$scope.getAllUsers = function() {
		UserFactory.getAllUsers(function(data) {
			$scope.users = data;
		})
	}

	$scope.signup = function(){

		// initial values
		$scope.error = false;
		$scope.disabled = true;

		if ($scope.new_user.password === $scope.new_user.confirm_pw) {
			// Sign up new user
			UserFactory.signup($scope.new_user, function(data) {
				if (!data.error) {
					$rootScope.isUserLoggedIn = true;
					localStorage.setItem('token', data.token)
					$scope.disabled = false;
					$location.path('/');
					$scope.new_user = {};
				} else {
					$rootScope.isUserLoggedIn = false;
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.disabled = false;
					$scope.new_user = {};
				}
			});
		} else {
			$scope.error = true;
			$scope.errorMessage = "Passwords must match";
			$scope.disabled = false;
			$scope.registerForm = {};
		}

	};

	$scope.login = function(){
		// initial values
		$scope.error = false;
		$scope.disabled = true;


		// call login from service
		UserFactory.login($scope.loginForm.email, $scope.loginForm.password, function(data) {
			if (!data.error) {
				$rootScope.isUserLoggedIn = true;
				localStorage.setItem('token', data.token)
				$location.path('/');
				$scope.disabled = false;
				$scope.loginForm = {};
			} else {
				$rootScope.isUserLoggedIn = false;
				$scope.error = true;
				$scope.errorMessage = "Invalid username and/or password";
				$scope.disabled = false;
				$scope.loginForm = {};
			}
		})
	};

	$scope.logout = function(){
		$rootScope.isUserLoggedIn = false;
		localStorage.removeItem('token');
		$location.path('/login');
	};

	$scope.getAllUsers();

});
