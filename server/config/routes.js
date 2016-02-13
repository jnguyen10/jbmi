module.exports = function(app){
	var users = require('./../controllers/users.js');
	var blogs = require('./../controllers/blogs.js');
	var breaks = require('./../controllers/breaks.js');
	var products = require('./../controllers/products.js');
	var orders = require('./../controllers/orders.js')
	
	// ########### USERS #############
	// ADD A NEW USER
	app.post('/users/register', function(req, res){
		users.register(req, res);
	})

	// LOGIN USER
	app.post('/users/login', function(req, res){
		users.login(req, res);
	})

	// LOGOUT USER
	app.get('/users/logout', function(req, res){
		users.logout(req, res);
	})

	// GET USER LOGIN STATUS
	app.get('/users/auth/status', function(req, res){
		users.getStatus(req, res);
	})

	// ########### ORDERS #############
	// GET ALL ORDERS
	app.get('/orders', function(req, res){
		orders.show(req, res);
	});

	// ADD A NEW ORDER
	app.post('/orders/add', function(req, res){
		orders.add(req, res);
	});

	// SEARCH ALL ORDERS BY FILTER
	app.post('/orders/search_all', function(req, res){
		orders.search_all(req, res);
	});

	// REMOVING AN ORDER
	app.post('/orders/remove', function(req, res){
		orders.remove(req, res);
	});

	// ########## PRODUCTS ##############
	// GET ALL PRODUCTS
	app.get('/products', function(req, res){
		products.show(req, res);
	});

	// SEARCH ALL PRODUCTS BY FILTER
	app.post('/products/search_all', function(req, res){
		products.search_all(req, res);
	});

	// GET ALL NBA PRODUCTS
	app.get('/products/get_nba', function(req, res){
		products.get_nba(req, res);
	});

	// SEARCH NBA PRODUCTS BY FILTER
	app.post('/products/search_nba', function(req, res){
		products.search_nba(req, res);
	});

	// GET ALL NFL PRODUCTS
	app.get('/products/get_nfl', function(req, res){
		products.get_nfl(req, res);
	});

	// ADD A NEW PRODUCT
	app.post('/products/add', function(req, res){
		products.add(req, res);
	});

	// GET A SINGLE PRODUCT
	app.post('/products/single', function(req, res){
		products.single(req, res);
	});

	// UPDATE PROPERTIES OF A SINGLE PRODUCT
	app.post('/products/update', function(req, res){
		products.update(req, res);
	});

	// UPDATE PRODUCT AVAILABILITY AFTER ORDER IS PLACED
	app.post('/products/update_avail', function(req, res){
		products.update_avail(req, res);
	});

	// REMOVING A PRODUCT
	app.post('/products/remove', function(req, res){
		products.remove(req, res);
	});


};