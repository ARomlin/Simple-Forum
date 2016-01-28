// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Threads Schema
var threadsSchema = new mongoose.Schema({
    title: { type: 'string', required: true },
    text: { type: 'string', required: true },
    comments: [{
      text: {type: 'string', required: true},
    }]
});

// Return module
module.exports = restful.model('Threads', threadsSchema);  

