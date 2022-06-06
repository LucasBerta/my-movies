const axios = require("axios");

const API_KEY = '293b79acd6ac86183ca9db11ac477cd3';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  }
});

module.exports = {
  api,
  BASE_IMAGE_URL,
  API_KEY,
};