const dotenv = require('dotenv');
dotenv.config();

const CONFIG = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.SECRET || '12231',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/madkudu',
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRATION_TIME || '10', // in days
  REFREST_EXPIRY: process.env.REFRESH_TOKEN_EXPIRATION_TIME || '30', // in days
};

module.exports = CONFIG;
