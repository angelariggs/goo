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
  console.log('OUR URL IS', url);
  return Cache.get(url)
    .then(function(results) {
      return results;
    })
    .then(filterResults)
    .then(function(results) {
      console.log('RESULT', results.length)
      return getResultHTML(results[n] || results[0]);
    });
}


function searchCallback(body) {
  return getResultHTML(filterResults(body));
}

function getResultHTML(result) {
    console.log('URL', result.href);

    return Cache.get(result.href).then(function(data) {
      console.log('SCRAPE SCRAPE', result.hostname);
      for (var strat in Strategies) {
        console.log('DOM', Strategies[strat].Domain);
        if (Strategies[strat].Domain === result.hostname) {
          console.log('FOUND STRAT');
          return Strategies[strat].Scrape(data);
        }
      }
    });
}

function filterResults(html) {
    var $ = cheerio.load(html);
    var allResults =  $('.g .r a[href^="/url"]');
    var filteredResults = [];


    //TODO do all of this better idiot
    allResults.each(function(i, el) {
        //Skip the first because its not an actual result
        console.log('EL', el);
          var urlObj = getUrlFromResult(el);
          for (var service in Strategies) {
              if (urlObj.host.indexOf(Strategies[service].Domain) != -1) {
                  filteredResults.push(urlObj);
                  console.log('FOUND VALID URL');
              }
        }
    });
    console.log('FILTERRESULTS', filteredResults);
    return filteredResults;
}

function getUrlFromResult(el) {
  // console.log('ANYTHING', el);
    // var entities = new htmlentities();
    // console.log('ENTITY', entities);
    var x = htmlentities.decode(el.attribs.href);
    var decodedUrl = url.parse(htmlentities.decode(el.attribs.href), true);
    return url.parse(decodedUrl.query.q);
}
