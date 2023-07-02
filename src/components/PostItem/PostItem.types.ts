import { Post } from '../../services/slices/Posts/Posts.types';

export type PostComponent = {
  post: Post;
};

export type DataCommentaries = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};
