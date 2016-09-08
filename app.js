'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');
var Services = require('./services');
var Strategies = require('./strategies');
var request = require('request');
var url = 'http://stackoverflow.com/questions/1634115/whats-the-difference-between-git-reset-hard-and-git-reset-merge?noredirect=1&lq=1';
request(url, function(error, request, body) {
  console.log(Strategies.StackOverflow.Scrape(body));
});

var print = require('node-print');

switch(process.env.QUERY) {
  case 'again':
    // Services.Again();
    console.log('AGAIN!');
    break;
  case 'more':
    // Services.More();
    console.log('MORE!');
    break;
  default:
    console.log('YOU ASKED: ', process.env.QUERY);
    // Services.Goo(process.env.QUERY);
}



function prettyPrint(out) {
  //Do some stuff to the output
  //Then print
}
