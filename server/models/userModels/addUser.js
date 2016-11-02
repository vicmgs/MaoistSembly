// addUser

var User = require('../../schemas/userSchema')

//Add a new user to the database
module.exports = (user) => {
	var newUser = new User(user);
	return newUser.save()
	.then(data => {
		return User.findOne({'email': user.email});
	})
	.then(user => {
		return new Promise( (resolve, reject) => {
			if (!user) {
				resolve('User does not exist');
			} else {
				resolve(user);
			}
		});
	});
}
