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

//======================= Weather API =======================//

$(document).ready(function() {
    const api = {
        key: "54e6965a6aef2f55b313d4ee2c389024",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);

    function setQuery(evt) {
        if (evt.keyCode == 13) {
            getResults(searchbox.value);
        }
    }

    function getResults(query) {
        fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayResults);
    }

    function displayResults(weather) {
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);

        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = weather.weather[0].main;

        let hilow = document.querySelector('.hi-low');
        hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
    }

    function dateBuilder(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }
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

        listInfo += "<div class='container-md'><div class='row mb-2 listArticleDesc'>";
        listInfo += "<div class='col-md'><img class='listArticleImg' src='" + image + "'></div>";
        listInfo += `<div class='col-md-8 p-4'><a href='${story.url}'>`;
        listInfo += "<strong>" + title + "</strong><hr>";
        listInfo += storyTime + " | Read more at " + source;
        listInfo += "</a></div></div></div>";
    }

});

//======================= Google Maps API =======================//

var map, infoWindow;

function createMap() {
    var options = {
        center: {
            lat: 43.654,
            lng: -79.383
        },
        zoom: 10
    };

    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            var position = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };

            infoWindow.setPosition(position);
            infoWindow.setContent('Your location!');
            infoWindow.open(map);
            map.setCenter(position);
        }, function() {
            handleLocationError('Geolocation service failed', map.getCenter());
        });
    } else {
        handleLocationError('No geolocation available.', map.getCenter());
    }
}

function handleLocationError(content, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
}
