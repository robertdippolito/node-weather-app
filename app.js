const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true //always parse a as a string
    }
  })
  .help()
  .alias('help', 'h') //sets the alias for help
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
        if(errorMessage){
          console.log(errorMessage);
        } else {
          console.log(JSON.stringify(weatherResults), undefined, 2);
          // console.log(`The temperature is ${weatherResults.currently.temperature} but feels like ${weatherResults.currently.apparentTemperature}`);
        }
      });
    }
  });
