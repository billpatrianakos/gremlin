// Home Controller
// ===============

'use strict';

const express        = require('express'),
      AuthController = express.Router();

AuthController.route('/?')
  // GET /
  // -----
  .get((req, res, next) => {
    res.render('auth', { messages: req.flash('info') });
  });

// AuthController.route('/login/?')
module.exports = AuthController;
