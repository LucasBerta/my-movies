import api from ".";

export function updateWatchlist(userId, movieId) {
  return api.put(`/user/${userId}/watchlist`, { movieId });
}

export function updateFavorite(userId, movieId) {
  return api.put(`/user/${userId}/favorite`, { movieId });
}