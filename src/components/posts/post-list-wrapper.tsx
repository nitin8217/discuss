'use client';
import React from 'react';
import PostList from './post-list';
import { PostWithData } from '@/lib/query/post';
interface PostListWrapperProps {
  posts: PostWithData[];
}
const PostListWrapper: React.FC<PostListWrapperProps> = ({ posts }) => {
  return (
    <div className="relative">
      {}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
      <PostList posts={posts} />
    </div>
  );
};
export default PostListWrapper;

