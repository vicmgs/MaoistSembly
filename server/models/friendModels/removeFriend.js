// removeFriend.js

var User = require('../../schemas/userSchema')

module.exports = (userId, friendId) => {
  return User.findOneAndUpdate({
      '_id': userId
    }, {
      $pull: {
        friends: friendId
      }
    }).then( success => {
      return User.findOneAndUpdate({
        '_id': friendId
      }, {
        $pull: {
          friends: userId
        }
      })
    })
}
