const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
require('../db/model/dataModel')
const route = require('../server/router/routes')

// const compression = require('compression');
// const helmet = require('helmet')

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';


// const PORT = 3000;

const app = express()
app.set('port', (process.env.PORT || 3000))

if (isProd) {
  // app.use(compression());
  // app.use(helmet());
}

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

if (isDev) {
  app.use(morgan('dev'));
}

app.use('/api', route)
app.use(express.static(path.resolve(__dirname, '../client/static')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
})

app.listen(app.get('port'), function(){
  console.log(`Listening on port ${app.get('port')}`)
})