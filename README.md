# goo

# Contents of this File

* [Purpose](#purpose)
* [Project Overview](#project-overview)
* [Local Project Setup](#local-project-setup)
* [Usage](#usage)



# Purpose

Goo is a command line search program. The purpose of Goo is to allow developers to perform a search within their current working window as oppose to leaving the window and opening a new browser.

# Project Overview

Goo is built on a node framework. It is a command line utility for searching the web.

# Local Project Setup

Make sure you have node and npm installed

npm install -g goo

# Usage

_goo \<query>_ yields an answer from Wikipedia or Stack Overflow

_goo again_ yields last answer

_goo more_ yields the next top answer (Stack Overflow) OR the next paragraph chunk (Wikipedia)

_man goo_ yields the manual for goo

Example query: <code>goo git reset master <code>

Output:

![image](./img/search-example-01.png?raw=true)

===============================================================

![image](./img/search-example-02.png?raw=true)