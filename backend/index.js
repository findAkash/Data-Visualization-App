const startApp = require('./boot/setup').startApp;

() => {
  try {
    startApp();
  } catch (error) {
    console.error('Error in index.js => startApp');
    throw error;
  }
};
