import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


type PostShowPageProps = {  params: Promise<{
    slug: string,
    postid: string
  }>
};
const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postid } = await params;
  return (
    <div className='space-y-3'>
      <Link href={`/topics/${slug}`} className='flex items-center gap-2 text-blue-500 hover:underline'>
      
      <ChevronLeft/>
      Back to {slug} topic
     
      </Link>
      <PostShow postId={postid} />
      <CommentCreateForm postId={postid} startOpen />
      <CommentList postId={postid} />
    </div>
  )
}

export default PostShowPage
