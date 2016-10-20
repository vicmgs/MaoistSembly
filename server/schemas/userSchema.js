var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 12;
var Promise = require('bluebird');

//id is given should i still put it in?
var UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    required: true
  },
  salt: String,
  friends: [Schema.ObjectId, ref: 'User'],
  requests: [Schema.ObjectId, ref: 'User'],
  saved: [Schema.Types.ObjectId, ref:'Event'],
  hosting: [Schema.Types.ObjectId, ref:'Event'],
  photoUrl: String


});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
