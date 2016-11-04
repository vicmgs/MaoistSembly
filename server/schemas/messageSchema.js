var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');
var Event = require('./eventsSchema');

var messageSchema = {
  text: String,
  createdAt: {type: Date, default: Date.now},
  event: {type: Schema.Types.ObjectId, ref: 'Event'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
