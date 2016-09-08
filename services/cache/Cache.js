'use strict';

module.exports = {
	init: init,
	get: get
};

var crypt = require('crypto');
var fs = require('fs');
var os = require('os');
var request = require('request');

var GOO_CACHE_DIR = os.homedir() + '/.goo_cache/';

function init() {
	// Creates cache directory if necessary and cleans old files from it
	if(!fs.existsSync(GOO_CACHE_DIR)) {
		fs.mkdirSync(GOO_CACHE_DIR);
	}

	cleanCache();
}

function cleanCache() {
	// Remove cache entries older than 7 days
	var files = fs.readdirSync(GOO_CACHE_DIR);
	var filename, stat;
	var cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
	for(var i = 0; i < files.length; i++) {
		filename = GOO_CACHE_DIR + files[0];
		stat = fs.statSync(filename);
		if(Date.parse(stat.ctime) < cutoff) {
			fs.unlinkSync(filename);
		}
	}
}

function get(url) {
	// Checks cache for url, and retrieves it if it's not present
	console.log('getting ', url);
	var cached = getCachedVersion(url);
	if(cached != null) {
		console.log('found in cache');
		return cached;
	}
	request(url, function(error, response, body) {
		saveCachedVersion(url, body);
	});
}

function getCachedVersion(url) {
	// Returns contents of cache file for URL if it exists, otherwise null
	var path = cacheFilenamePath(url);
    if(fs.existsSync(path)) {
    	return fs.readFileSync(path, 'utf8');
    }
    return null;
}

function cacheFilenamePath(url) {
    return GOO_CACHE_DIR + crypto.createHash('md5').update(url).digest('hex');
}

function saveCachedVersion(url, contents) {
	console.log('saving cache for ', url);
	fs.writeFileSync(cacheFilenamePath(url), contents);
}
