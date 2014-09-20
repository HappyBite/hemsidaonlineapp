// Reference site for this implementation
// http://rapiddg.com/blog/calling-rest-api-nodejs-script

var querystring = require('querystring');
//var https = require('https');
var http = require('http');

var host = 'api.hemsidaonline.se';

function performRequest(endpoint, method, data, success) {
	var dataString = JSON.stringify(data);
	var headers = {};

	if (method == 'GET') {
		endpoint += '?' + querystring.stringify(data);
	}
	else {
		headers = {
			'Content-Type': 'application/json',
			'Content-Length': dataString.length
		};
	}
	var options = {
		host: host,
		path: endpoint,
		method: method,
		headers: headers
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');

		var responseString = '';

		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log(responseString);
			//var responseObject = JSON.parse(responseString);
			//success(responseObject);
		});
	});

	req.write(dataString);
	req.end();
}

function login() {
	performRequest('/api/session', 'POST', {
		username: username,
		password: password,
		api_key_id: apiKey
	}, function(data) {
		sessionId = data.result.id;
		console.log('Logged in:', sessionId);
		//getCards();
	});
}

functionget(endPoint) {
	performRequest(endPoint, 'GET', {

}, function(data) {
	console.log('Fetched ' + data);
});
}

get('/v1/sites/5');
//get('/v1/sites/5/posts/store-product');