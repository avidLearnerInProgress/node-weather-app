const request = require('request');

var geocodeAddress = (address, callback) => {
	nospace = "";
	address = address.split(',').join(nospace);
	//console.log(address);
	address = encodeURIComponent(address);
	//console.log(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBN_A6OjHX7a3MsUDi1VwDG6dbmD_6OCLE%20&address=${address}`,
		json: true
	}, (error, response, body) => {

		if(error){
			callback('Unable to connect to Google Servers.');
		}
		else if(body.status == 'INVALID_REQUEST'){
			callback('Not a valid address.');
		}
		else if(body.status === 'ZERO_RESULTS'){
			callback('Unable to find address.');
		}
		else if(body.status === 'OK'){
			callback(undefined,{
				address : body.results[0].formatted_address,
				latitude : body.results[0].geometry.location.lat,
				longitude : body.results[0].geometry.location.lng
			});
			
			/*console.log(`Address: ${body.results[0].formatted_address}`);
			console.log('Geometry:')
			console.log(`\tLatitude: ${}`);
			console.log(`\tLongitude: ${body.results[0].geometry.location.lng}`);*/
		}	
		else{

		}

	});

};

module.exports = {
	geocodeAddress
};



//09786559df9a9219d88faeebca8afcf3