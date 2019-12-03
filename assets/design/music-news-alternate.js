$(".music").on("click",function() {
    var genre = $(this).attr("data-genre");
    var modal = $("newsDesplay")
    console.log(genre)
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + genre + "&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        // $("#displayTitle").text("");
        // $("#displaySub").text("");
        // $("#displayNews").text("");
        $("#displayTitle").text(response.response.docs[0].headline.main);
        $("#displaySub").text(response.response.docs[0].snippet);
        $("#displayNews").text(response.response.docs[0].lead_paragraph);
        $("#displayURL").attr("href", response.response.docs[0].web_url).text(response.response.docs[0].web_url);
        // $("#displayTitle2").text("");
        // $("#displaySub2").text("");
        // $("#displayNews2").text("");
        $("#displayTitle2").text(response.response.docs[1].headline.main);
        $("#displaySub2").text(response.response.docs[1].snippet);
        $("#displayNews2").text(response.response.docs[1].lead_paragraph);
        $("#displayURL2").attr("href", response.response.docs[1].web_url).text(response.response.docs[1].web_url);
    })
});