const request = require('request');

var getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/728f5031ccec2e9200c674a047fb1bdc/${lat},-${lng}`,
    json: true //allows us to skip the step of converting to json
  }, (error, response, body) => {
    if(error){
      callback('unable to connect to server');
    } else if(response.statusCode === 400) {
      console.log('unable to fetch weather')
    } else if(response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });

};

module.exports.getWeather = getWeather;
