const Express = require('express');
const SpeciesRoute = require('./Species.route');
const AuthRoute = require('./Auth.route');
const { createUser } = require('../controllers/Auth.controllers');

class IndexRoute {
  static instance() {
    const router = Express.Router();
    router.use('/species', SpeciesRoute.instance());
    router.use('/auth', AuthRoute.instance());
    return router;
  }
}

module.exports = IndexRoute;
