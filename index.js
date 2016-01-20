
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

var threads = [
    {id: 1, title: 'En titel här', text: 'Lite text här!'},
    {id: 2, title: 'En titel här2', text: 'Lite text här2!'},
    {id: 3, title: 'En titel här3', text: 'Lite text här3!'},
    {id: 4, title: 'En titel här4', text: 'Lite text här4!'},
    {id: 5, title: 'En titel här5', text: 'Lite text här5!'}]

//GET

app.get('/threads', function (req, res) {
   res.json( {threads: threads});
});

//GET id

app.get('/threads/:id', function (req, res) {
    var thread = threads[req.params.id];
   res.json(thread);
    if(req.params.id === '666') {

        console.log('The beast welcomes you! Moahahaha!');
    } else {
        console.log('id is: ' + req.params.id);
    }
});




app.put('/threads/:id', function (req, res) {
    var id = req.params.id;
    var status = 'ERR';

    if (typeof threads[id] !== 'undefined') {

        res.status(201);

        threads[id].id = req.body.id;
        threads[id].title = req.body.title;
        threads[id].text = req.body.text;

        status = 'OK';
    } else {
        res.status(400);
    }
    res.json({ status: status})
});

app.post('/threads', function (req, res) {

if(!isNaN(req.body.id) === true) {
    res.status(201);

    threads.push({
        id: Number(req.body.id),
        title: req.body.title,
        text: req.body.text
    });
    console.log(!isNaN(req.body.id));
    res.json({ message: 'You posted something!', insertId: threads.length - 1 });
} else {
    res.status(400);
    res.json({ message: 'Please insert a number as a id!'});
}

});

app.delete('/threads/:id', function (req, res) {
    delete threads[req.params.id];

    res.json({ message: 'Thread deleted successful!' })
});


app.use(express.static(__dirname + '/public'));

// Start up server on port 3000
app.listen(3000);
console.log('Magic is on port 3000!');