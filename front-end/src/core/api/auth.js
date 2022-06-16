import api from ".";

export function auth(userKey) {
  return api.get(`/auth/${userKey}`);
}