import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsState, User } from './Posts.types';
import getData from '../../../utils/getData';
export const fetchData = createAsyncThunk<[Post[], User[]]>('posts/fetchPosts', () => {
  return Promise.all([getData<Post[]>('posts'), getData<User[]>('users')]);
});

const initialState: PostsState = {
  fetchRequest: false,
  fetchSuccess: false,
  fetchFailed: false,
  loading: true,
  posts: [],
  users: [],
  checkedPosts: [],
};

const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => {
        return post.id !== action.payload;
      });
      state.checkedPosts = state.checkedPosts.filter((id) => {
        return id !== action.payload;
      });
    },
    removePosts: (state, action: PayloadAction<number[]>) => {
      const postsId = action.payload;
      postsId.forEach((id) => {
        state.posts = state.posts.filter((post) => {
          return post.id !== id;
        });
      });
      state.checkedPosts = [];
    },
    addCheckedPost: (state, action: PayloadAction<number>) => {
      state.checkedPosts.push(action.payload);
    },
    removeCheckedPost: (state, action: PayloadAction<number>) => {
      state.checkedPosts = state.checkedPosts.filter((post) => {
        return post !== action.payload;
      });
    },
    clearCheckedPosts: (state) => {
      state.checkedPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.fetchRequest = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<[Post[], User[]]>) => {
      state.fetchRequest = false;
      state.fetchSuccess = true;
      state.posts = action.payload[0];
      state.users = action.payload[1];
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
      state.fetchFailed = true;
      state.fetchRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer, actions } = posts;

export const { removePost, addCheckedPost, removeCheckedPost, removePosts, clearCheckedPosts } = actions;
export default reducer;
