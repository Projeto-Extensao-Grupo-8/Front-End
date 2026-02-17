import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
  async config => {
    const token = "LUGAR DO TOKEN / TEMP";

    if (config.url === '/login') {
      return config;
    } else {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }
  },
  async (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);