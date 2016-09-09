var assert = require('chai').assert;
var fs = require('fs');
var wikipedia = require('../../strategies/wikipedia/WikipediaScraper');

describe('WikipediaScraper', function() {
  it('Should have the wikipedia domain publicly accessible', function() {
    assert.equal(wikipedia.Domain, "en.wikipedia.org")
  });

  it('Should return empty array if no results are found', function() {
    var output = wikipedia.Scrape('', false);
    assert.equal(output.length, 0);
  });

  it('Should return an array of objects if answer is found', function() {
    var testdata = fs.readFileSync('./test/wikipedia/wiki_answer_testdata.html', 'utf8');
    var output = wikipedia.Scrape(testdata, false);
    assert.isAbove(output.length, 0);
    assert.isTrue((output[0].hasOwnProperty('text')));
    assert.isTrue((output[0].hasOwnProperty('type')));
    assert.notInclude(output[0].text, 'In the United States around the end of the 19th century,')
  });

  it('Should return the second paragraph ', function() {
    var testdata = fs.readFileSync('./test/wikipedia/wiki_answer_testdata.html', 'utf8');
    var output = wikipedia.Scrape(testdata, true);
    assert.isAbove(output.length, 0);
    assert.isTrue((output[0].hasOwnProperty('text')));
    assert.isTrue((output[0].hasOwnProperty('type')));
    assert.include(output[0].text, 'In the United States around the end of the 19th century,')

  })
});

