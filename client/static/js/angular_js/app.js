// app.js to create angular module and create routes for partials
// "angularMoment" directive used to customize time
var jbmi_app = angular.module('jbmi_app', ['ngRoute','angularMoment', 'ui.bootstrap', 'ngAnimate', 'infinite-scroll', 'ngCart']);

// Partials
jbmi_app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main.html'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		access: {restricted: false}
	})
	.when('/logout', {
		controller: 'logoutController',
		access: {restricted: true}
	})
	.when('/register', {
		templateUrl: 'partials/register.html',
		access: {restricted: false}
	})
	.when('/cart', {
		templateUrl: 'partials/shopping_cart.html'
	})
	.when('/confirmation', {
		templateUrl: 'partials/checkout_confirmation.html'
	})
	.when('/admin', {
		templateUrl: 'partials/admin.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/admin/dashboard', {
		templateUrl: 'partials/dashboard.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/admin/dashboard/add_products', {
		templateUrl: 'partials/add_products.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/admin/dashboard/add_breaks', {
		templateUrl: 'partials/add_breaks.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/admin/dashboard/add_blogs', {
		templateUrl: 'partials/add_blogs.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/product/edit/:product_id', {
		templateUrl: 'partials/edit_product.html',
		access: {
			restricted: true,
			requirePermissions: 'admin'
		}
	})
	.when('/break_rules', {
		templateUrl: 'partials/break_rules.html'
	})
	.when('/nba', {
		templateUrl: 'partials/nba_collection.html',
		access: {
			restricted: true,
			requirePermissions: 'test@test.com'
		}
	})
	.when('/nba/breaks', {
		templateUrl: 'partials/nba_breaks.html'
	})
	.when('/nfl', {
		templateUrl: 'partials/nfl_collection.html',
		access: {
			restricted: true,
			requirePermissions: 'test3@test.com'
		}
	})
	.when('/nfl/breaks', {
		templateUrl: 'partials/nfl_breaks.html'
	})
	.when('/mlb', {
		templateUrl: 'partials/mlb_collection.html'
	})
	.when('/mlb/breaks', {
		templateUrl: 'partials/mlb_breaks.html'
	})
	.when('/nhl', {
		templateUrl: 'partials/nhl_collection.html'
	})
	.when('/nhl/breaks', {
		templateUrl: 'partials/nhl_breaks.html'
	})
	.when('/media', {
		templateUrl: 'partials/non-sports_collection.html'
	})
	.when('/media/breaks', {
		templateUrl: 'partials/non-sports_breaks.html'
	})
	.when('/restricted', {
		templateUrl: 'partials/restricted.html'
	})
	.otherwise({
		templateUrl: 'partials/404.html'
	});

	// ADD THIS TO REMOVE HASH FROM URL
	// $locationProvider.html5Mode(true);


});

// Route Changes - check status
jbmi_app.run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart', function (event, next, current) {

		// if (next.access !== undefined) {
		// 	console.log("$routeChangeStart data from AuthService.getUserStatus()", AuthService.getUserStatus())
		// }

		

		var user_session = AuthService.getUserStatus()
		if (user_session.$$state.user_data.username !== next.access.requirePermissions){
			$location.path('/restricted');
		}


		if (next.access !== undefined) {
			if (next.access.restricted && AuthService.isLoggedIn() === false) {
				$location.path('/login');
				$route.reload();
			}
		}

	});
});
