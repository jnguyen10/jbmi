angular.module('jbmi_app').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

	// create user and data object variable
	var user = null
	var userDataObject = null

	// return available functions for use in controllers
	return ({
		isLoggedIn: isLoggedIn,
		getUserStatus: getUserStatus,
		login: login,
		logout: logout,
		register: register
	});


	function isLoggedIn() {
		if(user) {
			return true;
		} else {
			return false;
		}
	};

	function getUserStatus(callback) {
		return user


		// // create a new instance of deferred
		// var deferred = $q.defer();

		// // send a get request to the server
		// $http.get('/users/auth/status')
		// // handle success
		// .success(function (data) {
		// 	console.log("SUCCESS")
		// 	// console.log("success data", data)
		// 	user = true;
		// 	deferred.resolve();
		// 	userDataObject = data;
		// 	// console.log("deferred.promise in success", deferred.promise)
		// 	// return promise object
		// 	// return deferred.promise;
		// 	console.log("inside success", userDataObject)

		// })
		// // handle error
		// .error(function (data) {
		// 	console.log("FAILED")
		// 	user = false;
		// 	deferred.reject();
		// });

		// deferred.promise.$$state.user_data = userDataObject
		// console.log("deferred.promise", deferred.promise)

		// // return promise object
		// return deferred.promise;

	};

	function login(username, password) {

		// create a new instance of deferred
		var deferred = $q.defer();

		// send a post request to the server
		$http.post('/users/login', {username: username, password: password})
		// handle success
		.success(function (data, status) {
			if(status === 200 && data.status){
				user = true;
				deferred.resolve();
			} else {
				user = false;
				deferred.reject();
			}
		})
		// handle error
		.error(function (data) {
			user = false;
			deferred.reject();
		});

		// return promise object
		return deferred.promise;

	};

	function logout() {

		// create a new instance of deferred
		var deferred = $q.defer();

		// send a get request to the server
		$http.get('/users/logout')
		// handle success
		.success(function (data) {
			user = false;
			deferred.resolve();
		})
		// handle error
		.error(function (data) {
			user = false;
			deferred.reject();
		});

		// return promise object
		return deferred.promise;

	}

	function register(name, username, password) {

		// create a new instance of deferred
		var deferred = $q.defer();

		// send a post request to the server
		$http.post('/users/register', {name: name, username: username, password: password})
		// handle success
		.success(function (data, status) {
			if(status === 200 && data.status){
				user = true;
				deferred.resolve();
			} else {
				user = false;
				deferred.reject();
			}
		})
		// handle error
		.error(function (data) {
			user = false;
			deferred.reject();
		});

		// return promise object
		return deferred.promise;

	};



}]);