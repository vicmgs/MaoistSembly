// addUser

var User = require('../../schemas/userSchema')

//Add a new user to the database
module.exports = (user) => {
	var newUser = new User(user);
	return newUser.save()
	.then(data => {
		return data;
	});
}
