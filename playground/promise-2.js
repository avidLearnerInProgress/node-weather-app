const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {

		nospace = "";
		address = address.split(',').join(nospace);
		address = encodeURIComponent(address);
		//console.log(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBN_A6OjHX7a3MsUDi1VwDG6dbmD_6OCLE%20&address=${address}`,
			json: true
		}, (error, response, body) => {

			if(error){
				reject('Unable to connect to Google Servers.');
			}
			else if(body.status == 'INVALID_REQUEST'){
				reject('Not a valid address.');
			}
			else if(body.status === 'ZERO_RESULTS'){
				reject('Unable to find address.');
			}
			else if(body.status === 'OK'){
				resolve({
					address : body.results[0].formatted_address,
					latitude : body.results[0].geometry.location.lat,
					longitude : body.results[0].geometry.location.lng
				});
			}	
			else{

			}

		});

		
	});
};



var getWeather = (latitude,longitude) => {
	return new Promise((resolve, reject) => {

		request({
			url : `https://api.darksky.net/forecast/09786559df9a9219d88faeebca8afcf3/${latitude},${longitude}`,
			json: true
		}, (error, response, body) => {

			//console.log(response.statusCode);
			if(!error && response.statusCode === 200){
				resolve(
					{
						temperature : body.currently.temperature,
						apparentTemperature : body.currently.apparentTemperature
					}
				);
			
			}
			 else {
				//console.log('Unable to fetch weather');	
				reject('Unable to fetch weather');
			}
			
		});
	});

};


geocodeAddress('307 Radhakunj Malad East Mumbai').then( (res) => {
	console.log(JSON.stringify(res, undefined, 2));
	return getWeather(res.latitude,res.longitude);
}).then( (res) =>{

	if(res.temperature !== res.apparentTemperature){
		console.log(`It is currently ${res.temperature} °F`);
		console.log(`Although, it feels like ${res.apparentTemperature} °F`);
		console.log(`It is currently ${(res.temperature-32)*(5/9)} °C`);
		console.log(`Although, it feels like ${(res.apparentTemperature-32)*(5/9)} °C`);
	}
	else{
		console.log(`It is currently ${res.temperature} °F`);
		console.log(`It is currently ${(res.temperature-32)*(5/9)} °C`);
	}

}).catch( (errorMessage) =>{
	console.log(errorMessage);
});
