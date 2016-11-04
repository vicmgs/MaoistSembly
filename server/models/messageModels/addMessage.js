var Message = require('../../schemas/messageSchema.js');
var Event = require('../../schemas/eventsSchema.js');

module.exports = (eventId, userId, text) => {
 var message = new Message({text: text, user: userId, event: eventId});
 return message.save();
};
