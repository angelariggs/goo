'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'en.wikipedia.org'
};

function Scrape(html, n) {
  var $ = cheerio.load(html);
  var para = $('#mw-content-text > p').eq(n);
  if(para.length == 0) {
    return [{'type': 'text', 'text': 'Sorry, no answer found'}];
  }
  return [{'type': 'text', 'text': para.text()}];
}
