'use strict';

var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var htmlentities = require('html-entities').AllHtmlEntities;
var Strategies = require('../../strategies');
var Cache = require('../cache/Cache');


module.exports = {
  Search: Search
};

function Search(query, n) {
  query = query.replace(/ /g, '_');
  var url = 'https://google.com/search?q=' + query;
  return Cache.get(url)
  .then(function(results) {
    return results;
  })
  .then(filterResults)
  .then(function(results) {
    if (results.length === 0) {
      return null;
    }
    return getResultHTML(results[n] || results[0]);
  });
}

function getResultHTML(result) {
  return Cache.get(result.href).then(function(data) {
    for (var strat in Strategies) {
      if (Strategies[strat].Domain === result.hostname) {
        return Strategies[strat].Scrape(data);
      }
    }
  });
}

function filterResults(html) {
  var $ = cheerio.load(html);
  var allResults =  $('.g .r a[href^="/url"]');
  var filteredResults = [];

  allResults.each(function(i, el) {
    var urlObj = getUrlFromResult(el);
    for (var service in Strategies) {
      if (urlObj.host.indexOf(Strategies[service].Domain) != -1) {
        filteredResults.push(urlObj);
      }
    }
  });
  return filteredResults;
}

function getUrlFromResult(el) {
  var x = htmlentities.decode(el.attribs.href);
  var decodedUrl = url.parse(htmlentities.decode(el.attribs.href), true);
  return url.parse(decodedUrl.query.q);
}
