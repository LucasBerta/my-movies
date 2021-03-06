import axios from "axios";

const BASE_URL = 'http://localhost:3001';
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;