'use strict';

var chalk = require('chalk');
module.exports = {
  text: text,
  code: code,
  top: top,
  bottom: bottom,
  question: question
}

function text(t) {
  console.log('\t' + t);
}

function code(text) {
  console.log(chalk.bold('\t \t' + text))
}

function top() {
  console.log(chalk.bgCyan.underline('\t\t\t GOO \t\t\t\t'))
}

function bottom() {
  console.log(chalk.bgCyan.underline('\t\t\t GOO FIN \t\t\t'))
}

function question() {
  console.log(chalk.bold.magenta('Question: ') + chalk.bold.green(process.env.QUERY));
}
