import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouritesState } from './Favourites.types';
import { Post } from '../Posts/Posts.types';

const initialState: FavouritesState = {
  posts: [],
  checkedPosts: [],
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
    addCheckedEntity: (state, action: PayloadAction<Post>) => {
      state.checkedPosts.push(action.payload);
    },
    removeCheckedEntity: (state, action: PayloadAction<Post>) => {
      state.checkedPosts = state.checkedPosts.filter((post) => {
        return post.id !== action.payload.id;
      });
    },
    addCheckedEntitiesToState: (state) => {
      state.posts.push(...state.checkedPosts);
    },
  },
});

const { reducer, actions } = favourites;
export const { addEntity, removeEntity, removeCheckedEntity, addCheckedEntity, addCheckedEntitiesToState } = actions;
export default reducer;
