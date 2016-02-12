var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

module.exports = (function(){
	return {
		getStatus: function (req, res){
			console.log("get status OK")
			// console.log("########## REQ ###########", req, "############ END ################")
			console.log("SESSIONID", req.sessionID)
			console.log("req.user", req.user)
			console.log("USER", req.session.passport.user)
			console.log("req.session:", req.session)
			console.log("req.session.passport:", req.session.passport)
			return res.json(req.user)
		},
		register: function (req, res){
			var user_name = new User({username: req.body.username, name: req.body.name});
			var user_pw = req.body.password

			// console.log("User to be added/updated to DB", req.body)

			User.register(user_name, user_pw, function(err, result){
				if(err){
					console.log(err)
					return res.status(500).json({err: err})
				}
				passport.authenticate('local')(req, res, function(){
					return res.status(200).json({status: 'Registration successful'})
				});
			});
		},
		login: function(req, res, next){
			passport.authenticate('local', function(err, user, info){
				if (err) { return next(err) }
				if (!user) {
					return res.status(401).json({err: info})
				}
				req.logIn(user, function(err){
					if (err) {
						return res.status(500).json({err: 'Could not log in user'})
					}
					res.status(200).json({status: 'Login successful'})
				});
			})(req, res, next);
		},
		logout: function(req, res){
			console.log("###### logout ########", req.body)
			req.logout();
			res.status(200).json({status: 'Bye!'})
		}
	}
})();

