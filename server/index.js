// Main server setup and startup script

const express = require('express');
const app     = express();

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.send('Testing 123');
});

let server = app.listen(process.env.SERVER_PORT || 9000, () => {
  console.log(`Gremlin server listening on localhost:${server.address().port} in ${process.env.NODE_ENV} mode`);
});
