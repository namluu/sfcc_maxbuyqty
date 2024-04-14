'use strict';

var server = require('server');

server.get('Test', function (req, res, next) {
    res.render('helloWorld');
    next();
});

module.exports = server.exports();