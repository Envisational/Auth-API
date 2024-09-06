const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 
const User = require('../models/User');
chai.should();

chai.use(chaiHttp);


describe('Authentication', () => {
    beforeEach(async () => {
        this.timeout(3000); // Set a global timeout of 3 seconds
        // Clear the database first
        await User.deleteMany({});
    })
});

  // Test user registration
  describe('POST /auth/register', () => {
    it('should register a new user', async (done) => {
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      chai.request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User registered successfully');
          done();
        });
    });
  });

 // Test User login
 describe('PORT auth/login', () => {
    it('Should log the user in and return a JWT token', async (done) => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });


        user.save().then(() => {
            chai.request(app)
            .post('auth/login')
            .send({user})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
        });
    });
 });