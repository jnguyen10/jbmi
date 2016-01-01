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
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html'
	})
	.when('/product/edit/:product_id', {
		templateUrl: 'partials/product_edit.html'
	})
	.when('/customers', {
		templateUrl: 'partials/customers.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});