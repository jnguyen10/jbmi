var passport = require('passport');
var User = require('../models/user');
var config = require('./config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// Create Local Strategy (Passport Strategy #1)
var localOptions = { usernameField: 'email'}
var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with user
  // If it is the correct email and password
  // Otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err) };

    if (!user) { return done(null, false) };

    // compare hashed password with submitted password
    user.comparePW(password, function(err, isMatch) {
      if (err) { return done(err) };
      if (!isMatch) { return done(null, false) };

      return done(null, user);
    })

  })
});


// Setup options for JWT Strategy (Passport Strategy #2)
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call done with that user
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

// Tell passport to use this strategy
passport.use(localLogin);
passport.use(jwtLogin);
