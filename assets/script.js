//======================= Time & Date =======================//

$(document).ready(function() {

    var dateAndYear = moment().format('MMMM Do, YYYY');
    $('#currentDay').html(dateAndYear);
    console.log(dateAndYear);

    var timeHMS = moment().format('h:mm a');
    $('#currentHour').html(timeHMS);
    console.log(timeHMS);

});

//======================= Covid Tracker =======================//

$(document).ready(function() {

    function init() {
        var url = "https://api.covid19api.com/summary"

        var data = ''

        $.get(url, function(data) {
            console.log(data.Global)

            data = `

            <td>${data.Global.TotalConfirmed}</td>
            <td>${data.Global.TotalDeaths}</td>
            <td>${data.Global.TotalRecovered}</td>

            `

            $("#data").html(data)
        })
    }


    function refreshData() {
        clearData();
        init();
    }

    function clearData() {
        $("#data").empty()
    }

    init();

    $('#refreshCovid').on('click', function() {
        refreshData();
    })
});

//======================= NEWS API =======================//

$(document).ready(function() {
    var mainInfo = "";
    var listInfo = "";
    var articles = [];

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3961be64614d4c1e93003369b9d10207",
        method: "GET"
    }).then(function(data) {
        console.log(data);
        articles = data.articles;
        displayStory(articles[0]);
        $("#newest").html(mainInfo);

        for (var x = 1; x < 5; x++) {
            displayList(articles[x]);
            $("#list").html(listInfo);
        }

    })

    function displayStory(story) {
        var mainTitle = "<h4 class='mainArticleLink'>" + story.title + "</h4>";
        var mainSource = story.source.name;
        var mainImage = story.urlToImage;
        var mainTime = moment(story.publishedAt).format('MMMM Do, YYYY');
        var mainDescription = story.description;

        mainInfo += "<img class='mainArticleImg' src='" + mainImage + "'/>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo += "<strong>" + mainTitle + "</strong></a>";
        mainInfo += "<hr>" + "<p class='wrap'>" + mainDescription + "</p><hr>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo += mainTime + " | Read more at " + mainSource + "</a>";
    }

    function displayList(story) {
        var title = story.title;
        var source = story.source.name;
        var image = story.urlToImage;
        var storyTime = moment(story.publishedAt).format('MMMM Do, YYYY');

        listInfo += "<div class='container-md'><div class='row mb-4 p-3 listArticleDesc'>";
        listInfo += "<div class='col-md-4'><img class='listArticleImg' src='" + image + "'></div>";
        listInfo += `<div class='col-md-8'><a href='${story.url}'>`;
        listInfo += "<strong>" + title + "</strong><hr>";
        listInfo += storyTime + " | Read more at " + source;
        listInfo += "</a></div></div></div>";
    }

});

//======================= Google Maps API =======================//

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
