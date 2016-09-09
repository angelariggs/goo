#!/usr/bin/env node
'use strict';

var query = process.argv.slice(2).join(' ');

var request = require('request');

var Services = require('./services');
var Strategies = require('./strategies');
var ChalkHelper = require('./helpers').ChalkHelper;

Services.Cache.init();


switch(query) {
  case 'again':
  // Services.Again();
    break;
  case 'more':
  // Services.More();
    break;
  default:
    Services.Google.Search(query).then(prettyPrint);
}



function prettyPrint(results) {
  //Do some stuff to the output
  //Then print
  results = results || [{'type': 'text', 'text': 'Sorry, no answer found'}];

  ChalkHelper.top();
  ChalkHelper.question(query);
  results.forEach(function(result) {
    if (result.type === 'code') {
      ChalkHelper.code(result.text);
    } else {
      ChalkHelper.text(result.text);
    }
  });
  ChalkHelper.bottom();
}
