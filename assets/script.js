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

//======================= AP NAME AND CODE BELOW =======================//
