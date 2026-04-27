import axios from "axios";

export const api = axios.create({
  baseURL: "http://54.236.10.100:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

api.interceptors.request.use((config) => {
  console.log('requisição:', config.method?.toUpperCase(), config.baseURL + config.url, config.params);
  return config;
});
