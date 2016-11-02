var User = require('../../schemas/userSchema.js');

module.exports = (email, location) => {
  return User.findOne({
    'email': email
  })
  .then((user) => {
    user.location = location;
    return user.save();
  });
};
