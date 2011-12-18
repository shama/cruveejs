/**
 * Cruvee Test
 * 
 * @author Kyle Robinson Young <kyle at dontkry.com>
 * @copyright 2011 Kyle Robinson Young
 * @requires http, php.js
 */

var cruvee = require('../lib/cruvee');

/**
 * Do some mocking
 */
cruvee.mockReturnJson = false;
cruvee.http.get = function(options, callback) {
	var res = {
		setEncoding: function(encoding) { },
		on: function(type, callback) {
			switch (type) {
				case 'data':
					callback.apply(this, [cruvee.mockReturnJson]);
				break;
			}
		}
	};
	callback.apply(this, [res]);
};

/**
 * test setAuth
 */
exports['set auth'] = function(test) {
	cruvee.setAuth('1234', '123456');
	test.equal('1234', cruvee.appId);
	test.equal('123456', cruvee.appSecret);
	test.done();
};

/**
 * test request
 */
exports['request'] = function(test) {
	cruvee.mockReturnJson = '{"test":"Response from request."}';
	cruvee.request('/test', {}, function(result) {
		test.equal(cruvee.mockReturnJson, result);
		test.done();
	});
};

/**
 * test varieties
 *
exports['get varieties'] = function(test) {
	cruvee.request = function(uri, params, func) {
		func.apply(this, [uri, params]);
	};
	cruvee.varieties({}, function(uri, params) {
		test.equal('/search/varieties/all', uri);
	});
	test.done();
};*/