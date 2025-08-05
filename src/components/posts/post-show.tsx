import { prisma } from '@/lib';
import { auth } from "@/auth";
import React from 'react'
import { Calendar, User, FileText, Eye, Heart, Share2, MessageCircle } from 'lucide-react';
import { EmojiReactionButton } from '../ui/emoji-reaction';
import { DeletePostButton } from '../ui/delete-button';
import { getReactions, getUserReactions } from "@/actions/toggle-reaction";

type PostShowProps = {  
    postId: string
};
const PostShow: React.FC<PostShowProps> = async ({postId}) => {
  const session = await auth();
  
  const post = await prisma.post.findFirst({
    where: {
        id: postId
    },
    include: {
      user: true,
      _count: {
        select: {
          comments: true
        }
      }
    }
  })
  
  if (!post) {
        return (
          <div className="relative overflow-hidden">
            {/* Ultra-modern animated background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-900/30 to-yellow-900/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 via-orange-500/15 to-yellow-500/15 blur-3xl rounded-3xl animate-pulse"></div>
            
            <div className="relative neo-glass rounded-3xl p-16 text-center shadow-2xl shadow-black/50">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-3xl blur-2xl opacity-40 animate-pulse glow-effect"></div>
                <div className="relative p-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl shadow-2xl mx-auto w-fit pulse-glow-effect">
                  <FileText className='w-16 h-16 text-white drop-shadow-2xl' />
                </div>
              </div>
              <h3 className='text-4xl font-black bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent mb-6 drop-shadow-2xl'>Post not found</h3>
              <p className='text-slate-200 text-xl leading-relaxed font-medium' style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
              
              {/* Ultra-modern decorative elements */}
              <div className="absolute top-8 right-8 w-5 h-5 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl opacity-70 animate-bounce glow-effect"></div>
              <div className="absolute bottom-8 left-8 w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl opacity-50 animate-pulse pulse-glow-effect"></div>
            </div>
          </div>
        )
    }
  return (
    <div className="relative overflow-hidden">
      {/* Ultra-modern animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-cyan-900/30 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 blur-3xl rounded-3xl animate-pulse"></div>
      
      <article className="relative neo-glass rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Enhanced Header Section */}
        <div className="relative p-10 border-b border-slate-600/30">
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10"></div>
          
          <div className="relative">
            {/* Enhanced Title */}
            <h1 className='text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent mb-8 leading-tight drop-shadow-2xl' style={{textShadow: '2px 2px 8px rgba(0,0,0,0.9)'}}>
              {post.title}
            </h1>
            
            {/* Enhanced Metadata */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Enhanced Author */}
              {post.user && (
                <div className="flex items-center gap-4 px-5 py-3 neo-glass rounded-2xl border border-slate-600/30 hover:border-indigo-500/50 transition-all duration-500 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <User className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-slate-100 font-bold text-lg group-hover:text-white transition-colors duration-300">{post.user.name || 'Anonymous'}</span>
                </div>
              )}
              
              {/* Enhanced Date */}
              <div className="flex items-center gap-4 px-5 py-3 neo-glass rounded-2xl border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-500 group">
                <div className="p-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Calendar className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                <time dateTime={post.createdAt.toISOString()} className="text-slate-100 font-bold text-lg group-hover:text-white transition-colors duration-300">
                  {post.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {}
              <div className="flex items-center gap-4 px-5 py-3 neo-glass rounded-2xl border border-slate-600/30 hover:border-orange-500/50 transition-all duration-500 group">
                <div className="p-2.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                <span className="text-slate-100 font-bold text-lg group-hover:text-white transition-colors duration-300">{post._count?.comments || 0} comments</span>
              </div>
            </div>
          </div>
          
          {}
          <div className="absolute top-8 right-8 w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl opacity-70 animate-pulse glow-effect"></div>
          <div className="absolute bottom-8 left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-2xl opacity-50 animate-bounce pulse-glow-effect"></div>
        </div>
        
        {}
        <div className="relative p-10">
          <div className="relative">
            {}
            <div className="absolute inset-0 neo-glass rounded-3xl border border-slate-600/20"></div>
            
            <div className="relative p-8">
              <div className="text-slate-100 leading-relaxed text-xl whitespace-pre-wrap font-medium" style={{lineHeight: '2', textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>
                {post.content}
              </div>
            </div>
          </div>
          
          {/* Action buttons with emoji reactions */}
          <div className="flex items-center justify-between gap-6 mt-10 pt-8 border-t border-slate-600/30">
            <div className="flex items-center gap-6">
              <EmojiReactionButton 
                targetId={postId}
                targetType="post"
                reactions={await getReactions(postId)}
                userReactions={session?.user?.id ? await getUserReactions(session.user.id, postId) : []}
                className="flex-shrink-0"
              />
              
              <button className="flex items-center gap-3 px-6 py-3 neo-glass hover:border-blue-500/50 rounded-2xl border border-slate-600/30 transition-all duration-500 hover:scale-105 group shadow-xl">
                <Share2 className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="text-slate-300 group-hover:text-white font-bold">Share</span>
              </button>
            </div>
            
            {/* Delete button - only show for post owner */}
            {session?.user?.id === post.userId && (
              <DeletePostButton postId={postId} />
            )}
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 neo-glass rounded-2xl border border-slate-600/30 shadow-xl mt-6">
            <Eye className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 font-bold">Reading time: {Math.ceil(post.content.split(' ').length / 200)} min</span>
          </div>
        </div>
        
        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-80 rounded-b-3xl"></div>
      </article>
    </div>
  )
}

export default PostShow
