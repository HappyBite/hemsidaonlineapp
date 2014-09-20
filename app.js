// Reference site for this implementation
// http://rapiddg.com/blog/calling-rest-api-nodejs-script

var querystring = require('querystring');
var http = require('http');
var host = 'api.hemsidaonline.se';
var port = '555';

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
		port: port,
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

function get(endPoint) {
	performRequest(endPoint, 'GET', {

}, function(data) {
	console.log('Fetched ' + data);
});
}

get('/v1/sites/90');
//get('/v1/sites/5/posts/store-product');