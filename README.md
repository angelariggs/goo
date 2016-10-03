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

_goopal_ _[query]_ yields an answer from Wikipedia, Stack Overflow, or Drupal

_goopal again_ yields last answer

_goopal more_ yields:
* the next top answer (Stack Overflow)
* the next paragraph chunk (Wikipedia)
* the next comment (Drupal)

_man goopal_ yields the manual for goopal

Example query: `goopal git reset last commit`

Output:

![image](http://i.imgur.com/850O48L.png)

===============================================================

Example query: `goopal sloths`

Output:

![image](http://i.imgur.com/13JvnEd.png)

===============================================================

Example query: `goopal drupal how to use focal point with file entity browser`

Output:

![image](http://i.imgur.com/2LWvzz9.png)
