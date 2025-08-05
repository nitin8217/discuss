import React from "react";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentCreateForm from "./comment-create-form";
import { fetchCommentsByPostId } from "@/lib/query/comments";
import { getReactions, getUserReactions } from "@/actions/toggle-reaction";
import { EmojiReactionButton } from "../ui/emoji-reaction";
import { DeleteCommentButton } from "../ui/delete-button";
import { CommentContent } from "../ui/comment-content";
import { Clock, User } from "lucide-react";

type CommentShowProps = {
  postId: string;
  commentId: string;
};

const CommentShow: React.FC<CommentShowProps> = async ({
  postId,
  commentId,
}) => {
  const session = await auth();
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);
  
  if (!comment) return null;
  
  const children = comments.filter((c) => c.parentId === commentId);
  const reactions = await getReactions(undefined, commentId);
  const userReactions = session?.user?.id ? await getUserReactions(session.user.id, undefined, commentId) : [];
  
  return (
    <div className="group relative">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
      <div className="relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1">
        <div className="flex gap-4">
          {/* Avatar with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Avatar className="relative w-12 h-12 ring-2 ring-slate-600/50 shadow-xl border-2 border-slate-700/50">
              <AvatarImage src={comment.user.image || ""} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                {comment.user.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4">
            {/* User info and timestamp */}
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-800/60 rounded-full border border-slate-700/50">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-bold text-white text-sm">
                    {comment.user.name || 'Anonymous'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 rounded-full border border-slate-700/50">
                  <div className="p-1 bg-emerald-500 rounded-full">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <time dateTime={comment.createdAt.toISOString()} className="text-slate-300 text-sm font-medium">
                    {comment.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              
              {/* Delete button - only show for comment owner */}
              {session?.user?.id === comment.userId && (
                <DeleteCommentButton commentId={commentId} />
              )}
            </div>
            
            {/* Comment content with GIF support */}
            <div className="relative">
              <div className="absolute inset-0 bg-slate-800/20 rounded-xl border border-slate-700/30"></div>
              <div className="relative p-4">
                <div className="text-slate-200 leading-relaxed font-medium" style={{lineHeight: '1.7'}}>
                  <CommentContent content={comment.content} />
                </div>
              </div>
            </div>
            
            {/* Reactions */}
            <EmojiReactionButton
              targetId={commentId}
              targetType="comment"
              reactions={reactions}
              userReactions={userReactions}
            />
            
            {/* Reply form */}
            <div className="pt-3 border-t border-slate-700/30">
              <CommentCreateForm postId={comment.postId} parentId={comment.id} />
            </div>
          </div>
        </div>
        
        {/* Decorative dot */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>
      </div>
      
      {/* Child comments */}
      {children.length > 0 && (
        <div className="ml-8 mt-6 space-y-4 relative">
          {/* Connection line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 opacity-60"></div>
          <div className="pl-6 space-y-4">
            {children.map((childComment) => (
              <CommentShow key={childComment.id} postId={postId} commentId={childComment.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentShow;

