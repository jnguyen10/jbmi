// KEEP ALL MIDDLEWARE IN THIS ORDER
var express = require('express');
var logger = require('morgan');
var cp = require('cookie-parser');
var bp = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var debug = require('debug')('passport-mongo');
var favicon = require('serve-favicon');
var util = require('util');

var app = express();
var jsonParser = bp.json();

// Path for Static Content
app.use(express.static(path.join(__dirname, './client/static')));


// require the mongoose config file to load DB
// NOTE: ALWAYS load before routes.js
// DB needs to be connected before routes can be established
require('./server/config/mongoose.js');

// ###### NOTE: DECLARE ALL MIDDLEWARE BEFORE ROUTES ########
// Declare body parser for URL and JSON; allows to POST data from both URL and JSON
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(logger('dev'));
app.use(cp());
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

/**
 * Enable CORS (http://enable-cors.org/server_expressjs.html)
 * to allow different clients to request data from your server
 */
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// this line requires and runs the code frokm our routes.js file
// and passes it 'app' so that we can attach our routing rules
// to our express application
require('./server/config/routes.js')(app, jsonParser)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/client/favicon.ico'));


app.listen(8000, function(){
	console.log("listening on port 8000");
});
