  var weatherforecast = require("./weather.js");
     var cities = process.argv.slice(2);
     cities.forEach(weatherforecast.get);
//    weatherforecast.get(TestVar);
