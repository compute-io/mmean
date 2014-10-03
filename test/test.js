
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mmean', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( mmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmean( value , 3 );
			};
		}

	});

	it( 'should throw an error if not provided a positive, numeric, integer window size', function test() {
		var values = [
			'5',
			2.7,
			-3,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		var testdata = [3,5,6,8,7,5,4,3,2,5,6,7,8,5,4]

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmean( testdata , value );
			};
		}

	});

	it( 'should compute the mean in the window', function test() {
		var data, expected;

		// Simulate some data
		data = [ 2, 1, 3, 5, 7, 0, 2];

		// Expected values of sum in the moving window
		expected = [2, 3, 5, 4, 3];

		var testOut = mmean ( data , 3 );

		for ( var i = 0; i < expected.length; i++ ) {
			assert.strictEqual( testOut[i], expected[i] );
		}
	});

}); // end test descriptions