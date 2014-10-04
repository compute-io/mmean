mmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the arithmetic mean of values in a window moving through a numeric array.


## Installation

``` bash
$ npm install compute-mmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var mmean = require( 'compute-mmean' );
```


## Examples

``` javascript
var data = new Array( 50 );

for ( var i = 0; i < data.length; i++ ) {
	data[i] = Math.random() * 100;
}

// Give function array of data and desired window size
var outArr = mmean( data, 5 );

for ( i = 0; i < outArr.length; i++) {
	console.log( outArr[i] );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


[npm-image]: http://img.shields.io/npm/v/compute-mmean.svg
[npm-url]: https://npmjs.org/package/compute-mmean

[travis-image]: http://img.shields.io/travis/compute-io/mmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/mmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/mmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/mmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/mmean.svg
[dependencies-url]: https://david-dm.org/compute-io/mmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/mmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/mmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/mmean.svg
[github-issues-url]: https://github.com/compute-io/mmean/issues