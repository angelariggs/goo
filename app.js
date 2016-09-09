#!/usr/bin/env node
'use strict';

var query = process.argv.slice(2).join(' ').trim();
var request = require('request');
var Services = require('./services');
var Strategies = require('./strategies');

Services.Cache.init();

switch(query) {
  case 'again':
    Services.Google.Again();
    break;
  case 'more':
    Services.Google.More();
    break;
  case '':
    console.log('For documentation, type "man goo". If you want to run a search, type "goo <query>"');
    break;
  default:
    Services.Google.Search(query, 0);
}
