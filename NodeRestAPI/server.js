// server.js

// BASE SETUP
// =============================================================================
const crypto = require('crypto');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;        // set our port
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/encrypt/:message')
	.post(function(req, res) {     
		console.log("request received");
		const cipher = crypto.createCipher('aes192', 'a password');
		var encrypted = '';
		cipher.on('readable', () => {
			var data = cipher.read();
			if (data)
				encrypted += data.toString('hex');
				res.send( new Buffer( encrypted, 'binary' ) );
			});
			cipher.on('end', () => {
				console.log("request processed successfully");
			    // res.json({ message: encrypted });
			});
			cipher.write(req.params.message);
			cipher.end();
		});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

