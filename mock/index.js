const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api.js');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.end('umefit mock data');
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8888, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://localhost:' + 8888 + '\n')
});
