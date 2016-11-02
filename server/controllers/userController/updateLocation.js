var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var email = req.body.email;
  var location = req.body.location;

  if (location && location.length === 0) {
    location = undefined;
  }

  userModels.updateLocation(email, location)
  .then((user) => {
    if (user) {
      res.status(200).send(user.location);
    }
  })
  .catch((err) => {
    res.status(500).send();
  });

};
