# goopal

# Contents of this File

* [Purpose](#purpose)
* [Project Overview](#project-overview)
* [Local Project Setup](#local-project-setup)
* [Usage](#usage)

# Purpose

Goopal is a command line search program. The purpose of Goopal is to allow developers to perform a search within their current working terminal as opposed to leaving the terminal and opening a browser.

# Project Overview

Goopal is built with Node, Cheerio, Request and Chalk. It is a command line utility for searching the web.

This repo is a fork of Goo, the original [project](https://github.com/alexanderbanks/goo) that I contributed to. I wanted to expand the search options to include a Drupal-specific search, among others, so I've used Goo as a foundation for building this project on.

Currently, Terminal-Search searches Wikipedia, Stack Overflow, and Drupal.

# Local Project Setup

Make sure you have `npm` and `node` installed, then run:

`npm install -g terminal-search`

The npm package can be found [here](https://www.npmjs.com/package/terminal-search).

# Usage

_goopal_ _[query]_ yields an answer from Wikipedia or Stack Overflow

_goopal again_ yields last answer

_goopal more_ yields:
* the next top answer (Stack Overflow)
* the next paragraph chunk (Wikipedia)
* the next comment (Drupal)

_man goopal_ yields the manual for goopal

Example query: `goopal javascript splice`

Output:

![image](http://i.imgur.com/2S41NHz.png)

===============================================================

Example query: `goopal ron artest`

Output:

![image](http://i.imgur.com/nmS3yss.png)

blah
