const Species = require('../models/Species');
const { fetchData } = require('../services/fetchData');

const getSpecies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const speciesData = await fetchData();
    const species = speciesData.map((data) => Species.fromJson(data));
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < species.length) {
      results.pagination = {
        page: page + 1,
        limit: limit,
        totalPages: Math.ceil(species.length / limit),
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    // results.data = species.slice(startIndex, endIndex);
    results.data = species;

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSpecies };
