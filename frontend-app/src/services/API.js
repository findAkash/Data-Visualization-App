import CONFIG from '../config';
import { removeToken } from '../utils/RemoveToken';

const API = {
  login: async (email, password) => {
    const response = await fetch(`${CONFIG.API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Login failed: ${response.statusText}`);
    }
  },
  logout: async (token) => {
    const response = await fetch(`${CONFIG.API_URL}/auth/logout/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      removeToken();
      return await response.json();
    } else {
      throw new Error(`Logout failed: ${response.statusText}`);
    }
  },
  fetchData: async () => {
    const response = await fetch(`${CONFIG.API_URL}/species/`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Error in fetching data: ${response.statusText}`);
    }
  },
};
export default API;
