import PostItem from '../PostItem/PostItem';
import { useAppSelector } from '../../hooks';
import React from 'react';
import { PostPageComponent } from './PostPage.types';
import { Post } from '../../services/slices/Posts/Posts.types';

const PostPage: React.FC<PostPageComponent> = ({ startIndex, endIndex }) => {
  const { posts } = useAppSelector((store) => store.posts);

  const postsElement = posts.slice(startIndex, endIndex).map((post: Post) => <PostItem post={post} key={post.id} />);

  return <>{postsElement}</>;
};

export default PostPage;
