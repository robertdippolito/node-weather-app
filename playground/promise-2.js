const request = require('request');

var geocodeAddress = (address, resolve, reject) => {
  return new Promise((resolve, reject) => {
    let addressValue = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressValue}`,
      json: true //allows us to skip the step of converting to json
    }, (error, response, body) => {
      if(error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO RESULTS') {
        reject('Unable to find that address.');
      } else if(body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      } else {
        console.log('no results found');
      }
    });

  });
};

geocodeAddress('000000000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage)
});
