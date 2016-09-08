'use strict';

process.env.QUERY = process.argv.slice(2).join(' ');

console.log(process.env.QUERY);
