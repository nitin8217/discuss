import React from 'react';
import LoadingLink from '@/components/ui/loading-link';
import { MessageSquare, User, Clock, TrendingUp } from 'lucide-react';
import { PostWithData } from '@/lib/query/post';
interface PostListProps {
  posts: PostWithData[];
}
const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-12">
            <div className="mb-6 relative">
              <MessageSquare className="w-16 h-16 text-primary mx-auto animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full animate-ping opacity-75"></div>
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              No posts yet
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Be the first to start a discussion and ignite the conversation!
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className="group relative"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'slideInUp 0.6s ease-out forwards'
          }}
        >
          {}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"></div>
          {}
          <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/70 transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-2 shadow-lg shadow-black/25 hover:bg-slate-900/80">
            {}
            {index < 3 && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl animate-bounce">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                HOT
              </div>
            )}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <LoadingLink 
                  href={`/posts/${post.id}`}
                  className="block group/link"
                >
                  <div className="relative mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover/link:text-blue-100 transition-all duration-300 leading-tight drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      {post.title}
                    </h3>
                    <div className="h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left mt-2 rounded-full"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl bg-slate-800/60 backdrop-blur-sm p-6 mb-6 border border-slate-700/50">
                    <p className="text-slate-200 leading-relaxed line-clamp-3 group-hover/link:text-white transition-colors duration-300 drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
                      {post.content}
                    </p>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-slate-700/20 to-transparent rounded-tl-2xl"></div>
                  </div>
                </LoadingLink>
                {}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {}
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/60 hover:bg-slate-800/80 rounded-full transition-all duration-300 group/author border border-slate-700/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center group-hover/author:scale-110 transition-transform duration-300 shadow-lg">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 group-hover/author:text-white transition-colors duration-300 font-semibold">
                      {post.user?.name || 'Anonymous'}
                    </span>
                  </div>
                  {}
                  {post.topic && (
                    <LoadingLink 
                      href={`/topics/${post.topic.slug}`}
                      className="group/topic"
                    >
                      <div className="relative px-4 py-2 bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600/70 rounded-full transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                        <span className="text-slate-200 font-bold text-xs uppercase tracking-wide">
                          {post.topic.slug.replace('-', ' ')}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full opacity-0 group-hover/topic:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </LoadingLink>
                  )}
                  {}
                  <LoadingLink 
                    href={`/posts/${post.id}#comments`}
                    className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-slate-800/80 transition-all duration-300 group/comments border border-slate-700/50 cursor-pointer bg-slate-800/60"
                  >
                    <div className="relative">
                      <div className="p-1.5 bg-indigo-500 rounded-full group-hover/comments:scale-110 transition-transform duration-300">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                      {(post._count?.comments || 0) > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span className="text-slate-200 group-hover/comments:text-white transition-colors duration-300 font-semibold">
                      {post._count?.comments || 0} comments
                    </span>
                  </LoadingLink>
                  {}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-slate-800/80 transition-all duration-300 group/date border border-slate-700/50 bg-slate-800/60">
                    <div className="p-1.5 bg-amber-500 rounded-full">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-200 group-hover/date:text-white transition-colors duration-300 font-medium">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-bounce"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostList;

