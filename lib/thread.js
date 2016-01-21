// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var threadsSchema = new mongoose.Schema({
    title: String,
    text: String    
});

// Return module
module.exports = restful.model('Threads', threadsSchema);  

