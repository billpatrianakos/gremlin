// Home Controller
// ===============

'use strict';

const express        = require('express'),
      AuthController = express.Router(),
      User           = require(__dirname + '/../models/user'),
      bcrypt         = require('bcrypt');

AuthController.route('/?')
  // GET /
  // -----
  .get((req, res, next) => {
    res.render('auth', { messages: req.flash('info') });
  });

AuthController.route('/login/?')
  .post((req, res, next) => {
    { username, password } = req.body;

    new User({ username: username })
      .fetch(user => {
        bcrypt.compare(password, user.get('password'))
          .then(response => {
            if (response) {
              req.session.userId = user.get('id');
              req.session.loggedIn = true;
              res.redirect('/');
            } else {
              res.status(401).render('auth', { messages: ['Username or password was incorrect'] });
            }
          })
      })
      .catch(err => {
        req.flash('error', err);
        res.status(401).redirect;('/auth');
      });
  });

// AuthController.route('/login/?')
module.exports = AuthController;
