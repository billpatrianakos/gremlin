// Main server setup and startup script

const _           = require('lodash');
const config      = _.merge(require('../config/application').defaults, require('../config/application')[process.env.NODE_ENV || 'development']);
const express     = require('express');
const app         = express();
const path        = require('path');
const morgan      = require('morgan');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const flash       = require('connect-flash');
const isProd      = function() { return _.includes(['production'], process.env.NODE_ENV); };
if (process.env.NODE_ENV === 'production') { const RedisStore = require('connect-redis')(session); }


// Middleware and configuration
// ----------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', isProd() ? 1 : 0);
app.set('config', config);
app.use(morgan(isProd() ? 'combined' : 'dev', {
  stream: isProd() ? fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' }) : process.stdout,
  skip: (req, res) => { return isProd() && res.statusCode < 400 }
}));
app.use(session(config.session));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('csurf'); // TODO: Implement CSURF
app.use(flash());
if (!isProd()) app.use(express.static(path.join(__dirname, 'public')));


// Load up our routes
// ------------------
require('./routes')(app);
app.use('/', require('./routes/default'));


// 404 handler
// -----------
app.use((req, res, next) => {
  res.status(404).render('404', { error: 'Page not found' });
});


// 500 handler
// -----------
app.use((err, req, res, next) => {
  res.status(500).render('500', { error: err });
});


let server = app.listen(config.port || 8080, () => {
  console.log(`Gremlin server listening on localhost:${server.address().port} in ${process.env.NODE_ENV} mode`);
});
