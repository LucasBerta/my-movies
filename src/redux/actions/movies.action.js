import { getDiscoverMovies } from "../../core/api/discover"

export const MOVIES_DISCOVER_ACTION = 'MOVIES_DISCOVER_ACTION';

export function handleFetchDiscover() {
  getDiscoverMovies();
  return async dispatch => {
    return getDiscoverMovies().then(response => {
      dispatch(searchDiscoverAction(response.data));
    });
  };
}

export function searchDiscoverAction(movies) {
  return {
    type: MOVIES_DISCOVER_ACTION,
    movies,
  }
}