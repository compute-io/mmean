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
*	Copyright (c) 2014. Rebekah Smith.
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
* FUNCTION: mmean( arr , W[, options] )
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
		clbk,
		len,
		mu,
		dropVal,
		out;

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
		out = new Array( len-W+1 ),
		mu = 0,
		delta,
		k;

	// Compute the mean for the first window...
	for ( var i = 0; i < W; i++ ) {
		delta = arr[ i ] - mu;
		mu += delta / (i+1);
	}
	out[ 0 ] = mu;

	// Compute the remaining window means...
	for ( var j = W; j < len; j++ ) {
		k = j - W;
		delta = arr[ j ] - arr[ k ];
		mu +=  delta / W;
		out[ k+1 ] = mu;
	}
	return out;
	
} // end FUNCTION mmean()

// EXPORTS //

module.exports = mmean;
