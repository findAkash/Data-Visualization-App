const Express = require('express');
const SpeciesController = require('../controllers/Species.controller');
const { verifyToken } = require('../middleware/authentication');

class SpeciesRoute {
  static instance() {
    const router = Express.Router();

    // Check Authentication for the following routes
    router.use(verifyToken);

    router.get('/', SpeciesController.getSpecies);
    return router;
  }
}

module.exports = SpeciesRoute;
