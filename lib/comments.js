// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Threads = require('./thread'); // Here we have our model of how the threads should look

// Handle thread comments PUT
Threads.route('comment.put', {
    detail: true,
    handler: function (req, res, next) {
        //var comment_id = req.params.commentid;
        var thread_id = req.params.id;

        // Kolla så att vi har ett värde att stoppa in
        if ((req.body.text !== undefined) && (req.body.text.trim() !== "")) {

            Threads.findByIdAndUpdate(
                thread_id, {
                    $push: {
                        "comments": {
                            "text": req.body.text
                        }
                    }
                }, {
                    safe: true,
                    upsert: true
                },
                function (err, model) {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    return res.json(model);
                });
        } else {
            return res.status(500).json({
                "error": "kunde inte spara kommentar"
            });
        }
    }
});

// Handle thread comment Delete
Threads.route('comment.delete', {
    detail: true,
    handler: function (req, res, next) {
        //var comment_id = req.params.commentid;
        var thread_id = req.params.id,
            comment_id = req.body.commentId;
        // Kolla så att vi har ett värde att stoppa in
        if ((thread_id !== undefined) && (comment_id !== undefined) && (comment_id.trim() !== "")) {
            Threads.findByIdAndUpdate(
                thread_id, {
                    $pull: {
                        'comments': {
                            _id: comment_id
                        }
                    }
                },
                function (err, model) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.json(model);
                });
        } else {
            return res.status(400).json({
                "error": "kunde inte ta bort kommentar"
            });
        }

    }

});


// Return module
module.exports = restful.model('Comments', Threads.schema);