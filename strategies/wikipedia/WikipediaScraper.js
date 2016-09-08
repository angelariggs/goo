'use strict';

var cheerio = require('cheerio');

module.exports = {
  Scrape: Scrape,
  Domain: 'wikipedia.org'
};

function Scrape(html, more) {
	var $ = cheerio.load(html);
	var content = $('#mw-content-text');
	var para = content.find('p').eq(more ? 1 : 0);
	if(para.length == 0) {
		return [{'type': 'text', 'text': 'Sorry, no answer found'}];
	}
	return [{'type': 'text', 'text': para.text()}];
}
