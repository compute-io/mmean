/* global describe, it, require */
'use strict';

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

	it( 'should throw an error if provided a window size which is not a positive integer', function test() {
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

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmean( [], value );
			};
		}
	});

	it( 'should throw an error if the window size exceeds the array size', function test() {
		var data = [ 1, 2, 3 ];

		expect( foo ).to.throw( Error );

		function foo() {
			mmean( data, data.length+1 );
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmean( [1,2,3,4,5], 2, value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmean( [1,2,3,4,5], 2, {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmean( [1,2,3,4,5], 2, {'copy': value} );
			};
		}
	});

	it( 'should not mutate the input array by default', function test() {
		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 1 ];

		actual = mmean( data, 3 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should compute a moving mean', function test() {
		// Case 1: numeric, copy
		var data, actual, expected, W;

		// Define a window size:
		W = 3;

		//Trivial case:
		data = [ 1, 2, 3];
		expected = [ 2 ];
		actual = mmean( data, W );

		assert.deepEqual( actual, expected );

		//Extended case:
		data = [ 3, 2, 4, 6, 8, 7, 9, 5, 1, 3 ]
		expected = [ 3, 4, 6, 7, 8, 7, 5, 3 ];
		actual = mmean( data , W );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});


	it( 'should compute a moving mean using an accessor function', function test() {
		// Case 2: accessor, copy
		var data, actual, expected, W;

		W = 3;
		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4},
			{'x':5},
			{'x':6}
		];

		function getValue( d ) {
			return d.x;
		}

		expected = [ 2, 3, 4, 5 ];

		actual = mmean( data, W, {'accessor': getValue} );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should compute a moving mean and mutate the input array', function test() {
		// Case 4: numeric, mutate
		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 1 ];

		actual = mmean( data, 3, {'copy':false} );
		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

	it( 'should compute a moving mean using an accessor and mutate the input array', function test() {
		// Case 3: accessor, mutate
		var data, expected, actual;

		data = [
			[0,1],
			[1,1],
			[2,1]
		];
		expected = [ 1 ];

		function getValue( d ) {
			return d[ 1 ];
		}

		actual = mmean( data, 3, {
			'copy': false,
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

});
