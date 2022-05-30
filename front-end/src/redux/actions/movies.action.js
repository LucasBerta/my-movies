import { getDiscoverMovies } from "../../core/api/discover"
import { searchMovie } from "../../core/api/movies";

export const MOVIES_DISCOVER_ACTION = 'MOVIES_DISCOVER_ACTION';
export const SEARCH_MOVIES_ACTION = 'SEARCH_MOVIES_ACTION';

export function handleFetchDiscover() {
  return async dispatch => {
    return getDiscoverMovies().then(response => {
      dispatch(searchDiscoverAction(response.data));
    });
  };
}

export function handleSearchMovie(query, page) {
  return async dispatch => {
    return searchMovie(query, page).then(response => {
      dispatch(searchDiscoverAction(response.data));
    });
  };
}

//////////////////////////////////////////////
export function searchDiscoverAction(movies) {
  return {
    type: MOVIES_DISCOVER_ACTION,
    movies,
  }
}

export function searchMovieAction(movies) {
  return {
    type: SEARCH_MOVIES_ACTION,
    movies,
  }
}