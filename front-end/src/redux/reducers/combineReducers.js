import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import movies from './movies.reducer';
import auth from './auth.reducer';

export default combineReducers({
  loadingBar: loadingBarReducer,
  movies,
  auth,
});