'use strict';

var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var htmlentities = require('html-entities').AllHtmlEntities;
var Strategies = require('../../strategies');



module.exports = {
    Search: Search
};

function Search(query) {
    var options = {
        url: 'https://google.com/search?q=' + query
    };
    
    request(options, searchCallback)
}


function searchCallback(err, resp, body) {
    if (err) {
        //TODO
        console.log('HANDLE THE ERRORS: ' + err);
        return
    }

    if (resp.statusCode == 200) {
        getResultHTML(filterResults(body));
    }
}

function getResultHTML(results) {
    if (results.length < 1) return false;

    //TODO make this robust forever. Or at least just do something better than picking first result
    var options = {
        url: results[0].href
    };

    request(options, function(err, resp, body) {
        switch(resp.request.host) {
            case 'stackoverflow.com':
                Strategies.StackOverflow.Scrape(body);
                break;
            case 'wikipedia.org':
                //Strategies.Wikipedia.Scrape(body);
                break;
            default:
                //Cry loudly for an adult
        }
    })
}

function filterResults(html) {
    var $ = cheerio.load(html);
    var allResults =  $('.g > h3 > a');
    var filteredResults = [];

    //TODO do all of this better idiot
    allResults.each(function(i, el) {
        //Skip the first because its not an actual result
        if (i != 0) {
          var urlObj = getUrlFromResult(el);
          for (var service in Strategies) {
              if (urlObj.host.indexOf(Strategies[service].Domain) != -1) {
                  filteredResults.push(urlObj)
              }
          }
        }
    });
    console.log(filteredResults);
    return filteredResults;
}

function getUrlFromResult(el) {
    var entities = new htmlentities();
    var decordedUrl = url.parse(entities.decode(el.attribs.href), true);
    return url.parse(decordedUrl.query.q);
}