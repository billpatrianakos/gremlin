// Home Controller
// ===============

'use strict';

const express        = require('express'),
      HomeController = express.Router(),
      authorize      = require('../lib/authorize'),
      fs             = require('fs');

HomeController.use(authorize);

HomeController.route('/?')
  // GET /
  // -----
  .get((req, res, next) => {
    fs.readdir(req.app.get('config').sf2Path, (err, files) => {
      if (err) {
        next(err, req, res, next);
      } else {
        res.render('index', { files: files });
      }
    });
  });

// HomeController.route('/login/?')
module.exports = HomeController;
