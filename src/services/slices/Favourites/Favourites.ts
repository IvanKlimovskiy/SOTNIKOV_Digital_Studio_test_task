import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouritesState } from './Favourites.types';
import { Post } from '../Posts/Posts.types';

const initialState: FavouritesState = {
  posts: [],
};

const favourites = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addEntity: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removeEntity: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => {
        return post.id !== action.payload.id;
      });
    },
  },
});

const { reducer, actions } = favourites;
export const { addEntity, removeEntity } = actions;
export default reducer;
