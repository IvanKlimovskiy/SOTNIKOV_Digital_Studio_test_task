import { combineReducers } from 'redux';
import posts from '../slices/Posts/Posts';
import modal from '../slices/Modal/Modal';
import favourites from '../slices/Favourites/Favourites';
const rootReducer = combineReducers({
  posts,
  modal,
  favourites,
});

export default rootReducer;
