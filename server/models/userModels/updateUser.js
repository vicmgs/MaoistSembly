var User = require('../../schemas/userSchema');

module.exports = (user) => {
  return User.findOne({
    email: user.email
  })
  .then((lookedUpUser) => {
    if (user.firstName && user.firstName !== '' && user.firstName !== lookedUpUser.firstName) {
      lookedUpUser.firstName = user.firstName;
    }
    if (user.firstName && user.lastName !== '' && user.lastName !== lookedUpUser.lastName) {
      lookedUpUser.lastName = user.lastName;
    }

    if (user.password && user.password !== '') {
      lookedUpUser.password = user.password;
    }

    if (user.photoUrl && user.photoUrl !== '' && user.photoUrl !== lookedUpUser.photoUrl) {
      lookedUpUser.photoUrl = user.photoUrl;
    }
    return lookedUpUser.save();
  });
};
