//Holds the app configs
// Import node path module (may need for DB credentials)
const path = require('path');

module.exports = {
  port: process.env.PORT || 5000,

  //Application secret for creating a secure web token
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'password',
    adminSecret: process.env.ADMIN_SECRET || 'admin'
  }
  
}