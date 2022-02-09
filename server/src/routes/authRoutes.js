
const express = require('express'); 
const router = express.Router();

// Import auth modules
const AuthController = require('../controller/authController');

// Setup routes within export function
module.exports = () => {
  // AUTH: REGISTER (POST) Route
  router.post('/register', 
    AuthController.register
  );

  // AUTH: LOGIN (POST) Route
  router.post('/login', 
    AuthController.login
  );



  return router
}