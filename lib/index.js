/**
*
*	COMPUTE: mmean
*
*
*	DESCRIPTION:
*		- Compute the arithmetic mean of values in a window moving through a numeric array.
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

(function() {
	'use strict';

    /**
    * FUNCTION: getArray(x)
    *   Returns an array pre-initialized to 0.
    * 
    * @private
    * @param {Number} x - array size
    * @returns {Array} array
    */
    function getArray(x) {
        var array = new Array(x);
        for (var i = 0; i < x; i++) {
            array[i] = 0;
        }
        return array;
    } // end FUNCTION getArray()

	/**
	* FUNCTION: mmean( arr , window )
	*	Computes the mean over an array of values.
	*
	* @param {Array} arr - array of data values.
	* @param {Number} window - size of moving window.
	* @returns {Array} array of window mean values.
	*/
	function mmean( arr , window ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mmean::invalid input argument. Must provide an array.' );
		}
		if ( typeof window !== 'number' || window !== window) {
            throw new TypeError( 'mmean()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( window ) !== window ) {
            throw new TypeError( 'mmean()::invalid input argument. Window must be an integer value.' );
        }
		if ( window > arr.length ) {
			throw new TypeError( 'mmean()::invalid input argument. Window must be <= array size.' );
		}
		if ( window <= 0 ) {
			throw new TypeError( 'mmean()::invalid input argument. Window size must be > 0.' );
		}

		var lenIn = arr.length,
			W = window,
			lenOut = arr.length - W + 1,
			outArr = getArray(lenOut),
			winMean = 0;

		for ( var i = 0; i < W; i++ ) {
			winMean += arr[i] / W;
			}

		outArr[0] = winMean;

		for ( var i = W; i < lenIn; i++ ) {
			winMean = winMean + ( arr[i] - arr[i-W] ) / W;
			outArr[i-W+1] = winMean;
			}		

		return outArr;
	} // end FUNCTION mmean()

	// EXPORTS //

	module.exports = mmean;

})();