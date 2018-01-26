const request = require('request');

//https://api.darksky.net/forecast/09786559df9a9219d88faeebca8afcf3/37.8267,-122.4233
var getWeather = (latitude,longitude, callback) => {
	
	request({
		url : `https://api.darksky.net/forecast/09786559df9a9219d88faeebca8afcf3/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {

		//console.log(response.statusCode);
		if(!error && response.statusCode === 200){
			callback(undefined,{
			temperature : body.currently.temperature,
			apparentTemperature : body.currently.apparentTemperature
			});
			

			/*callback(`Temperatue in fahrenheit: ${temperature} °F`);
			callback(`Apparent Temperatue in fahrenheit: ${apparentTemperature} °F`);
			
			callback(`Temperatue in celsius: ${(temperature-32)*(5/9)} °C`);
			callback(`Apparent Temperatue in celsius: ${(apparentTemperature-32)*(5/9)} °C`);

		 	//console.log(`Temperatue in fahrenheit: ${temperature} °F`);
		 	//console.log(`Temperatue in celsius: ${(temperature-32)*(5/9)} °C`);
		 	*/


		}
		 else {
			//console.log('Unable to fetch weather');	
			callback('Unable to fetch weather');
		}
		
	});

};

module.exports = {
	getWeather
};
