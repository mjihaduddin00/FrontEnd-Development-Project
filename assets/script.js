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

$(document).ready(function(){

    function init(){
        var url = "https://api.covid19api.com/summary"

        var data = ''

        $.get(url,function(data){
            console.log(data.Global)

            data = `

            <td>${data.Global.TotalConfirmed}</td>
            <td>${data.Global.TotalDeaths}</td>
            <td>${data.Global.TotalRecovered}</td>

            `

            $("#data").html(data)
        })
    }


    function refreshData(){
        clearData();
        init();
    }

    function clearData(){
        $("#data").empty()
    }

    init();

    $('#refreshCovid').on('click', function(){
        refreshData();
    })
});

//======================= NEWS API =======================//

$(document).ready(function() {
    var mainInfo = "";
    var listInfo = "";
    var articles = [];

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=82b9aacd881f4e4e90a4b7b4eaf75ae3",
        method: "GET"
    }).then(function (data) {
        console.log(data);
        articles = data.articles;
        displayStory(articles[0],0);
        $("#newest").html(mainInfo);

        for(var x =1; x < 5; x++) {
            displayList(articles[x],x);
            $("#list").html(listInfo);
        }

    })

    function displayStory(story,storyNum){
        var mainNumber = storyNum;
        var mainTitle = "<h4 class='mainArticleLink'>" + story.title + "</h4>";
        var mainSource = story.source.name;
        var mainImage = story.urlToImage;
        var mainTime = moment(story.publishedAt).format('MMMM Do, YYYY');
        var mainDescription = story.description;

        mainInfo += mainNumber;
        mainInfo += "<img class='mainArticleImg' src='" + mainImage + "'/>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo += "<strong>" + mainTitle + "</strong></a>";
        mainInfo += "<br/>" + "<p class='wrap'>" + mainDescription + "</p>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo +=  mainTime + " | Read more at " + mainSource + "</a>";
    }

    function displayList(story,storyNum){
        var number = storyNum;
        var title = story.title;
        var source = story.source.name;
        var image = story.urlToImage;
        var storyTime = moment(story.publishedAt).format('MMMM Do, YYYY');

        listInfo += "<div class='container mb-4 p-3 mainArticleDesc'><li onclick='populateDetail(" + number + ")' class='wrap'>";
        listInfo += "<img class='listArticleImg' src='" + image + "'>";
        listInfo += `<a href='${story.url}'>`;
        listInfo += "<strong>" + title + "</strong>";
        listInfo += "<br/>" + storyTime + " | Read more at " + source;
        listInfo += "</a></li></div>";
    }

});
//======================= Google Maps API =======================//
