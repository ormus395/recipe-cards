const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Global app variable, and port
const app = express();
const port = process.env.PORT || 3000;

//Set view engine to render react front end
app.set('view engine', 'ejs');

app.use('*', (req, res, next) => {
  res.render('index');
});

app.listen(port, () => console.log('Server Started'));
