'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'https://api.drupal.org/api/drupal/7.x'
};

function Scrape(html, n) {
  // Pass in the HTML document to Cheerio
  var $ = cheerio.load(html);
  var answer = $('.content').eq(n);
  if(answer.length == 0) {
    return [{'type': 'text', 'text': 'Sorry, no answer found'}];
  }
  var output = [];
  answer.find('p').children().each(function(i, el) {
    // If the DOM element is 'pre', return Chalk code formatting
    // Otherwise, return text formatting and trim it
    output.push({'type': el.tagName == 'pre' ? 'code' : 'text', 'text': $(el).text().trim()});
  });
}