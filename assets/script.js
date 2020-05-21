//======================= Time & Date =======================//

$(document).ready(function() {

    var dateAndYear = moment().format('MMMM Do, YYYY');
    $('#currentDay').html(dateAndYear);
    console.log(dateAndYear);

    var timeHMS = moment().format('h:mm a');
    $('#currentHour').html(timeHMS);
    console.log(timeHMS);

});


//======================= AP NAME AND CODE BELOW =======================//
