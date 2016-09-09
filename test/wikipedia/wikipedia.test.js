var assert = require('chai').assert;
var fs = require('fs');
var wikipedia = require('../../strategies/wikipedia/WikipediaScraper');

describe('WikipediaScraper', function() {
  it("Should have the wikipedia domain publicly accessible", function() {
    assert.equal(wikipedia.Domain, "en.wikipedia.org")
  });

  it('Should apologize if no results are found', function() {
    var output = wikipedia.Scrape("", false);
    assert.equal(output.length, 1);
    assert.equal(output[0].text, "Sorry, no answer found")
  });

  it('Should return an array of objects if answer is found', function() {
    var testdata = fs.readFileSync('./test/wikipedia/wiki_answer_testdata.html', 'utf8');
    var output = wikipedia.Scrape(testdata, false);
    assert.equal(output.length, 1);
    assert.isTrue((output[0].hasOwnProperty('text')));
    assert.isTrue((output[0].hasOwnProperty('type')));
    assert.notInclude(output[0].text, 'Originally spaghetti was notably long')
  });

  it('Should return the second paragraph if true is second param to Scrape() ', function() {
    var testdata = fs.readFileSync('./test/wikipedia/wiki_answer_testdata.html', 'utf8');
    var output = wikipedia.Scrape(testdata, true);
    assert.equal(output.length, 1);
    assert.isTrue((output[0].hasOwnProperty('text')));
    assert.isTrue((output[0].hasOwnProperty('type')));
    assert.include(output[0].text, 'Originally spaghetti was notably long')

  })
});

