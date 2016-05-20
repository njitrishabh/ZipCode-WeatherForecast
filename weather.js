var http = require("http");
//print out message
function printMsg(city, temp) {
    var msg = "The forecast for " + city + " is " + temp;
    console.log(msg);
}
//print out error message
function printError(error) {
    console.error('Problem with request: ' + error.message);
}
function get(zip) {
    //connect to api url
    var request = http.get("http://api.wunderground.com/api/yourapikey/forecast/geolookup/q/" + zip + ".json", function(response){
        var body = "";
        //read the data
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function(){
            //console.log(body);
            if(response.statusCode ===200){
                try {
                    //parse the data (read the data from a string in a program friendly way
                    var profile = JSON.parse(body);
                    //print out the data
                    printMsg(profile.location.city, profile.forecast.txt_forecast.forecastday[0].fcttext);
                } catch(error) {
                    //handling a parse error
                    printError(error);
                }
            } else {
                //handling status code error
                printError({message: "There was an error getting a profile for " + zip + ". (" + http.STATUS_CODES[response.statusCode] +")"});
            }
        });
    });
    //Connection Error
    request.on('error', printError);
}

module.exports.get = get;
