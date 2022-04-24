import api from ".";

export function getDiscoverMovies() {
  return api.get('/discover/movie');
}