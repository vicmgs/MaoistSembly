var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    photoUrl: req.body.photoUrl
  };

  return userModels.updateUser(user)
  .then((updatedUser) => {
    res.status(200).send(updatedUser.email);
  })
  .catch((err) => {
    res.status(500).send();
  });
}
