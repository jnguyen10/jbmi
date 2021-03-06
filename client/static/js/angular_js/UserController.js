jbmi_app.controller('UserController', function($scope, $route, $rootScope, $routeParams, $location, UserFactory){

	$scope.users = [];
	$scope.noLocalStorage = false;
	$scope.emailRegEx = "/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/";

	// Always check to see if user is authenticated by checking to see if a token is present in localStorage
	(function() {
		// Check to see if localStorage is available in the browser
		// If not, hide sign up and login buttons
		if (typeof localStorage === 'object') {
			try {
				localStorage.setItem('local', 1);
				localStorage.removeItem('local');
			} catch (err) {
				$scope.noLocalStorage = true;
			}
		}

		if (localStorage.getItem('token')) {
			var token = localStorage.getItem('token')
			$rootScope.isUserLoggedIn = true;
			UserFactory.findUser(token, function(data){
				if (data !== 'Unauthorized') {
					$rootScope.singleUser = data;
				} else {
					$scope.logout();
				}
			})
		}
		else {
			$rootScope.singleUser = {};
			$rootScope.isUserLoggedIn = false;
		}
	})();

	$scope.getAllUsers = function() {
		UserFactory.getAllUsers(function(data) {
			$scope.users = data;
		})
	}

	$scope.signup = function(){

		// Check to see if localStorage is available in the browser
		// If not, hide sign up and login buttons
		if (typeof localStorage === 'object') {
			try {
				localStorage.setItem('local', 1);
				localStorage.removeItem('local');
			} catch (err) {
				$scope.noLocalStorage = true;
				alert("Oops, sign up is unavailable on private mode in Safari!")
				$location.path('/')
				return
			}
		}

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
					$scope.errorMessage = data.error.signupError;
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

		var lowercaseEmail = $scope.loginForm.email.toLowerCase();

		// call login from service
		UserFactory.login(lowercaseEmail, $scope.loginForm.password, function(data) {
			if (!data.error) {
				$rootScope.isUserLoggedIn = true;

				// Check to see if localStorage is available in the browser
				// If not, redirect to home page
				if (typeof localStorage === 'object') {
					try {
						localStorage.setItem('local', 1);
						localStorage.removeItem('local');
					} catch (err) {
						alert("Oops, user login is not supported in private mode on Safari.");
						$location.path('/');
					}
				}

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
		$rootScope.isAllOpen = !$rootScope.isAllOpen;
		$rootScope.singleUser = {};
		localStorage.removeItem('token');
		$location.path('/login');
	};

	function proceedToRemove(email) {
		UserFactory.removeUser(email, function() {
			console.log("successfully removed user");
			localStorage.removeItem('token');
			$location.path('/login');
		})
	}

	$scope.removeUser = function(email) {
		var success = function() {
			proceedToRemove(email);
			alertify.error("Successfully Deactivated Account")
		};
		var fail = function() {
			return
		};

		alertify.confirm("Deactivating Account", "Are you sure you want to deactivate the account (" + email +")?", success, fail);
	}

	$scope.changingPW = false;

	$scope.resetPWBtn = function() {
		// Hide this button and bring up the form to reset the password
		$scope.changingPW = true;

		// initial values for the error/success messages
		$scope.error = false;
		$scope.success = false;
	}

	$scope.resetPW = function() {
		if ($scope.resetPWForm.new_password === $scope.resetPWForm.confirm_pw){
			var updateUser = {
				name: $rootScope.singleUser.name,
				email: $rootScope.singleUser.email,
				password: $scope.resetPWForm.new_password
			}
			$scope.success = true;
			$scope.error = false;
			$scope.successMessage = "Password Successfully Updated"
		} else {
			$scope.success = false;
			$scope.error = true;
			$scope.errorMessage = "Passwords Do Not Match"
		}

	}

	$scope.displayInfo = false;

	$scope.displayInfoButton = function() {
		$scope.displayInfo = !$scope.displayInfo;
		$scope.displayOrders = false;
	}

	$scope.displayOrders = false;

	$scope.displayOrdersButton = function() {
		$scope.displayOrders = !$scope.displayOrders;
		$scope.displayInfo = false;
	}

	$scope.getAllUsers();

})
;
