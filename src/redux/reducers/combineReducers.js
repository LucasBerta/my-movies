import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import movies from './movies.reducer';

export default combineReducers({
  loadingBar: loadingBarReducer,
  movies
});