import React from 'react'
import CommentShow from './comment-show'
import { fetchCommentsByPostId } from '@/lib/query/comments'
import { MessageCircle, Users, Sparkles } from 'lucide-react'
type CommentListProps = {
    postId:string
}
const CommentList : React.FC<CommentListProps> = async ({postId}) => {
    const comments = await fetchCommentsByPostId(postId);
    const topLevelComments = comments.filter((comment) => comment.parentId == null);
  return (
    <div className='relative overflow-hidden'>
      {}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-3xl rounded-3xl animate-pulse"></div>
      <div className='relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-xl shadow-black/20'>
        {}
        <div className='flex items-center gap-6 mb-8 pb-6 border-b border-slate-700/50'>
          <div className='relative'>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className='relative p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg'>
              <MessageCircle className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex-1'>
            <h2 className='font-black text-3xl text-white mb-2 drop-shadow-lg' style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>Comments</h2>
            <div className='flex items-center gap-3 px-4 py-2 bg-slate-800/60 rounded-full border border-slate-700/50 w-fit'>
              <div className="p-1 bg-pink-500 rounded-full">
                <Users className='w-3 h-3 text-white' />
              </div>
              <span className='text-slate-200 text-sm font-semibold'>
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>
          {}
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-60 animate-bounce"></div>
        </div>
        {topLevelComments.length === 0 ? (
          <div className='relative overflow-hidden'>
            {}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-indigo-900/10 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 blur-2xl rounded-2xl animate-pulse"></div>
            <div className='relative text-center py-16 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/40'>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg mx-auto w-fit">
                  <Sparkles className='w-12 h-12 text-white' />
                </div>
              </div>
              <h3 className='text-2xl font-bold text-white mb-4 drop-shadow-lg'>No comments yet</h3>
              <p className='text-slate-300 text-lg leading-relaxed'>Be the first to share your thoughts and start the conversation!</p>
              {}
              <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-40 animate-bounce"></div>
            </div>
          </div>
        ) : (
            <div className='space-y-6'>
                {topLevelComments.map((comment) => (
                    <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id}/>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}
export default CommentList

