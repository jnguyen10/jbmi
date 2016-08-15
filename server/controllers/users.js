var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var User = require('../models/user');
var Order = mongoose.model('Order');
var config = require('../config/config');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  // sub(ject) and i(ssue)a(t)t(ime)
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var regex = "/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/"

    if (!email || !password) {
        return res.status(422).send({ signupError: 'You must provide a valid email and password.'})
    }

    // if (!email.match(regex)) {
    //   return res.status(422).send({ signupError: 'You must provide a valid email address.'})
    // }

    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {

        if (err) {
          return next(err);
        }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send( { signupError: 'Email has already been created!'});
        }

        // If a user with email does not exist, create and save user record
        var newUser = new User({
            name: name,
            email: email,
            password: password
        })

        newUser.save(function(err) {
            if (err) {
                return next(err)
            }

            // Respond to request indicating user was created
            res.json({ token: tokenForUser(newUser) });

        });
    })
};

exports.login = function(req, res, next) {
    // User has already had their email and password auth'd
    // We need to give user a token
    res.send({ token: tokenForUser(req.user) });

};

exports.findOneUser = function(req, res, next) {
    var foundUser = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        created_at: req.user.created_at
    };
    // Respond to request indicating user was created
    Order.find({ email: foundUser.email }, function(err, foundUserOrders) {
        if (err) {
            return next(err);
        }

        foundUser.orders = foundUserOrders;

        res.json(foundUser);
    })
};

exports.removeUser = function(req, res, next) {
    // User has already been authorized
    var userEmailToBeRemoved = req.params.user_email;

    if (userEmailToBeRemoved) {
        try {
            User.remove({ email: userEmailToBeRemoved }, function(err) {
                if (err) {
                    return next(err);
                }
                // Respond to request indicating user was created
                res.send("Successfully removed");
            });
        } catch (err) {
            return next();
        }
    } else {
        next();
    }
};

exports.updatePassword = function(req, res, next) {

}

exports.allUsers = function(req, res, next) {
    User.find({}, function(err, result) {
        res.json(result)
    })
};
