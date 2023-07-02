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
  currentPostIds: [],
};

const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => {
        return post.id !== action.payload;
      });
      state.currentPostIds = state.currentPostIds.filter((id) => {
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
      state.currentPostIds = [];
    },
    setCurrentPost: (state, action: PayloadAction<number>) => {
      state.currentPostIds.push(action.payload);
    },
    removeCurrentPost: (state, action: PayloadAction<number>) => {
      state.currentPostIds = state.currentPostIds.filter((postId) => {
        return postId !== action.payload;
      });
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

export const { removePost, setCurrentPost, removeCurrentPost, removePosts } = actions;
export default reducer;
