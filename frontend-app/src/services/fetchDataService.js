import axios from 'axios';
import CONFIG from '../config';

export const fetchDataService = async () => {
  try {
    const response = await axios.get(`${CONFIG.API_URL}/species/`);
    return response.data;
  } catch (error) {
    console.error('Error in fetching data', error);
    throw error;
  }
};
