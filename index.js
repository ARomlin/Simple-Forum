// Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    restful = require('node-restful'), // Create awesome APIs using express
    mongoose = restful.mongoose;

// MongoDB
mongoose.connect('mongodb://localhost/threads'); // Connect to local database

// Express
var app = express();

// Default settings
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

// Routes
app.use('/', require('./lib/api'));

app.use(express.static(__dirname + '/public'));

app.listen(3000);

module.exports = app;
