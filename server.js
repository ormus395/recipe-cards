const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('validator');

//Developer made libs/ dependencies/ whatever
const keys = require('./config');

//Global app variable, and port
const app = express();
const port = process.env.PORT || 3000;

//Enable CORS
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

//Define mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useMongoClient: true  
})
.then(() => console.log('DB Connected'))
.catch(() => console.log('Cannot connect to DB'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//Api endpoints
app.use(require('./routes'));

//Catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Server errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.listen(port, () => console.log('Server Started'));
