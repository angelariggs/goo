'use strict';

module.exports = {
  init: init,
  getLastRequest: getLastRequest,
  get: get,
  writeLastRequest: writeLastRequest
};

var crypto = require('crypto');
var fs = require('fs');
var os = require('os');
var request = require('request');
var q = require('q');

var GOO_CACHE_DIR = os.homedir() + '/.goo_cache/';
var GOO_LAST_REQUEST = os.homedir() + '/.goo';

function init() {
  // Creates cache directory if necessary and cleans old files from it
  if(!fs.existsSync(GOO_CACHE_DIR)) {
    fs.mkdirSync(GOO_CACHE_DIR);
  }

  cleanCache();
}

function getLastRequest() {
  // Gets last query (if any) and how many times more has been called
  if(!fs.existsSync(GOO_LAST_REQUEST)) {
    return null;
  }
  var contents = fs.readFileSync(GOO_LAST_REQUEST, 'utf8').split('\n');
  return {
    query: contents[1],
    n: parseInt(contents[0])
  };
}

function writeLastRequest(query, n) {
  // Writes last query and how many times more has been called to .goo file
  var contents = n + '\n' + query;
  fs.writeFileSync(GOO_LAST_REQUEST, contents);
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
  var def = q.defer();
  var cached = getCachedVersion(url);
  if(cached != null) {
    def.resolve(cached);
  } else {
    request(url, function(error, response, body) {
      if (error) {
        console.log('ERROR:', error);
        def.reject(error);
      } else {
        saveCachedVersion(url, body);
        def.resolve(body);
      }
    });
  }

  return def.promise;
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
  fs.writeFileSync(cacheFilenamePath(url), contents);
}
