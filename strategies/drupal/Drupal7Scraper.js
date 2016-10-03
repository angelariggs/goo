'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'www.drupal.org'
};

function Scrape(html, n) {
  // Pass in the HTML document to Cheerio
  var $ = cheerio.load(html);
  // The chain of selectors is necessary to target the desired selectors,
  // which are 'field-name-body' and/or 'field-name-comment-body'.
  // The '^=' targets a selector that starts with that class name, and
  // the '*=' targets a selector that ends with that class name
  var answer = $('#content .content div[class^="field field-name-"][class*="-body"]').eq(n);
  if (answer.length == 0) {
    return [{'type': 'text', 'text': 'Sorry, no answer found'}];
  }
  var output = [];
  answer.find('.field-item').children().each(function(i, el) {
    // If the text has the <pre> attribute, output the text with the 'code' pretty print
    // Otherwise, output it with the 'text' pretty print.
    // The pretty print options are set in /helpers/chalk/ChalkHelper.js
    output.push({'type': el.tagName == 'pre' ? 'code' : 'text', 'text': $(el).text().trim()});
  });
  return output;
}