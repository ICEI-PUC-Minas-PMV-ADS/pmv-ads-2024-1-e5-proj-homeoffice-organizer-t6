import axios from 'axios';

const baseURL = 'https://pmv-ads-2024-1-e5-proj-homeoffice-jegz.onrender.com';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;