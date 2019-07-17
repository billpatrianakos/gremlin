// User model
// ==========

'use strict';

let Bookshelf = require('./index');

let User = Bookshelf.model.extend({
  tableName: 'users',
  hasTimestamps: false
});

module.exports = Bookshelf.model('User', User);
