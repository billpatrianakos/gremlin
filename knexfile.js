// Configure your app in config/application.js to configure production
const _       = require('lodash');
const config  = _.merge(require('./config/application').defaults, require('./config/application')[process.env.NODE_ENV || 'development']);

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './config/db/dev.sqlite3'
    },
    migrations: {
      directory: './config/db/migrations'
    },
    seeds: {
      directory: './config/db/seeds/dev'
    }
  },

  production: {
    client: config.database.client,
    connection: config.database.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './config/db/migrations'
    },
    seeds: {
      directory: './config/db/seeds/production'
    }
  }

};
