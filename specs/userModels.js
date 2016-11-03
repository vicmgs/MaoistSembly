var chai = require('chai');
var expect = chai.expect;
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Models', function() {
  before(function(done){
    User.remove({}).exec()
    .then(function(){
      done();
    });
  });

  describe('add User', function() {
    it('should add a new user to the database', function(done) {
      userModels.addUser(testUser)
      .then(function() {
        return User.findOne({'email': 'test@test.com'}).exec()
      })
      .then(function(user) {
        expect(user.email).to.equal('test@test.com');
        done();
      });
    });
    it('should throw an error when email already exists', function(done) {
      userModels.addUser(testUser)
      .catch(function(error) {
        expect(error.message.includes('duplicate key error')).to.equal(true);
        done();
      });
    });
  });

  describe('login', function(){
    it('should retrieve the user if the passwords match', function(done){
      userModels.logIn(testUser.email, testUser.password)
      .then(function(user) {
        expect(user.firstName).to.equal('Test');
        done();
      })
    });
    it('should return "Incorrect Password" if the password is incorrect', function(done){
      userModels.logIn(testUser.email, 'WAHHHPIZZAAWOOOO')
      .then(function(err) {
        expect(err).to.equal('Incorrect Password');
        done();
      });
    });
    it('should return "User does not exist" if the password is incorrect', function(done){
      userModels.logIn('WOOGOOO', 'WAHHHPIZZAAWOOOO')
      .then(function(err) {
        expect(err).to.equal('User does not exist');
        done();
      });
    });
  });

  describe('user Search', function() {
    it('should return users based on email', function(done) {
      userModels.userSearch('test')
      .then(function(users) {
        expect(users[0].email).to.equal('test@test.com');
        done();
      });
    });
    it('should return users based on name', function(done) {
      userModels.userSearch('User')
      .then(function(users) {
        expect(users[0].email).to.equal('test@test.com');
        done();
      });
    });
  });

  describe('User\'s location', (done) => {
    it('should have no default location', (done) => {
      userModels.userSearch('test')
      .then((users) => {
        expect(users[0].location).is.undefined;
        done();
      });
    });

    it('should reflect the user location after update location', (done) => {
      var location = [ 37.0031, 34.2223 ];
      userModels.userSearch('test')
      .then((users) => {
        var user = users[0];
        userModels.updateLocation(user.email, location)
        .then((user) => {
          expect(user.location[0]).to.equal(37.0031);
          expect(user.location[1]).to.equal(34.2223);
          done();
        });
      });
    });

    it('should have no location after no location assigned', (done) => {
      var location = [ 110.011, -19.2233 ];
      userModels.userSearch('test')
      .then((users) => {
        var user = users[0];
        userModels.updateLocation(user.email, location)
        .then((user) => {
          userModels.updateLocation(user.email)
          .then(function(updatedUser) {
            expect(updatedUser.location).to.undefined;
            done();
          });
        });
      });
    });
  });

  describe('Update user', () => {
    it('should update firstName, lastName and photoUrl', (done) => {
      var newFirstName = 'James';
      var newLastName = 'Bond'
      var newPhotoUrl = 'http://vignette1.wikia.nocookie.net/jamesbond/images/b/bc/James_Bond_%28Literary%29_-_Profile.jpg'

      userModels.userSearch('test')
      .then((users) => {
        var user = users[0];
        user.firstName = newFirstName;
        user.lastName = newLastName;
        user.photoUrl = newPhotoUrl;
        user.oldEmail = user.email;
        userModels.updateUser(user)
        .then((updatedUser) => {
          expect(updatedUser.firstName).to.equal(newFirstName);
          expect(updatedUser.lastName).to.equal(newLastName);
          expect(updatedUser.photoUrl).to.equal(newPhotoUrl);
          done();
        });
      })
    });

    it('should update password and able to login using new password', (done) => {
      var newPassword = 'newPassword';

      userModels.userSearch('James')
      .then((users) => {
        var user = users[0];
        user.password = newPassword;
        user.oldEmail = user.email;
        userModels.updateUser(user)
        .then((updatedUser) => {
          userModels.logIn(testUser.email, newPassword)
          .then(function(user) {
            expect(user.firstName).to.equal('James');
            done();
          });
        });
      });
    });
  });
});
