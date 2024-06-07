const axios = require('axios');

const URL = 'https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json';

const fetchData = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchData };
