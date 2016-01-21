// Dependencies
var express = require('express'),
router = express.Router();

// Models
var Threads = require('./thread'); // Here we have our model of how the threads should look

// Routes
Threads.methods(['get', 'put', 'post', 'delete']); // What HTTP VERBS to act on
Threads.register(router, '/threads'); // Setup and register the route to an endpoint


// Return router
module.exports = router;