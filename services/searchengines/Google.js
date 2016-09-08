'use strict';

var request = require('request');

module.exports = {
    Search: Search
};

function Search(query) {
    var options = {
        url: 'https://google.com/search?q=' + query
    };
    
    request(options, searchCallback)
}


function searchCallback(err, resp, body) {
    if (err) {
        //TODO
        console.log('HANDLE THE ERRORS: ' + err);
        return
    }

    if (resp.statusCode == 200) {
        filterResults(body)
    }
}

function filterResults(results) {
    console.log('IN FILTER::::: ' + results)
}