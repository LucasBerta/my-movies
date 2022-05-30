import { MOVIES_DISCOVER_ACTION } from "../actions/movies.action";

export default function moviesReducer(state = {}, action) {
  switch (action.type) {
    case MOVIES_DISCOVER_ACTION:
      return {
        ...action.movies,
      }
    default:
      return state;
  }
}