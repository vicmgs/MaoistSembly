var messageModel = require('../../models/messageModels');

module.exports = (req, res) => {
  var eventId = req.body.eventId;
  var userId = req.body.userId;
  var text = req.body.text

  messageModel.addMessage(eventId, userId, text)
  .then((message) => {
    if (message) {
      res.status(200).send(message);
    }
  })
  .catch((err) => {
    res.status(500).send();
  });
};
