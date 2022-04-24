import axios from "axios";

const API_KEY = '293b79acd6ac86183ca9db11ac477cd3';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL_500 = 'https://image.tmdb.org/t/p/w500';
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  }
});

export default api;
export { API_KEY, BASE_URL, BASE_IMAGE_URL_500 };