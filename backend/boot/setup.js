const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const CONFIG = require('../config/config');

const registerCoreMiddleWare = () => {
  try {
    // create default user for testing
    const { createUser } = require('../controllers/Auth.controllers');
    createUser();

    app.use(
      session({
        secret: CONFIG.SESSION_SECRET,
        // forces the session to be saved back to the session store, even if the session was never modified during the request
        resave: false,
        // forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
          // maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      })
    );

    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //connect to mongodb
    mongoose
      .connect(CONFIG.DB_URL)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
      });

    //routes
    const Routers = require('../routes/Index.route');
    const healthCheckRouter = require('../middleware/healthCheck');
    app.use('/api/v1', Routers.instance());
    app.use(healthCheckRouter);

    app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    console.log(
      'registerCoreMiddleWare :: Error while registering core middleware'
    );
    throw error;
  }
};

//handling uncought exceptions
const handleError = () => {
  // ''

  process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
};

const startApp = (async () => {
  try {
    // register core application level middleware
    registerCoreMiddleWare();

    // exit on uncaught exceptions
    handleError();
  } catch (error) {
    console.log('startup :: Error while booting application');
    throw error;
  }
})();

module.exports = { startApp };
