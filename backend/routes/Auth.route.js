const Express = require('express');
const AuthController = require('../controllers/Auth.controllers');

class AuthRoute {
  static instance() {
    const router = Express.Router();
    router.post('/login', AuthController.login);
    router.post('/refresh-token', AuthController.refreshToken);
    router.post('/logout', AuthController.logout);
    return router;
  }
}

module.exports = AuthRoute;
