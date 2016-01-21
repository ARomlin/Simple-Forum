

$.ajax({
    url: "/threads"
}).done(function(data) {
    console.log('Fetched / threads: ', data);

    for(var i=0; i< data.length; i++){
        console.log(data[i]._id + ': ' + data[i].title + ': ' + data[i].text);
        $('#showThreads').append('<p>' + '<b>id: </b>' + '<p id="thread' + data[i]._id + '" class="linkThread">' + data[i]._id + '</p>' + ' <b>title:</b> ' + data[i].title + '<br />' +' <b>text:</b> ' + data[i].text + '</p><hr /><br />');
    }
});


$('#submitButton').on('click', function() {

    var $title = $('#title2').val();
    var $id = $.ajax({
        url: "/threads"
    }).done(function (data) {
        console.log('Fetched / threads: ', data);
        for (var i = data.length; i > 0; i -= data.length) {
            $id = data[data.length - 1]._id;
            console.log($id);
            return $id;
        }
    });
    var $text = $('#text2').val();
    $.ajax({
            method: "POST",
            url: "/threads",
            data: { title: $title, text: $text }
        })
        .done(function( ) {

            console.log( "Data Saved: " + 'title: ' + $title + ' : ' + 'text: ' +$text);
            $('#showThreads').append('<p>' + ' <b>id:</b> ' + '<p class="linkThread" id="thread' + $id + '">' + $id + '</p>' + '<br />' + ' <b>title:</b> ' + $title + '<br />' +' <b>text:</b> ' + $text + '</p><hr /><br />');
        });

});
