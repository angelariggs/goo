#!/usr/bin/env node
'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');
var Services = require('./services');
var Strategies = require('./strategies');

var request = require('request');
var ChalkHelper = require('./helpers').ChalkHelper;


var url = 'http://stackoverflow.com/questions/1634115/whats-the-difference-between-git-reset-hard-and-git-reset-merge?noredirect=1&lq=1';
request(url, function(error, request, body) {
  prettyPrint(Strategies.StackOverflow.Scrape(body));
});
url = 'https://en.wikipedia.org/wiki/Tito%E2%80%93Stalin_Split';
request(url, function(error, request, body) {
  prettyPrint(Strategies.Wikipedia.Scrape(body));
});


Services.Cache.init();
Services.Cache.get('http://www.google.com').then(function() {
  console.log('ALEX RULES');
});


switch(process.env.QUERY) {
  case 'again':
    // Services.Again();
    break;
  case 'more':
    // Services.More();
    break;
  default:
    // Services.Goo(process.env.QUERY);
}



function prettyPrint(results) {
  //Do some stuff to the output
  //Then print
  ChalkHelper.top();
  ChalkHelper.question();
  results.forEach(function(result) {
    if (result.type === 'code') {
      ChalkHelper.code(result.text);
    } else {
      ChalkHelper.text(result.text);
    }
  });
  ChalkHelper.bottom();

  ChalkHelper.hide('Never trust a big butt and a smile.');
}
