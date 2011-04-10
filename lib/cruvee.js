/**
 * CruveeNode
 * 
 * @author Kyle Robinson Young <kyle at dontkry.com>
 * @copyright 2011 Kyle Robinson Young
 */
var http = require('http'),
	php = require('./php.js');

/**
 * @class cruvee
 */
var cruvee = {
	appId: null,
	appSecret: null,
	appUrl: 'apiv1.cruvee.com'
};

/**
 * @class exports.setAuth
 */
exports.setAuth = function(appId, appSecret) {
	cruvee.appId = appId;
	cruvee.appSecret = appSecret;
};

/**
 * @class exports.varieties
 */
exports.varieties = function(params, func) {
	var uri = '/search/varieties/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class exports.regions
 */
exports.regions = function(params, func) {
	var uri = '/search/regions/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class exports.wineries
 */
exports.wineries = function(params, func) {
	var uri = '/search/wineries/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class exports.brands
 */
exports.brands = function(params, func) {
	var uri = '/search/brands/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class exports.wines
 */
exports.wines = function(params, func) {
	var uri = '/search/wines/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class exports.locations
 */
exports.locations = function(params, func) {
	var uri = '/search/locations/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
}

/**
 * Build Authorization header value
 * @class cruvee.getAuth
 * @return string
 */
cruvee.getAuth = function(uri) {
	var timestamp = new Date().getTime();
	var sig = this.appId + "\n";
	sig += 'GET' + "\n";
	sig += this.appSecret + "\n";
	sig += timestamp + "\n";
	sig += uri + "\n";
	sig = php.md5(sig.toLowerCase());
	return 'Cruvee appId="' + this.appId + '", sig="' + sig + '", timestamp="' + timestamp + '", uri="' + uri + '"';
}

/**
 * Submit request to cruvee api
 * @class cruvee.request
 */
cruvee.request = function(uri, params, func) {
	var params_str = '';
	if (params) {
		for (var i in params) {
			params_str += i+'='+params[i]+'&';
		}
	}
	params = '?fmt=json&'+params_str;
	var client = http.createClient(80, this.appUrl);
	var req = client.request('GET', uri+params, {
		'Host': this.appUrl,
		'Connection': 'close',
		'User-Agent': 'CruveeNode',
		'Authorization': this.getAuth(uri)
	});
	req.end();
	req.on('response', function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			func.apply(this, [chunk]);
		});
	});
}
