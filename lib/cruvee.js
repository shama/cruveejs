/**
 * CruveeNode
 * 
 * @author Kyle Robinson Young <kyle at dontkry.com>
 * @copyright 2011 Kyle Robinson Young
 * @requires http, php.js
 */
var http = require('http'),
	php = require('./php.js');

/**
 * @class cruvee
 */
var cruvee = exports;

/**
 * Defaults
 */
cruvee.appId = null;
cruvee.appSecret = null;
cruvee.appUrl = 'apiv1.cruvee.com';
cruvee.http = http;

/**
 * @class cruvee.setAuth
 */
cruvee.setAuth = function(appId, appSecret) {
	cruvee.appId = appId;
	cruvee.appSecret = appSecret;
};

/**
 * @class cruvee.varieties
 */
cruvee.varieties = function(params, func) {
	var uri = '/search/varieties/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class cruvee.regions
 */
cruvee.regions = function(params, func) {
	var uri = '/search/regions/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class cruvee.wineries
 */
cruvee.wineries = function(params, func) {
	var uri = '/search/wineries/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class cruvee.brands
 */
cruvee.brands = function(params, func) {
	var uri = '/search/brands/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class cruvee.wines
 */
cruvee.wines = function(params, func) {
	var uri = '/search/wines/all';
	cruvee.request(uri, params, function(json) {
		func.apply(this, [json]);
	});
	return;
};

/**
 * @class cruvee.locations
 */
cruvee.locations = function(params, func) {
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
	var options = {
		host: this.appUrl,
		port: 80,
		path: uri,
		headers: {
			'Connection': 'close',
			'User-Agent': 'CruveeJS',
			'Authorization': this.getAuth(uri)
		}
	};
	var req = this.http.get(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			func.apply(this, [chunk]);
		});
	});
}