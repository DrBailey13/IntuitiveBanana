// var apiKey = "vDemJOWclNALrcIpSY84LPmStIgNjopr";
// var city = 


var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=vDemJOWclNALrcIpSY84LPmStIgNjopr&city=Charlotte&classificationName=music&genre=pop";


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
            console.log(response._embedded.events[i].dates.start.dateTime);

            $(".artistName").html("<h1>" + response._embedded.events[i].name + "<h1>");
            // $(".picture").append("<a href=" + response._embedded.events[i].images[i] + ">");
            $(".link").html('<a href="' + response._embedded.events[i].url + '"> Buy Tickets Here' + '</a>');
            $(".eventDate").html("<p>" + response._embedded.events[i].dates.start.dateTime + "</p>");



        }
    });
}

displayEvents()


/* <div class="artistName"></div>
<div class="picture"></div>
<div class="link"></div>
<div class="eventDate"></div> */