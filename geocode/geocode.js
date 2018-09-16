const request = require('request');

var geocodeAddress = (address, callback) => {

  let addressValue = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressValue}`,
    json: true //allows us to skip the step of converting to json
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO RESULTS') {
      callback('Unable to find that address.');
    } else if(body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    } else {
      console.log('no results found');
    }
  });

};
//exports the function to app.js
module.exports.geocodeAddress = geocodeAddress;
