// User seeds
// ==========
const _       = require('lodash');
const bcrypt  = require('bcrypt');
const config  = _.merge(require('../config/application').defaults, require('../config/application')[process.env.NODE_ENV || 'development']);

exports.seed = (knex) => {
  // Delete all existing users before seeding
  return knex('users').del()
    .then(() => bcrypt.hash(config.defaultPassword, 12))
    .then((hash) => {
      return knex('users').insert([
        {
          id: 1,
          username: config.defaultUsername,
          password: hash
        }
      ]);
    });
};
