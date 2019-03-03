var city = process.argv[2] || 'austin';
var day = process.argv[3] || 0;

var axios = require('axios');

function end(res) {
    var cel = res.data.consolidated_weather[Number(day)].the_temp
    var feh =(Number(cel) * 9 / 5) + 32
    console.log(city + ': ' + Math.round(feh) + ' °F');
}

function doneGettingWoeId(res) {
    var woeid = res.data[0].woeid
    axios.get('https://www.metaweather.com/api/location/' + woeid).then(end)
}

axios.get('https://www.metaweather.com/api/location/search/?query=' + city)
     .then(doneGettingWoeId);
