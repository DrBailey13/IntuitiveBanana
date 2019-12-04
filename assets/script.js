function artistPage(artistName) {
    var queryURL = "http://theaudiodb.com/api/v1/json/195003/search.php?s=" + artistName + ""

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        $(".picture").empty();

        var name = $("<div>").text(response.artists[0].strArtist)
        $("#nameArtist").prepend(name)

        var site = $("<a>").text(response.artists[0].strWebsite).attr("href", "https://" + response.artists[0].strWebsite).attr("target", "_blank")

        var picture = $("<img>").attr("src", response.artists[0].strArtistClearart)

    
        $(".picture").append(picture)
        $("#artistLink").prepend(site)
        console.log(response.artists[0].strWebsite)
        console.log(site)
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
            var songName = $("<a>").text(response.track[i].strTrack).attr("href", response.track[i].strMusicVid).attr("target", "_blank").append("<br>")
            
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
    modal.addClass("is-active")

})


$(".close-modal").on("click",function() {
    modal.removeClass("is-active")
})

var modal = $("#musicDisplay")


function featuredArtist() {

    var queryURL = "https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles"


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        var artistName = $("<h1>").text(response.trending[1].strArtist)
        $(".Artist").append(artistName)

        var artistImage = $("<img>").attr("src", response.trending[1].strTrackThumb)
        $(".image").append(artistImage)


    })
} featuredArtist()





function displayEvents() {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=vDemJOWclNALrcIpSY84LPmStIgNjopr&city=Charlotte&classificationName=music&genre=pop";
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
            var dateDisplay = response._embedded.events[i].dates.start.localDate;
            var d = new Date(dateDisplay).toDateString();
            var showDate = $("<div>").append($(d).css("float", "right"));
            console.log(d);
            // var timeDisplay = response._embedded.events[i].dates.start.localTime;
            // dateDisplay = moment().format('ddd, MMMM Do, hA');
            var pictureDisplay = $("<div>").append($("<img>").attr("src", response._embedded.events[i].images[5].url).attr("id", "pictures").css("width", "96px").css("clear", "both").css("margin-bottom", "10px").css("display", "inline-block").css("margin-right", "10px"));
            // console.log(response._embedded.events[i].images[1].url);
            var linkDisplay = $("<div>").append($("<a>").attr("href", response._embedded.events[i].url).text(response._embedded.events[i].name).css("display", "flex").css("align-items", "center").css("word-wrap", "break-word").css("width", "300px").attr("target", "_blank"));
            

            var newDiv = $("<div>").attr("id", "music-block" + i).css("display", "flex").css("padding", "1px"); 
            //id="block-' + i + '"');
            // $(".appendInfo").append(pictureDisplay, '<br>' , dateDisplay, timeDisplay , '<br>' , linkDisplay);
            $(".appendInfo").append(newDiv);
            
            $(newDiv).append(pictureDisplay, linkDisplay, showDate);

            //TO DO
                //showDate align
                //resize images based on screen size
            
        }
    });
}

displayEvents()


// function trendingArtist () {
//     var
// }
$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    $("#artistName").val("");

    $(".info").empty()
    $(".top10").empty()
    $("#nameArtist").empty()
    $("#artistLink").empty()

})


function trendingSongs(trending) {

    var queryURL = "http://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles"


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        for (i = 0; i < response.trending.length; i++) {
            var trendingSong = $("<div>").text(response.trending[i].strTrack + "---" + response.trending[i].strArtist)

            $(".trending").append(trendingSong)
        }

    })

}
trendingSongs()
