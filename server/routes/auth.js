// Home Controller
// ===============

'use strict';

const express        = require('express'),
      AuthController = express.Router();

AuthController.route('/?')
  // GET /
  // -----
  .get((req, res, next) => {
    res.render('index');
  });

// AuthController.route('/login/?')
module.exports = AuthController;
