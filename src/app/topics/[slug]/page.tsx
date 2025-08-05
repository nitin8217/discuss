import PostListWrapper from '@/components/posts/post-list-wrapper';
import PostCreateForm from '@/components/posts/PostCreateForm';
import { fetchPostByTopicSlug } from '@/lib/query/post';
import { Hash, Users, MessageCircle } from 'lucide-react';
import React from 'react'

type TopicShowPageProps = {
  params: Promise<{
    slug: string
  }>
};

const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const posts = await fetchPostByTopicSlug(slug);
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
      <div className='lg:col-span-3 space-y-8'>
        {/* Enhanced topic header */}
        <div className="relative overflow-hidden">
          {/* Animated background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl rounded-3xl animate-pulse"></div>
          
          {/* Main content */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-xl shadow-black/30">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Hash className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-5xl font-black text-white drop-shadow-2xl capitalize leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                  {slug.replace('-', ' ')}
                </h1>
                <p className="text-slate-300 mt-3 text-xl font-medium drop-shadow-xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                  Explore discussions and share your thoughts
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-600/50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-semibold text-sm drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Community Topic</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-600/50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="p-2 bg-purple-500 rounded-full">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-semibold text-sm drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Active Discussions</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-600/50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="p-2 bg-cyan-500 rounded-full">
                  <Hash className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-semibold text-sm drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>{posts.length} Posts</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute bottom-6 left-6 w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>

        <PostListWrapper posts={posts} />
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <PostCreateForm slug={slug} />
        </div>
      </div>
    </div>
  )
}

export default TopicShowPage
