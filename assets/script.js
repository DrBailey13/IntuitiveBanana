function artistPage(artistName) {
    var queryURL = "https://cors-anywhere.herokuapp.com/http://theaudiodb.com/api/v1/json/195003/search.php?s=" + artistName + ""

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)

        var name = $("<div>").text(response.artists[0].strArtist)
        $("#nameArtist").prepend(name)

        var site = $("<a>").text(response.artists[0].strWebsite).attr("href", "https://" + response.artists[0].strWebsite)


        $("#artistLink").prepend(site)
        console.log(response.artists[0].strWebsite)
        console.log(site)
    })
}



function searchArtists(artistName) {
    var queryURL = "https://cors-anywhere.herokuapp.com/http://theaudiodb.com/api/v1/json/195003/track-top10.php?s=" + artistName + ""
    console.log(queryURL)


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
       

        for (i = 0; i < response.track.length; i++) {
            var songName = $("<a>").text(response.track[i].strTrack).attr("href",  response.track[i].strMusicVid).append("<br>")
    
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

function featuredArtist(){

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
}featuredArtist()


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



$(".music").on("click",function() {
    var genre = $(this).attr("data-genre");
    console.log(genre)
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + genre + "&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        $("#displayTitle").text("");
        $("#displaySub").text("");
        $("#displayNews").text("");
        $("#displayTitle").text(response.response.docs[0].headline.main);
        $("#displaySub").text(response.response.docs[0].snippet);
        $("#displayNews").text(response.response.docs[0].lead_paragraph);
        $("#displayURL").attr("href", response.response.docs[0].web_url).text(response.response.docs[0].web_url);
        $("#displayTitle2").text("");
        $("#displaySub2").text("");
        $("#displayNews2").text("");
        $("#displayTitle2").text(response.response.docs[1].headline.main);
        $("#displaySub2").text(response.response.docs[1].snippet);
        $("#displayNews2").text(response.response.docs[1].lead_paragraph);
        $("#displayURL2").attr("href", response.response.docs[1].web_url).text(response.response.docs[1].web_url);
    })
});