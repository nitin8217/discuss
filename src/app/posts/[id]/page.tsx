import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { prisma } from '@/lib';

type PostShowPageProps = {
  params: Promise<{
    id: string
  }>
};

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { id } = await params;
  
  // Get the post to find the topic slug for navigation
  const post = await prisma.post.findFirst({
    where: { id },
    include: { topic: true }
  });
  
  return (
    <div className='space-y-6'>
      {/* Navigation */}
      <div className='flex items-center gap-4'>
        <Link 
          href="/"
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-all duration-200'
        >
          <Home className='w-4 h-4' />
          Home
        </Link>
        
        {post?.topic && (
          <Link 
            href={`/topics/${post.topic.slug}`}
            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-all duration-200'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to {post.topic.slug.replace('-', ' ')}
          </Link>
        )}
      </div>
      
      {/* Post Content */}
      <PostShow postId={id} />
      
      {/* Comments Section */}
      <div id="comments" className='bg-card border border-border rounded-2xl p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <MessageSquare className='w-5 h-5 text-primary' />
          <h2 className='text-xl font-semibold text-foreground'>Discussion</h2>
        </div>
        <CommentCreateForm postId={id} startOpen />
      </div>
      
      <div className='bg-card border border-border rounded-2xl'>
        <CommentList postId={id} />
      </div>
    </div>
  )
}

export default PostShowPage
