// Application configuration
// =========================

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = {
  defaults: {
    port: process.env.port || 9000,
    session: {
      cookie: { maxAge: 86400000 },
      name: 'gsynth.sid',
      resave: false,
      rolling: true,
      saveUninitialized: false,
      secret: 'synth5ar3k3wl!',
      unset: 'destroy'
    },
    sf2Path: ''
  },

  development: {},

  // CHANGE ALL OF THESE BEFORE DEPLOYING
  // ------------------------------------
  // Change these configs as you wish. Not all options are
  // required. Where each is used is specified beside the parameter.
  production: {
    defaultUsername: 'CHANGE_ME', // Used in database seed file to populate your username
    defaultPassword: 'CHANGE_ME', // Used in database seed file to populate your username
    database: {
      client: 'postgresql', // Used in knexfile. Change based on your database (postgres, pg, mysql, etc.)
      connection: { // This entire object is used in knexfile.js. Modify this based on the database of your choosing
        host: 'localhost',
        database: 'CHANGE_ME',
        port: 5432, // Not always needed
        user:     'CHANGE_ME',
        password: 'CHANGE_ME'
      }
    },
    session: { // Used in server/index.js. Controls session middleware
      secret: 'CHANGE_ME', // Choose a long secure string here
      store: new RedisStore({ // You'll need Redis installed and running to use RedisStore as your session store
        host: '127.0.0.1',
        port: 6379,
        ttl: 7200000 // 2 hours
      })
    }
  }
};
