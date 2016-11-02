// signUp.js
var userModels = require('../../models/userModels');

module.exports = (req, res) => {
  var user = req.body;
  userModels.addUser(user)
  .then(success => {
    res.status(201).send(success);
  })
  .catch(error => {
    res.status(400).send('Email already exists');
  })
}
