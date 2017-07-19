'use strict';

var request = require('request');

class client {
  constructor(url) {
    this.url = url;
    this.path = '/api'
  }

  request(req, res) {
    var options = {
      url: this.url + this.path,
      method: req.method,
      headers: {
        'content-type': 'application/json'
      }
    };
    if (req.method === 'POST' || req.method === 'PUT') {
      options.body = req.body;
      options.json = true;
    }
    request(options, function (error, response, body) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(response.statusCode).send(body);
      }
    });
  }
}

module.exports = client;
