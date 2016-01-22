

$.ajax({
    url: "/threads"
}).done(function(data) {
    console.log('Fetched / threads: ', data);

    for(var i=0; i< data.length; i++){

        console.log(data[i]._id + ': ' + data[i].title + ': ' + data[i].text);
        $('#showThreads').append('<p>' + ' <b>title:</b> <p class="linkThread" id="'+ data[i]._id +'">' + data[i].title + '<br /><p>' +' <b>text:</b> ' + data[i].text + '</p><hr /><br />');

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
        .done(function( ) {

            console.log( "Data Saved: " + 'title: ' + $title + ' : ' + 'text: ' +$text);
            $('#showThreads').append('<p>' + ' <b>title: </b><p class="linkThread">' + $title + '</p><br />' +' <b>text:</b> ' + $text + '</p><hr /><br />');
        });

});


$( document ).ajaxSuccess(function( event, request, settings ) {

    //Kod för att hämta ut id på vem som gjorde anropet
    var eventTracker = event.target.activeElement;
    console.log(eventTracker);
    console.log(eventTracker.id);

    //Kod för att få ut ett object med data på trådar.
    // Kan hämta ut id:t till senaste postade tråden
    console.log(request.responseText);
var serverResponseObject = JSON.parse(request.responseText);
    console.log(serverResponseObject);
    console.log(serverResponseObject._id);

});


