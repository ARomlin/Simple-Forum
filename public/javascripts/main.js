
var clickMe = document.getElementById('clickMe');
var articleContent = document.getElementById('articleContent');


$.ajax({
    url: "/threads"
}).done(function(data) {
    console.log('Fetched / threads: ', data);

    for(var i=0; i< data.length; i++){

        console.log(data[i]._id + ': ' + data[i].title + ': ' + data[i].text);
        $('#showThreads').append('<p>' + ' <b>title:</b> <p class="linkThread" id="'+ data[i]._id +'">' + data[i].title + '</p><br /><p>' +' <b>text:</b> ' + data[i].text + '</p><hr /><br />');

    }
});


$('#btnCreateNewThread').on('click', function() {
    if(($('#title2').val() && $('#text2').val()) !== '') {

        var $title = $('#title2').val();

        var $text = $('#text2').val();


        $.ajax({
                method: "POST",
                url: "/threads",
                data: {title: $title, text: $text}
            })
            .done(function (data) { // "data" innehåller det svar som servern skickat tillbaka
                console.log("Data Saved: " + '_id: ' + data._id + ' title: ' + data.title + ' : ' + 'text: ' + data.text);
                $('#showThreads').append('<b>title: </b><p class="linkThread" id="' + data._id + '">' + data.title + '</p><br />' + ' <b>text:</b> ' + data.text + '</p><hr /><br />');
            });

        $('#title2').val('');
        $('#text2').val('');
    } else {
        alert('The input fields must contain text before submitting');
        false;
    }

});


$('document').ready(function() {

    $('#clickMe').dialog({

        buttons: [
            {
                text: "Ok",
                icons: {
                    primary: "ui-icon-heart"
                },
                click: function() {
                    $( this ).dialog( "close" );
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            }
        ],
        modal: true,

        autoOpen: false,
        maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
        overflow: scroll

    });

});

$(document).on('click', '.linkThread', function() {
    var tempID = $(this).attr('id');
    //console.log(tempID);

    $.ajax({
        url: "/threads"
    }).done(function(data) {

        for(var i=0; i< data.length; i++){
            if( data[i]._id === tempID ) {
                //console.log( 'Titel: ' + data[i].title + ' Text: ' + data[i].text );

                var titleDialog = data[i].title;
                var textDialog = data[i].text;

                //textDialog = textDialog.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                //titleDialog = titleDialog.replace(/</g, "&lt;").replace(/>/g, "&gt;");


                $('#clickMe').dialog('option', 'title', titleDialog);

                $('#clickMe').text(textDialog);

                $('#clickMe').dialog('open');

                    return false;

            }
        }
    });
});
