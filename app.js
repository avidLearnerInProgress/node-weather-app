const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather =  require('./weather/weather.js');


const argv = yargs
.options({
	a: {
		demand : true,
		alias : 'address',
		describe : 'Address to fetch weather for ',
		string : true
	}
})
.help()
.alias('help','h')
.argv;

console.log(argv);
geocode.geocodeAddress(argv['a'], (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	}
	else{
		console.log(JSON.stringify(results, undefined, 2));
		
		latitude = (results['latitude']);
		longitude = (results['longitude']);
		//console.log(latitude);
		//console.log(longitude);
		weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => { 

			if(errorMessage){
				console.log(errorMessage);
			}
			else{
				//console.log(JSON.stringify(weatherResults, undefined, 2));


				if(weatherResults.temperature !== weatherResults.apparentTemperature){
					console.log(`It is currently ${weatherResults.temperature} °F`);
					console.log(`Although, it feels like ${weatherResults.apparentTemperature} °F`);
					console.log(`It is currently ${(weatherResults.temperature-32)*(5/9)} °C`);
					console.log(`Although, it feels like ${(weatherResults.apparentTemperature-32)*(5/9)} °C`);
				}

				else{
					console.log(`It is currently ${weatherResults.temperature} °F`);
					console.log(`Temperatue in celsius: ${(weatherResults.temperature-32)*(5/9)} °C`);

				}
				
			}

		});

	}
});




