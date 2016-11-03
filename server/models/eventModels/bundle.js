// bundle.js
var Promise = require('bluebird');

var Event = require('../../schemas/eventsSchema');
var User = require('../../schemas/userSchema');
var getEvents = require('./getEvents');

module.exports = (userId, location) => {
  var events=[];
  return User.findOne({'_id': userId})
  .populate('friends')
  .then( user => {
    return new Promise((resolve, reject) => {
    	user.friends.forEach(friend => {
        friend.hosting.forEach(event => {
          events.push(event);
        })
      })
      user.hosting.forEach(event => {
        events.push(event);
      })
      resolve(events);
    });
  })
  .then( events => {
  	var promises = []
    var results = [];

    events.forEach( eid => {
      promises.push(Event.findOne({'_id': eid}));
    })
    return Promise.all(promises)
  })
  .then(events => {
    return events;
  })
}
