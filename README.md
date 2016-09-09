# goo

# Contents of this File

* [Purpose](#purpose)
* [Project Overview](#project-overview)
* [Local Project Setup](#local-project-setup)
* [Usage](#usage)


![Goo!](http://media2.giphy.com/media/FT0UFROtAbVEA/giphy.gif)


# Purpose

Goo is a command line search program. The purpose of Goo is to allow developers to perform a search within their current working terminal as opposed to leaving the terminal and opening a browser.

# Project Overview

Goo is built with Node, Cheerio, Request and Chalk. It is a command line utility for searching the web.

# Local Project Setup

Make sure you have node and npm installed

`npm install -g node-goo`

# Usage

_goo <query>_ yields an answer from Wikipedia or Stack Overflow

_goo again_ yields last answer

_goo more_ yields the next top answer (Stack Overflow) OR the next paragraph chunk (Wikipedia)

_man goo_ yields the manual for goo

Example query: `goo javascript splice`

Output:

![image](http://i.imgur.com/2S41NHz.png)

===============================================================

![image](http://i.imgur.com/nmS3yss.png)
