// Route setup
// ===========

'use strict';

let _         = require('lodash'),
    fs        = require('fs'),
    path      = require('path'),
    excluded  = ['index', 'default'];

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach((file) => {
    // Remove extension from file name
    var basename = file.split('.')[0];

    // Do not load directories or blacklisted file names
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
      app.use('/' + basename, require('./' + file));
    }
  });
};
