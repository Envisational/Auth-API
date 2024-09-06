import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import User from '../models/User.js';

const chai = chaiModule.use(chaiHttp); // Correct usage of chaiHttp

chai.should();

describe('Authentication', function () {
  beforeEach(async function () {
    this.timeout(3000);
    await User.deleteMany({});
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const user = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      const res = await chai.request.execute(app).post('/auth/register').send(user);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('User registered successfully');
    });
  });

  describe('POST /auth/login', () => {
    it('should log the user in and return a JWT token', async () => {
      const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' });
      await user.save();

      const res = await chai.request.execute(app).post('/auth/login').send({ email: 'test@example.com', password: 'password123' });
      res.should.have.status(200);
      res.body.should.have.property('token');
    });
  });
});
