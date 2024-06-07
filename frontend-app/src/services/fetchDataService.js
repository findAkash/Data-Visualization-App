import axios from 'axios';
import CONFIG from '../config';

export const fetchDataService = async (page, limit) => {
  try {
    const response = await axios.get(
      `${CONFIG.API_URL}/species/?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error in fetching data', error);
    throw error;
  }
};
