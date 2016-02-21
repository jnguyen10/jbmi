// KEEP ALL MIDDLEWARE IN THIS ORDER
var express = require('express');
var logger = require('morgan');
var cp = require('cookie-parser');
var bp = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var debug = require('debug')('passport-mongo');
var favicon = require('serve-favicon');
var util = require('util');
var braintree = require('braintree');

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
app.use(passport.initialize());
app.use(passport.session());
// PASSPORT CONFIGURATION
var User = mongoose.model('User')
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ALTERNATE SERIALIZE/DESERIALIZE FUNCTIONS
// passport.serializeUser(function(user, done){
//     done(null, user.id)
// });
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         done(err, user)
//     })
// });

// ######## BRAINTREE ###########
// var gateway = braintree.connect({
// 	environment: braintree.Environment.Sandbox,
// 	merchantId: 'tc73c3fgw3r4st69',
// 	publicKey: 'byj532pfhpsb686q',
// 	privateKey: '9cfe694a918df6554e11149dc0c962e4'
// });

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




// app.get('/user/register', function(req, res) {
//   // res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
//   console.log(req.body)
//   var json_data = req.body
//   res.json(json_data);
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });



app.listen(8000, function(){
	console.log("listening on port 8000");
});
