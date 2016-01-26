

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
        title: 'Basic Dialog'
    });

    $('#clicker').on('click', function () {
        $('#clickMe').dialog('open');
        return false;
    });
});

