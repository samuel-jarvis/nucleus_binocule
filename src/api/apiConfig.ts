// configure axios for api calls
import axios from "axios";

export const API_URL_RAW = "https://spaceweb.io";

const api = axios.create({
  baseURL: `${API_URL_RAW}/api/v1`,
});

// api.defaults.withCredentials = true;


// add token to request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

