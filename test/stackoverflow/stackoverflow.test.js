var assert = require('chai').assert;
var fs = require('fs');
var stackoverflow = require('../../strategies/stackoverflow/StackOverflowScraper');

describe('StackOverflowScraper', function() {
  it("Should have the SO domain publicly accessible", function() {
    assert.equal(stackoverflow.Domain, "stackoverflow.com")
  });

  it('Should apologize if no results are found', function() {
    var output = stackoverflow.Scrape("", false);
    assert.equal(output.length, 1);
    assert.equal(output[0].text, "Sorry, no answer found")
  });

  it('Should return an array of objects if answer is found', function() {
    var testdata = fs.readFileSync('./test/stackoverflow/so_answer_testdata.html', 'utf8');
    var output = stackoverflow.Scrape(testdata);
    assert.isAbove(output.length, 1);
    assert.isTrue((output[0].hasOwnProperty('text')));
    assert.isTrue((output[0].hasOwnProperty('type')));
  })
});

