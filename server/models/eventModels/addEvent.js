// addEvent
var Event = require('../../schemas/eventsSchema');
var User = require('../../schemas/userSchema');

module.exports = (event) => {
  var userId = event.host;
  var newEvent = new Event(event);
  return newEvent.save()
  .then( event => {
  	return User.findOneAndUpdate({'_id': userId}, {$push: {'hosting': event._id}});
  })
  .then( user => {
    return user;
  });
}



var addInvites = function(eventId, userId) {
	return User.findOneAndUpdate({
		'_id': userId
	}, {
		$push: {
			'invitedTo': eventId
		}
	}).exec();
}
