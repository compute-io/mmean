/**
*
*	COMPUTE: mmean
*
*
*	DESCRIPTION:
*		- Compute a moving mean (sliding window average) over a numeric array.
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

// MOVING MEAN //

/**
* FUNCTION: mmean( arr , window )
*	Computes a moving mean over a numeric array.
*
* @param {Array} arr - array of data values
* @param {Number} window - size of moving window
* @returns {Array} array of window mean values
*/
function mmean( arr , W ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'mmean()::invalid input argument. Must provide an array.' );
	}
	if ( typeof W !== 'number' || W !== W ) {
        throw new TypeError( 'mmean()::invalid input argument. Window must be numeric.' );
    }
    if ( Math.floor( W ) !== W || W < 1 ) {
        throw new TypeError( 'mmean()::invalid input argument. Window must be a positive integer.' );
    }
	if ( W > arr.length ) {
		throw new TypeError( 'mmean()::invalid input argument. Window cannot exceed the array length.' );
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
