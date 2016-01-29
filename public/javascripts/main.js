
var commentList = document.getElementById('commentList'); //For showing comments in HTML before database is setup.


// Get all threads and display them on index page

$.ajax({
    method: "GET",
    url: "/threads"
}).done(function(data) {

    


    console.log('Fetched / threads: ', data);

    for(var i=0; i< data.length; i++){

        var textContent = data[i].text;
        if(data[i].text != undefined) {
            textContent = textContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        
        var titleContent = data[i].title;
        if(data[i].title != undefined) {
            titleContent = titleContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }


        console.log(data[i]._id + ': ' + data[i].title + ': ' + data[i].text);
        $('#showThreads').append('<p class="linkThread" id="'+ data[i]._id +'">' + ' <b>title:</b>' + titleContent + '</><br /><p>' +' <b>text:</b> ' + textContent + '</p><hr /><br />');

    }
});

//=====End of Get all threads and display them on index page ====



// Create a new thread on click event

$('#btnCreateNewThread').on('click', function() {
    if(($('#title2').val().replace(/ /g,'') && $('#text2').val().replace(/ /g,''))) {

        var $title = $('#title2').val();
        $title = $title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        var $text = $('#text2').val();
        $text = $text.replace(/</g, "&lt;").replace(/>/g, "&gt;");


        $.ajax({
                method: "POST",
                url: "/threads",
                data: {title: $title, text: $text}
            })
            .done(function (data) { // "data" innehåller det svar som servern skickat tillbaka
                console.log("Data Saved: " + '_id: ' + data._id + ' title: ' + data.title + ' : ' + 'text: ' + data.text);
                $('#showThreads').append('<p class="linkThread" id="' + data._id + '"><b>title: </b>' + data.title + '</p><br />' + ' <b>text:</b> ' + data.text + '</p><hr /><br />');
        }).fail( function(jqXHR, statusText){
            alert('Kunde inte skapa tråd!\nServerkommunikationsfel: '+ jqXHR.statusText);    
        });

        $('#title2').val('');
        $('#text2').val('');
    } else {
        alert('The input fields must contain text before submitting');
        false;
    }

});

// ==== End of Create a new thread on click event ====




// Document ready function

$('document').ready(function() {



    // To handle comments on a thread inside a modal

    $('#commentModal').dialog({
        show: "fade",
        hide: "fade",
        modal: true,
        dialogClass: "no-close",
        autoOpen: false,
        maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
        overflow: scroll,

        buttons: [
            {
                text: "Done",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {
                    $( this ).dialog( "close" );
                }
            },{
                text: "Post Comment",
                icons: {
                    primary: "ui-icon-pencil"
                },
                click: function(data) {
                   var $comment = $("#commentInput").val(),
                      myThreadId = $("#commentModal").data('myThreadId'); // Here we get the threadId from the caller

                    $comment = $comment.replace(/</g, "&lt;").replace(/>/g, "&gt;");


                    if($comment.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g,'') !== '') {
                        commentList.innerHTML += "<p>" + $comment + '</p><br />';
                        $("#commentInput").val('');
                                            if ((myThreadId !== undefined) && (myThreadId.trim() !== "")) { // some sanity check

                                                // Send the comment to the server
                                                $.ajax({
                                                        method: "PUT",
                                                        url: "/threads/" + myThreadId + "/comment",
                                                        data: {
                                                            text: $comment
                                                        }
                                                    })
                                                    .done(function (data) { // "data" innehåller det svar som servern skickat tillbaka
                                                        console.log("Comment saved on thread: _id: " + data._id);
                                                    }).fail(function (jqXHR, statusText) {
                                                        alert('Could not create comment!\nServer Communication error: ' + jqXHR.statusText);
                                                    });
                                            } else {
                                                alert("Internal Error: Missing the threadId, the \"dialog\" caller did not provide the threadId when opening this comment modal!");
                                            }
                    } else {
                        alert('Comment-field is empty!');
                        $("#commentInput").val('');
                        return false;
                    }
                }
            }
        ]

    });

//======End of To handle comments on a thread inside a modal=======






    // Set up, show and edit (PUT) a thread inside a modal

    $('#editMyThread').dialog({

        buttons: [
            {
                text: "Cancel",
                icons: {
                    primary: "ui-icon-close"
                },
                click: function() {
                    $( this ).dialog( "close" );
                }
            },
            {
                text: "Ok",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {

                    var tempID = $('#editMyThread').find('.holdMyId').html();

                    var $title = $('#editMyThread').find('#editThreadTitle').val();
                    $title = $title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    console.log($title);

                    var $text = $('#editMyThread').find('#editThreadText').val();
                    $text = $text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    console.log($text);

                    if(($('#editMyThread').find('#editThreadTitle').val().replace(/ /g,'') && $('#editMyThread').find('#editThreadText').val().replace(/ /g,''))) {


                        $.ajax({
                            method: "PUT",
                            url: "/threads/" + tempID,
                            data: {title: $title, text: $text}
                        }).done(function (data) {
                            console.log('Success. You updated article with id: ' + tempID);
                        });

                        //Ny get request på hela sidan för att uppdatera
                        getThreads();
                        $(this).dialog("close");
                    } else {
                        alert('Fields can´ be left empty');
                        return false;
                    }
                }

            }
        ],

        show: "fade",
        hide: "fade",
        modal: true,
        dialogClass: "no-close",

        autoOpen: false,
        maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
        overflow: scroll




    });

    //======End of Set up, show and edit (PUT) a thread inside a modal========






    // Set up dialog properties for Modal to show a single thread

    $('#clickMe').dialog({

        buttons: [
            {
                text: "LIKE",
                icons: {
                    primary: "ui-icon-heart"
                },
                click: function() {
                    $( this ).effect( "bounce" );
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            },
            {
                text: "EDIT",
                icons: {
                    primary: "ui-icon-pencil"
                },
                click: function() {
                    $( this ).dialog( "close" );
                    $('#editMyThread').dialog('open');
                    showThread($(this).find(".holdMyId").html());
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            },
            {
                text: "COMMENTS",
                icons: {
                    primary: "ui-icon-comment"
                },
                click: function() {
                    $( this ).dialog( "close" );
                    $('#commentModal').data('myThreadId', $(this).find(".holdMyId").html()).dialog('open'); // Also send the current threadId to the dialog
                    showComments($(this).find(".holdMyId").html());
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            },{
                text: "DELETE",
                icons: {
                    primary: "ui-icon-trash",
                },
                click: function() {


                    var idHolder = $(this).find('.holdMyId').html();
                    console.log(idHolder);

                    var confirm = prompt('Are you sure? Yes/No: ');
                    confirm = confirm.toLowerCase();

                    if (confirm === "yes") {
                        $.ajax({
                                method: "DELETE",
                                url: "/threads/" + idHolder

                            })
                            .done(function () { // "data" innehåller det svar som servern skickat tillbaka

                                //console.log("Thread Removed: " + '_id: ' + data._id + ' title: ' + data.title + ' : ' + 'text: ' + data.text);
                                //$('#showThreads').append('<b>title: </b><p class="linkThread" id="' + data._id + '">' + data.title + '</p><br />' + ' <b>text:</b> ' + data.text + '</p><hr /><br />');
                                //});


                                getThreads();
                            });

                    } else {
                        return false;
                    }
                                $(this).dialog("close");
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            },
            {
                text: "OK",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {
                    $( this ).dialog( "close" );
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            }
        ],
        show: "fade",
        hide: "fade",
        modal: true,
        dialogClass: "no-close",

        autoOpen: false,
        maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
        overflow: scroll

    });

    //====== End of Set up dialog properties for Modal to show a single thread=======

}); // ===End of Document ready function ===






// Handle click event on single thread

$(document).on('click', '.linkThread', function(data) {

    console.log(data.target.id);
    var tempID = $(this).attr('id');
    //console.log(tempID);



    $.ajax({
        url: "/threads"
    }).done(function(data) {

        for(var i=0; i< data.length; i++){
            if( data[i]._id === tempID ) {
                //console.log( 'Titel: ' + data[i].title + ' Text: ' + data[i].text );

                var idHolder = data[i]._id;
                var titleDialog = data[i].title;
                var textDialog = data[i].text;

                //textDialog = textDialog.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                //titleDialog = titleDialog.replace(/</g, "&lt;").replace(/>/g, "&gt;");


                $('#clickMe').dialog('option', 'title', titleDialog);

                $('#clickMe').text(textDialog);

                $('#clickMe').append('<br /><p class="holdMyId">' + idHolder + '</p>' );

                $('#clickMe').dialog('open');

                    return false;

            }
        }
    });
});


// ==== End of Handle click event on single thread ====





function getThreads() {
    $.ajax({
        url: "/threads"
    }).done(function (data) {

        $('#showThreads').html('');


        console.log('Fetched / threads: ', data);
        for (var i = 0; i < data.length; i++) {

            var textContent = data[i].text;
            if (data[i].text != undefined) {
                textContent = textContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }

            var titleContent = data[i].title;
            if (data[i].title != undefined) {
                titleContent = titleContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }

            console.log(data[i]._id + ': ' + data[i].title + ': ' + data[i].text);
            $('#showThreads').append('<p class="linkThread" id="' + data[i]._id + '">' + ' <b>title:</b>' + titleContent + '</p><br /><p>' + ' <b>text:</b> ' + textContent + '</p><hr /><br />');

        }
    });
}


function showThread(myThreadId) {

    console.log(myThreadId);

    $.ajax({
        method: "GET",
        url: "/threads/" + myThreadId
    }).done(function (data) {


        console.log(data._id);
        console.log(data.title);
        console.log(data.text);

        //var TitlePut =


        $('#editMyThread').dialog('option', 'title', "Edit the Thread");

        $('#editMyThread').html('<p>title</p><input type="text" id="editThreadTitle" value="' + data.title + '">');
        $('#editMyThread').append('<br /><p>text</p><textarea id="editThreadText">' + data.text + '</textarea>');
        $('#editMyThread').append('<p class="holdMyId">' + myThreadId + '</p>');

        //$('#showThread').text(textDialog);



    });

}


function showComments(threadId) {
    //console.log(threadId);

    $.ajax({
        method: "GET",
        url: "/threads/" + threadId
    }).done(function (data) {

        $('#commentList').html('');

        $('#commentModal').dialog( "option" , "title" ,"Comments");


        for(var i=0; i<data.comments.length; i++) {

            console.log(data.comments[i].text);
            var commentText = (data.comments[i].text).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            $('#commentList').append('<p>' + commentText + '</p><hr />');

        }


    });

};
