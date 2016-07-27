jbmi_app.factory('UserFactory', function($http){
	var factory = {};
	var users = [];

	factory.signup = function(signupData, callback){
		$http.post('/user/signup', signupData)
			.success(function(output){
				callback(output);
			})
			.error(function(err) {
				callback({error: err})
			})
	};

	factory.login = function(email, password, callback) {
		// send a post request to the server
		$http.post('/user/login', {email: email, password: password})
			// handle success
			.success(function(data, status) {
				callback(data)

			})
			// handle error
			.error(function(err) {
				callback({error: err})
			});

	};

	factory.getAllUsers = function(callback) {
		$http.get('/user/all_users')
			.success(function(data) {
				callback(data);
			})
	}


	factory.findUser = function(token, callback) {
		// send a get request to retrieve the user information associated to the locally stored token
		$http.get('/user/find_user', { headers: { authorization: token }})
			.success(function(data) {
				console.log("success data findUser", data)
				callback()
			})
			.error(function(err) {
				console.log("error data findUser", err)
			})
	}

	return factory

});
