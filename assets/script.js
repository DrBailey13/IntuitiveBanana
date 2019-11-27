function artistPage(artistName) {
    var queryURL = "http://theaudiodb.com/api/v1/json/195003/search.php?s=" + artistName + ""

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
    var queryURL = "http://theaudiodb.com/api/v1/json/195003/track-top10.php?s=" + artistName + ""
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
