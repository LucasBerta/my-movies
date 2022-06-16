import api from ".";

export function fetchUserConfigByMovie(userId, movieId) {
  return api.get(`/user/${userId}/movie/${movieId}/settings`);
}