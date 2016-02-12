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

var app = express();

// Path for Static Content
app.use(express.static(path.join(__dirname, './client/static')));

// ##### HTTPS REDIRECT #####
// Enable reverse proxy support in Express. This causes the "X-Forwarded-Proto" header field to be trusted so its value can be used to determine the protocol.
app.enable('trust proxy')
// Add a handler to inspect the req.secure flag.  This allows us to know whether the request was via http or https.
app.use (function (req, res, next) {
    console.log("req.secure", req.secure)
    if (req.secure) {
        // req was via https, so do no special handling
        next();
    } else {
        // req was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
})


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


// this line requires and runs the code frokm our routes.js file
// and passes it 'app' so that we can attach our routing rules
// to our express application
require('./server/config/routes.js')(app)

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
