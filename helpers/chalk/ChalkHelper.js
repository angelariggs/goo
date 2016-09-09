'use strict';

var chalk = require('chalk');
module.exports = {
  prettyPrint: prettyPrint
}

function prettyPrint(results) {
    //Do some stuff to the output
    //Then print
    results = results || [{'type': 'text', 'text': 'Sorry, no answer found'}];

    top();
    question(process.env.QUERY);
    results.forEach(function(result) {
      if (result.type === 'code') {
        code(result.text);
      } else {
        text(result.text);
      }
    });
    bottom();
}

function text(t) {
  console.log('\t' + t);
}

function code(text) {
  console.log(chalk.bold('\n' + text + '\n'))
}

function top() {
  console.log(chalk.bgCyan.underline('\t\t\t GOO \t\t\t\t'))
}

function bottom() {
  console.log(chalk.bgCyan.underline('\t\t\t GOO FIN \t\t\t'))
}

function question(text) {
  console.log(chalk.bold.magenta('\t' + 'Question: ') + chalk.bold.green(text));
}

function hide(text) {
  console.log(chalk.hidden(text));
}
