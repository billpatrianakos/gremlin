// User seeds
// ==========
const bcrypt = require('bcrypt');

exports.seed = (knex) => {
  // Delete all existing users before seeding
  return knex('users').del()
    .then(() => bcrypt.hash('password', 12))
    .then((hash) => {
      return knex('users').insert([
        {
          id: 1,
          username: 'gremlin',
          password: hash
        }
      ]);
    });
};
