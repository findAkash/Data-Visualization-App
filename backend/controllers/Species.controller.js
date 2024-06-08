const Species = require('../models/Species');
const { fetchData } = require('../services/fetchData');
const {
  APIError,
  APIResponse,
  handleAsyncRequest,
} = require('../middleware/handleAsyncRequest');
const statusCode = require('../constants/statusCodes');

const getSpecies = handleAsyncRequest(async (req, res, next) => {
  try {
    const speciesData = await fetchData();
    const species = speciesData.map((data) => Species.fromJson(data));
    return new APIResponse(true, 'Species data fetched successfully', {
      species,
    });
  } catch (error) {
    console.error(error);
    throw new APIError('Error in fetching species data', statusCode.badGateway);
  }
});

module.exports = { getSpecies };
