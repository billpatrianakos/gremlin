// Home Controller
// ===============

'use strict';

const express        = require('express'),
      HomeController = express.Router();

HomeController.route('/?')
  // GET /
  // -----
  .get((req, res, next) => {
    res.render('index');
  });

// HomeController.route('/login/?')
module.exports = HomeController;
