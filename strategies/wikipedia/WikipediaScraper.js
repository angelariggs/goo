'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'en.wikipedia.org'
};

function Scrape(html, n) {
  var $ = cheerio.load(html);
  var content = $('#mw-content-text').children();
  var i = 0;
  var offset = 0;
  var output;
  do {
    output = getChunk(content.slice(offset));
    offset += output.count;
    i++;
  } while(i <= n);
  return output.output;
}

function getChunk(nodes) {
  var output = [];
  var length = 0;
  var count = 0;
  nodes.each(function(i, el) {
    count++;
    if(el.tagName == 'div' || el.tagName == 'table') {
      return;
    }
    var text = cheerio(el).text();
    output.push({'type': 'text', 'text': text});
    length += text.length;
    if(length > 1000) {
      return false;
    }
  });
  return {
    output: output,
    count: count
  };
}
