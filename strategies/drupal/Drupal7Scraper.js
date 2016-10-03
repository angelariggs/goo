'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'www.drupal.org'
};

function Scrape(html, n) {
  // Pass in the HTML document to Cheerio
  var $ = cheerio.load(html);
  var answer = $('#content .content div[class^="field field-name-"][class*="-body"]').eq(n);
  if (answer.length == 0) {
    return [{'type': 'text', 'text': 'Sorry, no answer found'}];
  }
  var output = [];
  answer.find('.field-item').children().each(function(i, el) {
    output.push({'type': el.tagName == 'pre' ? 'code' : 'text', 'text': $(el).text().trim()});
  });
  return output;
}