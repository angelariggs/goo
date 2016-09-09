#!/usr/bin/env node
'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');

var request = require('request');

var Services = require('./services');
var Strategies = require('./strategies');
var ChalkHelper = require('./helpers').ChalkHelper;

Services.Cache.init();


switch(process.env.QUERY) {
  case 'expand':

    break;
  case 'again':
    lastRequest();
    break;
  case 'more':
    lastRequest(true);
    break;
  default:
    Services.Cache.writeLastRequest(process.env.QUERY, 0);
    Services.Google.Search(process.env.QUERY, 0).then(ChalkHelper.prettyPrint);
}

function lastRequest(next) {
  var last_query = Services.Cache.getLastRequest();
  if (last_query == null) {
    return console.log('No Last Query! IDIOT');
  }

  if (next) {
    Services.Google.Search(last_query.query, last_query.n + 1).then(ChalkHelper.prettyPrint);
    Services.Cache.writeLastRequest(last_query.query, last_query.n + 1)
  } else {
    Services.Google.Search(last_query.query, last_query.n).then(ChalkHelper.prettyPrint);
  }
}
