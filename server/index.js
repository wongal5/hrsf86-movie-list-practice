const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(morgan('dev'));
app.use('/', router);

app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

exports.modules = app;


