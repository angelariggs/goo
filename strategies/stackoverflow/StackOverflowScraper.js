'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'stackoverflow.com'
};

function Scrape(html, n) {
  var $ = cheerio.load(html);
  var answer = $('.answer').eq(n);
  if(answer.length == 0) {
    return [{'type': 'text', 'text': 'Sorry, no answer found'}];
  }
  var output = [];
  answer.find('.post-text').children().each(function(i, el) {
    output.push({'type': el.tagName == 'pre' ? 'code' : 'text', 'text': $(el).text().trim()});
  });
  return output;
}
