// search page function for basic info
function artistPage(artistName) {
    var queryURL = "https://cors-anywhere.herokuapp.com/http://theaudiodb.com/api/v1/json/195003/search.php?s=" + artistName + ""
// calling api
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
// resetting picture upon each artist searched
        $(".picture").empty();

// appending the name typed to the first div in the results

        var name = $("<div>").text(response.artists[0].strArtist)
        $("#nameArtist").prepend(name)

        // appending the link of the artists page below his name

        var site = $("<a>").text(response.artists[0].strWebsite).attr("href", "https://" + response.artists[0].strWebsite).attr("target", "_blank")

// grabbing the picture of the artist

        var picture = $("<img>").attr("src", response.artists[0].strArtistClearart)

    // appending/ prepending things to correct html tags
        $(".picture").append(picture)
        $("#artistLink").prepend(site)
        console.log(response.artists[0].strWebsite)
        console.log(site)
    })
}

// top 10/ top songs for the artist searched

function searchArtists(artistName) {
    var queryURL = "https://cors-anywhere.herokuapp.com/http://theaudiodb.com/api/v1/json/195003/track-top10.php?s=" + artistName + ""
    console.log(queryURL)

// calling api
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

// for every song the api results, it will put below the name and link
        for (i = 0; i < response.track.length; i++) {
            var songName = $("<a>").text(response.track[i].strTrack).attr("href", response.track[i].strMusicVid).attr("target", "_blank").append("<br>")
            
            $(".info").prepend(songName)
        }

    })
}

// whenever submit button is clicked 

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

// get the name the user types in and give the functions that parameter to use

    var inputName = $("#artistName").val().trim();
    $(".top10").text("Top Songs:")

    searchArtists(inputName)
    artistPage(inputName)
    modal.addClass("is-active")

})

// if clicked outside of model, it will close
$(".close-modal").on("click",function() {
    modal.removeClass("is-active")
})

var modal = $("#musicDisplay")

// function for featured artists page featured artist section
function featuredArtist() {

    var queryURL = "https://cors-anywhere.herokuapp.com/https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles"

// calling api
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

// putting the name of the artist into a header
        var artistName = $("<h1>").text(response.trending[1].strArtist)
        $(".Artist").append(artistName)

        // putting the picutre of the artist into div
        var artistImage = $("<img>").attr("src", response.trending[1].strTrackThumb)
        $(".image").append(artistImage)


    })
    // called as soon as page loads
} featuredArtist()




// featured artist page, ticket master function
function displayEvents() {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=vDemJOWclNALrcIpSY84LPmStIgNjopr&city=Charlotte&classificationName=music&genre=pop";
    // getting api
    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (response) {
        console.log(response)

// for each of the events
        for (var i = 0; i < response._embedded.events.length; i++) {

            console.log(response._embedded.events[i].name);
            console.log(response._embedded.events[i].images[i]);
            console.log(response._embedded.events[i].url);


            var dateDisplay = response._embedded.events[i].dates.start.localDate;
            var d = new Date(dateDisplay).toDateString();
            var showDate = $("<div>").append($(d).css("float", "right"));
            console.log(d);
            // grabbing picture and appending to a div
            var pictureDisplay = $("<div>").append($("<img>").attr("src", response._embedded.events[i].images[5].url).attr("id", "pictures").css("width", "96px").css("clear", "both").css("margin-bottom", "10px").css("display", "inline-block").css("margin-right", "10px"));
        //    giving the title a link
            var linkDisplay = $("<div>").append($("<a>").attr("href", response._embedded.events[i].url).text(response._embedded.events[i].name).css("display", "flex").css("align-items", "center").css("word-wrap", "break-word").css("width", "300px").attr("target", "_blank"));
            
// creating individual divs for each response
            var newDiv = $("<div>").attr("id", "music-block" + i).css("display", "flex").css("padding", "1px"); 
         
            $(".appendInfo").append(newDiv);
            // appending everything to one html element
            $(newDiv).append(pictureDisplay, linkDisplay, showDate);

          
            
        }
    });
}
// called as soon as page loads
displayEvents()


// search page submit button
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
// empty the name the user put in so they dont have to manually delete it
    $("#artistName").val("");
// clear all info from previous artist
    $(".info").empty()
    $(".top10").empty()
    $("#nameArtist").empty()
    $("#artistLink").empty()

})

// featured artist page trending songs sections function
function trendingSongs(trending) {

    var queryURL = "http://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles"

// calling api
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        // for each top song
        for (i = 0; i < response.trending.length; i++) {
            // create a div with the track name, and the name of artist that wrote the song
            var trendingSong = $("<div>").text(response.trending[i].strTrack + "---" + response.trending[i].strArtist)
// append to html element
            $(".trending").append(trendingSong)
        }

    })

}
// call as soon as page loads
trendingSongs()
