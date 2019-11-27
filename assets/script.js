function artistPage(artistName) {
    var queryURL = "http://theaudiodb.com/api/v1/json/195003/search.php?s=" + artistName + ""

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        var name = $("<div>").text(response.artists[0].strArtist)
        $("#nameArtist").prepend(name)

        var site = $("<div>").text(response.artists[0].strWebsite)
        $("#artistLink").prepend(site)
    })
}



function searchArtists(artistName) {
    var queryURL = "http://theaudiodb.com/api/v1/json/195003/track-top10.php?s=" + artistName + ""
    console.log(queryURL)


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)


        for (i = 0; i < response.track.length; i++) {
            var songName = $("<div>").text(response.track[i].strTrack)
            $(".info").prepend(songName)
        }
        
    })
}

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var inputName = $("#artistName").val().trim();
    $(".top10").text("Top Songs:")

    searchArtists(inputName)
    artistPage(inputName)

})

$("#cancelBtn").on("click", function (event) {
    event.preventDefault();

    $("#artistName").val("");

    $(".info").empty()
    $(".top10").empty()
    $("#nameArtist").empty()
    $("#artistLink").empty()
})


var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=7&apikey=vDemJOWclNALrcIpSY84LPmStIgNjopr&city=Charlotte&classificationName=music&genre=pop";


function displayEvents() {

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (response) {
        console.log(response)


        for (var i = 0; i < response._embedded.events.length; i++) {

            console.log(response._embedded.events[i].name);
            console.log(response._embedded.events[i].images[i]);
            console.log(response._embedded.events[i].url);



            // var artistDisplay = $("<h2>").text(response._embedded.events[i].name);
            // var pictureDisplay = $("<img>").attr("src", response._embedded.events[i].images[1].url).addClass("image is-96x96");
            var pictureDisplay = $("<img>").attr("src", response._embedded.events[i].images[1].url).css("width", "96px").css("float", "left").css("clear", "both").css("margin-bottom", "10px");
            // console.log(response._embedded.events[i].images[1].url);
            var linkDisplay = $("<a>").attr("href", response._embedded.events[i].url).text(response._embedded.events[i].name);

            $(".appendInfo").append(pictureDisplay, linkDisplay);
            
        }
    });
}

displayEvents()


// function trendingArtist () {
//     var
// }