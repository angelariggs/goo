'use strict';

var chalk = require('chalk');
module.exports = {
  text: text,
  code: code,
  top: top,
  bottom: bottom,
  question: question,
  hide: hide
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
