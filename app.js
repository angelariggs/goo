'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');
var Services = require('./services');
var Strategies = require('./strategies');
var request = require('request');
var chalk = require('chalk');
var print = require('node-print');

var code = function(text) {
  console.log(chalk.bold('\t \t' + text))
}

var text = function(t) {
  console.log('\t' + t);
}

var url = 'http://stackoverflow.com/questions/1634115/whats-the-difference-between-git-reset-hard-and-git-reset-merge?noredirect=1&lq=1';
request(url, function(error, request, body) {
  console.log(Strategies.StackOverflow.Scrape(body));
});
url = 'https://en.wikipedia.org/wiki/Tito%E2%80%93Stalin_Split';
request(url, function(error, request, body) {
  console.log(Strategies.Wikipedia.Scrape(body));
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
  console.log(chalk.bgCyan.underline('\t\t\t GOO \t\t\t\t'))
  text('Question: ' + process.env.QUERY);
  results.forEach(function(result) {
    if (result.type === 'code') {
      code(result.text);
    } else {
      text(result.text);
    }
  });
  console.log(chalk.bgCyan.underline('\t\t\t GOO FIN \t\t\t'))
}


var test = [
  {
    type: 'text',
    text: 'You want:'
  },
  {
    type: 'code',
    text: 'git rm --cached <added_file_to_undo>'
  },
  {
    type: 'text',
    text: 'Reasoning:'
  },
  {
    type: 'text',
    text: 'When I was new this, I first tried'
  },
  {
    type: 'code',
    text: 'git reset .'
  },
  {
    type: 'text',
    text: '(to undo my entire initial add), only to get this (not so) helpful message:'
  },
  {
    type: 'code',
    text: 'fatal: Failed to resolve "HEAD" as a valid ref'
  }
]

prettyPrint(test);
