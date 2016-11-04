var User = require('../../schemas/userSchema')

module.exports = (userId, friendId) => {
	return User.findOne({'_id': friendId})
	.then(function(user){

		var has = false;
		user.requests.forEach(function(id){
			if (String(id) === String(userId)) {
				has = true;
			}
		});
		user.friends.forEach(function(id){
			if (String(id) === String(userId)) {
				has = true;
			}
		});
		if (!has) {
			return User.findOneAndUpdate({
				'_id': friendId
			}, {
				$push: {
					requests: userId
				}
			})
		} else {
			return User.findOne({
				'_id': friendId
			});
		}
	});
}
