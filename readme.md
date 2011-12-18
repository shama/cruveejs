# cruveejs: A Cruvee API Wrapper for NodeJS

Cruvee is an open-source approach to quality wine data provided by a flexible and powerful family of APIs.

[http://developer.cruvee.com/](http://developer.cruvee.com/)

## Requirements

NodeJS, Cruvee API Credentials

## Installing

With [npm](http://npmjs.org):

	npm install cruvee

Without npm:

- Download/extract or git submodule this repo to a 'cruvee' folder whereever needed.
- `var cruvee = require('./cruvee/index');`

## Usage

First set your auth credentials:

	cruvee.setAuth('appId', 'appSecret');

Then grab some wine data:

	cruvee.locations({
		lat: 38.950933,
		long: -122.723052,
		radius: 50
	}, function(json_response) {
		console.log(json_response);
	});

All the methods have 2 parameters. The first is an object to query Cruvee, the second is a callback function with the only param returned is the response in JSON.

APIs currently supported:

- cruvee.varieties({}, function(json) { console.log(json); });
- cruvee.regions({}, function(json) { console.log(json); });
- cruvee.wineries({}, function(json) { console.log(json); });
- cruvee.brands({}, function(json) { console.log(json); });
- cruvee.wines({}, function(json) { console.log(json); });
- cruvee.locations({}, function(json) { console.log(json); });

## Tests

Uses [nodeunit](https://github.com/caolan/nodeunit). In the base folder run the command `nodeunit test`

## Issues

Please report any issues you have with the plugin to the [issue tracker](http://github.com/shama/cruveejs/issues) on github.

## License

cruveejs is offered under an [MIT license](http://www.opensource.org/licenses/mit-license.php).

## Copyright

2011 Kyle Robinson Young, [dontkry.com](http://dontkry.com) in association with Everflight, [everflight.com](http://everflight.com}
If you found this release useful please let the author know! Follow on [Twitter](http://twitter.com/kyletyoung)

## Roadmap / Known Issues

- Finish writing tests
- When it fails, it fails poorly. Need to add some proper error handling.

