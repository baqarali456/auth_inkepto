

# Authentication Project

A Node.js authentication system built with Express.js and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Security**: 
    - bcrypt (password hashing)
    - JWT (authentication tokens)

## Installation

```bash
npm install
```

## Getting Started

Start the server:

```bash
npm start
```

The server will run on the configured port.

## Features

- User authentication with JWT
- Secure password hashing with bcrypt
- MongoDB database integration via Mongoose


## API Endpoints
- `POST https://auth-inkepto.onrender.com/api/register`: Register a new user
- `POST https://auth-inkepto.onrender.com/api/login`: Login and receive a JWT token
- `GET https://auth-inkepto.onrender.com/api/user`: Get user Details (Protected Route)
- `POST https://auth-inkepto.onrender.com/api/logout`: Logout user (Protected Route)
