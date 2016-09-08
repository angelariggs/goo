'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'en.wikipedia.org'
};

function Scrape(html, more) {
  console.log('I AM SCRAPING')
	var $ = cheerio.load(html);
	var content = $('#mw-content-text');
	var para = content.find('p').eq(more ? 1 : 0);
	if(para.length == 0) {
		return [{'type': 'text', 'text': 'Sorry, no answer found'}];
	}
  console.log('PARA', para.text())
	return [{'type': 'text', 'text': para.text()}];
}
