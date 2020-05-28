$(document).ready(function(){

    var mainInfo = "";
    var listInfo = "";
    var mainInfoSec = "";
    var listInfoSec = "";
    var resultInfo = '';
    var articles = [];
    var userSearch = [];
    
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=82b9aacd881f4e4e90a4b7b4eaf75ae3",
        method: "GET"
    }).then(function (data) {
        console.log(data);
        articles = data.articles;
        displayStory(articles[0]);
        $("#newest").html(mainInfo);
        displayStorySec(articles[9]);
        $("#newestSec").html(mainInfoSec);

        for(var x = 1; x < 5; x++) {
            displayList(articles[x]);
            $("#list").html(listInfo);
        }
        for(var x = 10; x < 15; x++) {
            displayListSec(articles[x]);
            $("#listSec").html(listInfoSec);
        }
        
    })

    function displayStory(story){
        var mainTitle = "<h4 class='mainArticleLink'>" + story.title + "</h4>";
        var mainSource = story.source.name;
        var mainImage = story.urlToImage;
        var mainTime = moment(story.publishedAt).format('MMMM Do, YYYY');
        var mainDescription = story.description;

        mainInfo += "<img class='mainArticleImg' src='" + mainImage + "'/>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo += "<strong>" + mainTitle + "</strong></a>";
        mainInfo += "<br/>" + "<p class='wrap'>" + mainDescription + "</p>";
        mainInfo += `<a href='${story.url}'>`;
        mainInfo +=  mainTime + " | Read more at " + mainSource + "</a>";
    }

    function displayList(story){
        var title = story.title;
        var source = story.source.name;
        var image = story.urlToImage;
        var storyTime = moment(story.publishedAt).format('MMMM Do, YYYY');

        listInfo += "<div class='container mb-4 p-3 mainArticleDesc'><li class='wrap'>";
        listInfo += "<img class='listArticleImg' src='" + image + "'>";
        listInfo += `<a href='${story.url}'>`;
        listInfo += "<strong>" + title + "</strong>";
        listInfo += "<br/>" + storyTime + " | Read more at " + source;
        listInfo += "</a></li>";
    }

    function displayStorySec(story){
        var mainTitleSec = "<h4 class='mainArticleLink'>" + story.title + "</h4>";
        var mainSourceSec = story.source.name;
        var mainImageSec = story.urlToImage;
        var mainTimeSec = moment(story.publishedAt).format('MMMM Do, YYYY');
        var mainDescriptionSec = story.description;

        mainInfoSec += "<img class='mainArticleImg' src='" + mainImageSec + "' width='400'/>";
        mainInfoSec += `<a href='${story.url}'>`;
        mainInfoSec += "<strong>" + mainTitleSec + "</strong></a>";
        mainInfoSec += "<br/>" + "<p class='wrap'>" + mainDescriptionSec + "</p>";
        mainInfoSec += `<a href='${story.url}'>`;
        mainInfoSec +=  mainTimeSec + " | Read more at " + mainSourceSec + "</a>";
    }

    function displayListSec(story){
        var titleSec = story.title;
        var sourceSec = story.source.name;
        var imageSec = story.urlToImage;
        var storyTimeSec = moment(story.publishedAt).format('MMMM Do, YYYY');

        listInfoSec += "<div class='container mb-4 p-3 mainArticleDesc'><li class='wrap'>";
        listInfoSec += "<img class='listArticleImg' src='" + imageSec + "'>";
        listInfoSec += `<a href='${story.url}'>`;
        listInfoSec += "<strong>" + titleSec + "</strong>";
        listInfoSec += "<br/>" + storyTimeSec + " | Read more at " + sourceSec;
        listInfoSec += "</a></li>";
    }

    function displayResults(story){
        var resultTitle = story.title;
        var resultSource = story.source.name;
        var resultImage = story.urlToImage;
        var resultStoryTime = moment(story.publishedAt).format('MMMM Do, YYYY');

        resultInfo += "<li class='wrap'>";
        resultInfo += "<img src='" + resultImage + "' width='100'/>";
        resultInfo += `<a href='${story.url}'>`;
        resultInfo += "<strong>" + resultTitle + "</strong>";
        resultInfo += "<br/>" + resultStoryTime + " | Read more at " + resultSource;
        resultInfo += "</a></li>";
    }

    function emptyContent(){
        $("#newest").empty();
        $("#newestSec").empty();
        $("#list").empty();
        $("#listSec").empty();
        $("#results").empty();
    }

    function getResults(){
        var userInput = $("#input").val();        
        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${userInput}&apiKey=3961be64614d4c1e93003369b9d10207`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            userSearch = response.articles;
            
            try {
                if(response.totalResults === 0) throw "No results found. Please try another search.";
            }
            catch(err){
                $("#results").html(err)
            }
            for(var x = 0; x < userSearch.length; x++) {
                displayResults(userSearch[x]);
                $("#results").html(resultInfo);   
            }         
        })
        var userInput = $("#input").val("");  
    }

    $("#button-addon2").on("click", function(){
        emptyContent();
        getResults();
    });

    $("#input").keydown(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == "13"){
            emptyContent();
            getResults();        
        }
    });
});
