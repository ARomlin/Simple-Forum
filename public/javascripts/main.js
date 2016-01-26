
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

    var $title = $('#title2').val();

    var $text = $('#text2').val();

    $.ajax({
            method: "POST",
            url: "/threads",
            data: { title: $title, text: $text }
        })
        .done(function(data) { // "data" innehåller det svar som servern skickat tillbaka
            console.log( "Data Saved: " + '_id: ' + data._id + ' title: ' + data.title + ' : ' + 'text: ' + data.text);
            $('#showThreads').append('<b>title: </b><p class="linkThread" id="'+ data._id +'">' + data.title + '</p><br />' +' <b>text:</b> ' + data.text + '</p><hr /><br />');
        });

});


$('document').ready(function() {

    $('#clickMe').dialog({
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

                //console.log(typeof(titleDialog));
                //console.log(typeof(textDialog));

                $('#clickMe').dialog('option', 'title', titleDialog);

                $('#articleContent').html(textDialog);

                $('#clickMe').dialog('open');

                    return false;

            }
        }
    });
});
