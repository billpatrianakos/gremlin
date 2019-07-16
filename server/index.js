// Main server setup and startup script

const express = require('express');
const app     = express();
const path    = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
if (process.env.NODE_ENV === 'production') app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
});

let server = app.listen(process.env.SERVER_PORT || 9000, () => {
  console.log(`Gremlin server listening on localhost:${server.address().port} in ${process.env.NODE_ENV} mode`);
});
