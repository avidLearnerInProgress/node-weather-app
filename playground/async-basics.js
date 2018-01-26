console.log('Starting app.');

//register callback
//once data fetched, callback is fired

setTimeout(()=>{
	console.log('Inside of callback1');
},2000);

setTimeout(()=>{
	console.log('Inside of callback2');
},0);

console.log('Finishing app.');