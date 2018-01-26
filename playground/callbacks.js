/*
What happens here is basically,

Func getUser is called with 20 as id and callback function as callback.
callback function body is not passed to getUser, only the callback function is registered.
getUser defines the user object which is passed as params to callback function.
callback function is fired inside setTimeout(), hence the body of callback inside getUser gets executed.

*/

var getUser = (id, callback) => {
	var user = {
		id : id,
		name : 'Chirag'
	};

	console.log('Without callback:');
	console.log('ID: ' + user.id);
	console.log('Name: ' + user.name);


	setTimeout(() => {
		callback(user);
	},2000);
};


getUser(20, (userObject) => {
	console.log('After Delay using callback:');
	console.log(userObject);
});
