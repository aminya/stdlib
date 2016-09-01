'use strict';

// MODULES //

var glob = require( 'glob' ).sync;
var resolve = require( 'path' ).resolve;
var stdlib = require( './stdlib.js' );
var cwd = require( stdlib+'@stdlib/utils/cwd' );
var copy = require( stdlib+'@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var linter = require( './lint.js' );
var IGNORE = require( './ignore_patterns.json' );


// LINT //

/**
* Synchronously lints filenames.
*
* @param {Options} options - function options
* @param {string} [options.dir] - root directory from which to search for files
* @param {string} [options.pattern='**\/*'] - filename pattern
* @returns {(ObjectArray|EmptyArray)} list of failing filenames
*
* @example
* var filenames = lint();
* // returns [...]
*/
function lint( options ) {
	var pattern;
	var names;
	var opts;
	var err;
	var dir;

	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.dir ) {
		dir = resolve( cwd(), opts.dir );
	} else {
		dir = cwd();
	}
	pattern = opts.pattern;

	opts = {
		'cwd': dir,
		'ignore': IGNORE,
		'nodir': true // do not match directories
	};
	names = glob( pattern, opts );
	return linter( names );
} // end FUNCTION lint()


// EXPORTS //

module.exports = lint;
