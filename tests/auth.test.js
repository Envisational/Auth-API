import * as chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../index.js';
import User from '../models/User.js';

chai.should(); // Initialize should
chai.use(chaiHttp); // Use chai-http

describe('Authentication', function () {
  beforeEach(async function () {
    this.timeout(3000); // Set a global timeout
    await User.deleteMany({}); // Clear the database
  });

  // Test user registration
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const res = await chai.request(app).post('/auth/register').send(user);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('User registered successfully');
    });
  });

  // Test user login
  describe('POST /auth/login', () => {
    it('should log the user in and return a JWT token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      await user.save(); // Save user first

      const res = await chai.request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      res.should.have.status(200);
      res.body.should.have.property('token');
    });
  });
});