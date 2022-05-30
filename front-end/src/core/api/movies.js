import api from ".";

export function fetchMovie(id) {
  return api.get(`/movie/${id}`, { params: { append_to_response: 'videos' } });
}

export function fetchMovieCredits(id) {
  return api.get(`/movie/${id}/credits`);
}

export function searchMovie(query, page) {
  return api.get(`/search/movie`, {
    params: {
      query,
      page,
      include_adult: false,
    }
  });
}