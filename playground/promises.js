var asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if (typeof a === 'number' && typeof b === 'number'){
				resolve(a+b);
			} else{
				reject('Arguments must be number');
			}

		}, 1500);
	});
};

asyncAdd(5,12).then( (res) => {
	console.log('Result: ', res);
	return asyncAdd(res, 33);
}).then( (res) =>{
	console.log('Result: ', res);
}).catch( (errorMessage) =>{
	console.log(errorMessage);
});

/*var somePromise = new Promise((resolve, reject) => {

	//fulfilled - resolve
	// reject - error

	setTimeout(() =>{
		//resolve('Hey it worked');
		reject('Unable to handle promise');
		}, 2500 );


});

somePromise
.then((message) => {
	console.log('Success:', message);
}, (errorMessage) => {
	console.log('error:', errorMessage);
});
*/