/**
*
*	COMPUTE: mmean
*
*
*	DESCRIPTION:
*		- Compute a moving mean (sliding window average) over an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014-2015. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isFunction = require( 'validate.io-function' );


// MOVING MEAN //

/**
* FUNCTION: mmean( arr, W[, options] )
*	Computes a moving mean over an array.
*
* @param {Array} arr - input array
* @param {Number} W - size of moving window
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array of window means
* @returns {Array} array of window mean values
*/
function mmean( arr , W, options ) {
	var copy = true,
		clbk;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'mmean()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( !isPositiveInteger( W ) ) {
    	throw new TypeError( 'mmean()::invalid input argument. Window must be a positive integer. Value: `' + W + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'mmean()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'accessor' ) ) {
			clbk = options.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'mmean()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( options.hasOwnProperty( 'copy' ) ) {
			copy = options.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'mmean()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	if ( W > arr.length ) {
		throw new Error( 'mmean()::invalid input argument. Window cannot exceed the array length.' );
	}

	var len = arr.length,
		delta = 0,
		mu = 0,
		dropVal = 0,
		out;

	if ( copy && !clbk ) {
		// Case 1: numeric array and return a copy...
		len = len - W + 1;
		out = new Array( len );

		// Calculate the mean for the first window...
		for ( var i = 0; i < W; i++ ) {
			delta = arr[ i ] - mu;
			mu += delta / (i+1);
		}
		out[ 0 ] = mu;

		// Calculate means for the remaining windows...
		for ( var j = 0; j < len-1; j++ ) {
			delta = arr[ j+W ] - arr[ j ];
			mu += delta / W;
			out[ j+1 ] = mu;
		}
		return out;
	} 
	else if ( clbk ) {
		if ( copy ) {
			// Case 2: non-numeric array and return a copy...
			out = new Array( len );
			for ( var i = 0; i < len; i++ ) {
				out[ i ] = clbk( arr[i] );
			}
		} else {
			// Case 3: non-numeric array and mutate the input array...
			out = arr;
			for ( var i = 0; i < len; i++ ) {
				out[ i ] = clbk( arr[i] );
			}
		}
	} 
	else {
		// Case 4: numeric array and mutate the input array...
		out = arr;
	}

	len = len - W + 1;

	// Calculate the mean for the first window...
	for ( var i = 0; i < W; i++ ) {
		delta = out[ i ] - mu;
		mu += delta / (i+1);
	}
	dropVal = out[ 0 ];
	out[ 0 ] = mu;

	// Calculate means for the remaining windows...
	for ( var j = 1; j < len; j++ ) {
		delta = out[ j+W-1 ] - dropVal;
		mu += delta / W;
		dropVal = out[ j ];
		out[ j ] = mu;
	}

	// Trim the output array:
	out.length = len;
	return out;
	
} // end FUNCTION mmean()

// EXPORTS //

module.exports = mmean;
