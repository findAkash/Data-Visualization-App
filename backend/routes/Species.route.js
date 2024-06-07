const Express = require('express');
const SpeciesController = require('../controllers/Species.controller');

class SpeciesRoute {
  static instance() {
    const router = Express.Router();
    router.get('/', SpeciesController.getSpecies);
    return router;
  }
}

module.exports = SpeciesRoute;
