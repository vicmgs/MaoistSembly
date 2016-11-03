var User = require('../../schemas/userSchema');

module.exports = (user) => {
  return User.findOne({
    email: user.oldEmail
  })
  .then((lookedUpUser) => {
    if (user.firstName && user.firstName !== '' && user.firstName !== lookedUpUser.firstName) {
      lookedUpUser.firstName = user.firstName;
    }
    if (user.lastName && user.lastName !== '' && user.lastName !== lookedUpUser.lastName) {
      lookedUpUser.lastName = user.lastName;
    }
    if (user.email && user.email !== '' && user.email !== lookedUpUser.email) {
      lookedUpUser.email = user.email;
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
