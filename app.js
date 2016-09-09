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
    Services.Google.Again().then(ChalkHelper.prettyPrint.bind(query));
    break;
  case 'more':
    Services.Google.More().then(ChalkHelper.prettyPrint.bind(query));
    break;
  default:
    Services.Google.Search(query, 0).then(ChalkHelper.prettyPrint.bind(query));
}
