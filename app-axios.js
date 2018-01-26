const yargs = require('yargs');
const axios = require('axios');

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


nospace = "";
address = argv.address.split(',').join(nospace);
//console.log(address);
address = encodeURIComponent(address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBN_A6OjHX7a3MsUDi1VwDG6dbmD_6OCLE%20&address=${address}`;	

axios.get(geocodeUrl).then((response) =>{

	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find address.');
	}
	var latitude = response.data.results[0].geometry.location.lat;
	var longitude = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/09786559df9a9219d88faeebca8afcf3/${latitude},${longitude}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);

}).then((response) => {

	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;

	console.log(`It is currently ${temperature} °F`);
	console.log(`Although, it feels like ${apparentTemperature} °F`);
		

}).catch((e) => {
	if(e.code === 'ENOTFOUND')
		console.log('Unable to connect to API server');
	else
		console.log(e.message);

});



