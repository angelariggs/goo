#!/usr/bin/env node
'use strict';

var query = process.argv.slice(2).join(' ');

var request = require('request');

var Services = require('./services');
var Strategies = require('./strategies');

Services.Cache.init();


switch(query) {
  case 'expand':
    break;
  case 'again':
    Services.Google.Again();
    break;
  case 'more':
    Services.Google.More();
    break;
  default:
    Services.Google.Search(query, 0);
}
