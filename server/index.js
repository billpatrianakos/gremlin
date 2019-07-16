// Main server setup and startup script

const express     = require('express');
const app         = express();
const path        = require('path');
const _           = require('lodash');
const morgan      = require('morgan');
const session     = require('express-session');
const bodyParser  = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
if (_.includes(['development', 'test'], process.env.NODE_ENV)) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));
} else {
  app.set('trust proxy', 1);
  app.use(morgan('combined', {
    skip: (req, res) => { return res.statusCode < 400 },
    stream: fs.createWriteStream(__dirname + '/log/application.log', { flags: 'a' })
  }));
}
app.use(session({
  cookie: { maxAge: 86400000 },
  name: 'gsynth.sid',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: 'synth5ar3k3wl!', // You should change this
  unset: 'destroy'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('csurf'); // TODO: Implement CSURF


require('./routes')(app);


app.get('/', (req, res, next) => {
  res.render('index');
});


let server = app.listen(process.env.SERVER_PORT || 9000, () => {
  console.log(`Gremlin server listening on localhost:${server.address().port} in ${process.env.NODE_ENV} mode`);
});
