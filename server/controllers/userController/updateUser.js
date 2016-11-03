var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var user = {
    _id: req.body._id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    photoUrl: req.body.photoUrl
  };

  return userModels.updateUser(user)
  .then((updatedUser) => {
    res.status(200).send(updatedUser);
  })
  .catch((err) => {
    res.status(500).send(err.message);
  });
}
