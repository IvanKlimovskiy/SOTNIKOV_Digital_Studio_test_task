import { Post } from '../Posts/Posts.types';

export type FavouritesState = {
  posts: Post[];
  checkedPosts: Post[];
};
