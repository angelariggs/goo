'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');
var Services = require('./services');
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
