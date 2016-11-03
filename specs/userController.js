var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var userController = require('../server/controllers/userController');
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');
var app = require('../server/server');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Controller', function() {
  describe('signUp', function() {
    before(function(done){
      sinon.spy(userModels, 'addUser');
      User.remove({}).exec()
      .then(function(){
        done();
      })
    })
    after(function(){
      userModels.addUser.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(201)
          .end(done);
    });
    it('should call userModel.addUser', function() {
      expect(userModels.addUser.calledOnce).to.equal(true);
    });
    it('should send a 400 when email already exists', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(400)
          .end(done);
    });
  });

  describe('LogIn Controller', function(){
    it('should send a 400 when password is incorrect', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: testUser.email, password: 'LETSBOGOTOCHIPOGO'})
          .expect(400)
          .end(done);
    });
    it('should send a 400 when user does not exist', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: 'PIZZAAAA', password: 'LETSBOGOTOCHIPOGO'})
          .expect(400)
          .end(done);
    });
    it('should send the user when the password is correct', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: testUser.email, password: testUser.password})
          .expect(200)
          .expect(function(res){
            expect(res.body.firstName).to.equal('Test');
            expect(res.body.lastName).to.equal('User');
          })
          .end(done);
    });
  });

  describe('get Users', function() {
    before(function(done){
      sinon.spy(userModels, 'userSearch');
      done();
    })
    after(function(){
      userModels.userSearch.restore();
    })
    it('should get friends with a success', function(done) {
      request(app)
          .get('/api/users/test')
          .expect(200)
          .expect(function(res){
            expect(res.body.length).to.equal(1);
          })
          .end(done);
    });
    it('should call userModels.getUsers', function() {
      expect(userModels.userSearch.calledOnce).to.equal(true);
    });
  });

  describe('User\'s location', () => {
    it('should return a 200 after call API url', (done) => {
      var location = [ 112.3343, 44.2222 ];

      request(app)
        .post('/api/users/update/loc')
        .send({ email: testUser.email, location: location })
        .expect(200)
        .expect((res) => {
          expect(res.body[0]).to.equal(location[0]);
          expect(res.body[1]).to.equal(location[1]);
        })
        .end(done);
    });

    it('should update reset the user\'s location', (done) => {
      request(app)
        .post('/api/users/update/loc')
        .send({ email: testUser.email, location: [] })
        .expect(200)
        .expect((res) => {
          expect(res.body[0]).to.undefined;
          expect(res.body[1]).to.undefined;
        })
        .end(done);
    });
  });

  describe('Update user data', () => {
    it('should return a 200 status code after update the user data (firstName, lastName, photoUrl)', (done) => {
      var newFirstName = 'James';
      var newLastName = 'Bond';
      var newPhotoUrl = 'http://vignette1.wikia.nocookie.net/jamesbond/images/b/bc/James_Bond_%28Literary%29_-_Profile.jpg'

      request(app)
        .put('/api/users/update')
        .send({
          _id: testUser._id,
          email: testUser.email,
          firstName: newFirstName,
          lastName: newLastName,
          photoUrl: newPhotoUrl
         })
        .expect(200)
        .end(done);
    });

    it('should return a 200 status code after update the password', (done) => {
      var newPassword = 'newPassword';

      request(app)
        .put('/api/users/update')
        .send({
          _id: testUser._id,
          email: testUser.email,
          password: newPassword
         })
        .expect(200)
        .end(done);
    });

    it('should be able to login using the new password', (done) => {
      var newPassword = 'newPassword';
      request(app)
        .post('/api/users/login')
        .send({email: testUser.email, password: newPassword})
        .expect(200)
        .expect(function(res){
          expect(res.body.firstName).to.equal('James');
          expect(res.body.lastName).to.equal('Bond');
        })
        .end(done);
    });
  });
});
