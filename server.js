var express = require('express');
var path = require('path');
var bp = require('body-parser');

var app = express();

// Path for Static Content
app.use(express.static(path.join(__dirname, './client/static')));

// Declare body parser for URL and JSON; allows to POST data from both URL and JSON
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

// require the mongoose config file to load DB
// NOTE: ALWAYS load before routes.js
// DB needs to be connected before routes can be established
require('./server/config/mongoose.js');
// this line requires and runs the code frokm our routes.js file
// and passes it 'app' so that we can attach our routing rules
// to our express application
require('./server/config/routes.js')(app)

app.listen(8000, function(){
	console.log("listening on port 8000");
});
