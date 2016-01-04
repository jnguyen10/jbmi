// app.js to create angular module and create routes for partials
// "angularMoment" directive used to customize time
var jbmi_app = angular.module('jbmi_app', ['ngRoute','angularMoment', 'ui.bootstrap', 'ngAnimate']);

// Partials
jbmi_app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main.html'
	})
	.when('/nba', {
		templateUrl: 'partials/nba_collection.html'
	})
	.when('/nba/breaks', {
		templateUrl: 'partials/nba_breaks.html'
	})
	.when('/nfl', {
		templateUrl: 'partials/nfl_collection.html'
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
	.when('/admin', {
		templateUrl: 'partials/admin.html'
	})
	.when('/admin/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/admin/dashboard/add_products', {
		templateUrl: 'partials/add_products.html'
	})
	.when('/admin/dashboard/add_breaks', {
		templateUrl: 'partials/add_breaks.html'
	})
	.when('/admin/dashboard/add_blogs', {
		templateUrl: 'partials/add_blogs.html'
	})
	.when('/product/edit/:product_id', {
		templateUrl: 'partials/edit_product.html'
	})
	.when('/customers', {
		templateUrl: 'partials/customers.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});