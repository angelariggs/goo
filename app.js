#!/usr/bin/env node
'use strict';

var query = process.argv.slice(2).join(' ');

var request = require('request');

var Services = require('./services');
var Strategies = require('./strategies');
var ChalkHelper = require('./helpers').ChalkHelper;

Services.Cache.init();


switch(query) {
  case 'expand':

    break;
  case 'again':
    lastRequest();
    break;
  case 'more':
    lastRequest(true);
    break;
  default:
    Services.Cache.writeLastRequest(query, 0);
    Services.Google.Search(query, 0).then(prettyPrint);
}

function lastRequest(next) {
  var last_query = Services.Cache.getLastRequest();
  if (last_query == null) {
    return console.log('No Last Query! IDIOT');
  }

  if (next) {
    Services.Google.Search(last_query.query, last_query.n + 1).then(prettyPrint);
    Services.Cache.writeLastRequest(last_query.query, last_query.n + 1)
  } else {
    Services.Google.Search(last_query.query, last_query.n).then(prettyPrint);
  }
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
