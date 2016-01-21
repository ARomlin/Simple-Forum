/**
 * Created by andreasromlin on 2016-01-21.
 */

$.ajax({
    url: "/threads"
}).done(function(data) {
    console.log('Fetched / threads: ', data);

    for(var i=0; i< data.length; i++){
        console.log(data[i].id + ': ' + data[i].title + ': ' + data[i].text);
        $('#showThreads').append('<p>' + '<b>id: </b>' + '<p id="thread' + data[i].id + '" class="linkThread">' + data[i].id + '</p>' + ' <b>title:</b> ' + data[i].title + '<br />' +' <b>text:</b> ' + data[i].text + '</p><hr /><br />');
    }
});

$('#submitButton').on('click', function() {
    var $id = $('#id2').val();
    var $title = $('#title2').val();
    var $text = $('#text2').val();

    $.ajax({
            method: "POST",
            url: "/threads",
            data: { id: $id, title: $title, text: $text }
        })
        .done(function( ) {
            console.log( "Data Saved: " + 'id: ' + $id + ' : ' + 'title: ' + $title + ' : ' + 'text: ' +$text);
            $('#showThreads').append('<p>' + '<b>id: </b>' + '<p id="thread' + $id + '" class="linkThread">' + $id + '</p>' + ' <b>title:</b> ' + $title + '<br />' +' <b>text:</b> ' + $text + '</p><hr /><br />');
        });
});