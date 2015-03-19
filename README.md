Moving Mean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes a moving arithmetic mean (sliding window average) over an array.


## Installation

``` bash
$ npm install compute-mmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mmean = require( 'compute-mmean' );
```

#### mmean( arr, window[, options] )

Slides a `window` over a numeric `array` to compute a moving mean. For numeric `arrays`,

``` javascript
var data = [ 1, 2, 3, 4, 5 ];

var arr = mmean( data, 2 );
// returns [ 1.5, 2.5, 3.5, 4.5 ]
```

The function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the computed means. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.

To mutate the input `array` (e.g. when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 1, 2, 3, 4, 5 ];

var values = mmean( arr, 2, {
	'copy': false
});
//returns [ 1.5, 2.5, 3.5, 4.5 ]

console.log( arr === values );
//returns true
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values.

``` javascript
var arr = [
	{'x':1},
	{'x':2},
	{'x':3},
	{'x':4}
];

function getValue( d ) {
	return d.x;
}

var values = mmean( arr, 2, {
	'accessor': getValue
});
// returns [ 1.5, 2.5, 3.5 ]
```

Note: the returned `array` has length `L - W + 1`, where `L` is the length of the input `array` and `W` is the `window` size. 


## Examples

``` javascript
var mmean = require( 'compute-mmean' );

var data = new Array( 50 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

var values = mmean( data, 7 );
console.log( values.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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
$ make view-cov
```

---
## License

[MIT license](http://opensource.org/licenses/MIT). 


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
