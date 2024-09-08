# **Auth API**

A Node.js API built for authentication and authorization using JWT, bcrypt, and MongoDB. The API supports role-based access and is fully containerized with Docker for easy development and deployment.

## **Features**
- User Registration & Login
- Secure Password Hashing (bcrypt)
- JWT Authentication
- Role-Based Access (User/Admin)
- Rate Limiting for Security
- Dockerized for Easy Deployment

## **Technologies**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **Deployment**: Docker, Docker Compose

## **Prerequisites**
- Docker & Docker Compose
- Node.js and npm

## **Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/Envisational/Auth-API.git
cd Auth-API
```

**2. Environment Variables**

Create a .env file in the root directory:
```bash
PORT=3000
MONGO_URI=mongodb://mongo:27017/auth-db
JWT_SECRET=your_jwt_secret
```
**3. Run the application**

```bash
docker-compose up --build
```
This will launch the API at http://localhost:3000.


## API Endpoints

***Authentication***
- POST /auth/register: Register a new user.
- POST /auth/login: Log in and get a JWT.

***Admin Routes***
- GET /admin/dashboard: Access admin-only resources (JWT + Admin Role Required).

**Testing**
To run unit tests:
```bash
npm test
```

## **Deployment**
The project is Dockerized for deployment on any Docker-compatible platform (AWS, DigitalOcean, Azure, etc.).

## **Contributing**
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Open a pull request.


