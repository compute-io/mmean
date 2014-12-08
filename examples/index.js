'use strict';

var mmean = require( './../lib' );

// Simulate some data...
var data = new Array( 50 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

// Compute the moving mean:
var arr = mmean( data, 7 );

console.log( arr.join( '\n' ) );
