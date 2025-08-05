"use client";
import React, { useActionState, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/create-comment";
import { Loader2, MessageCircle, Send, Reply } from "lucide-react";
import { GifTrigger } from "../ui/gif-picker";
import { CommentContent } from "../ui/comment-content";
type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};
const CommentCreateForm: React.FC<CommentCreateFormProps> = ({
  postId,
  parentId,
  startOpen,
}) => {
  const [open, setOpen] = useState(startOpen);
  const [content, setContent] = useState("");
  const [selectedGifs, setSelectedGifs] = useState<string[]>([]);
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  const previousPendingRef = useRef(false);

  const handleGifSelect = (gifUrl: string) => {
    setSelectedGifs(prev => [...prev, gifUrl]);
  };

  const removeGif = (indexToRemove: number) => {
    setSelectedGifs(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Combine text content and GIFs for submission
  const getCombinedContent = () => {
    let combinedContent = content;
    if (selectedGifs.length > 0) {
      combinedContent += (content ? '\n\n' : '') + selectedGifs.join('\n');
    }
    return combinedContent;
  };

  // Reset form after successful submission
  const resetForm = useCallback(() => {
    setContent("");
    setSelectedGifs([]);
    if (!startOpen) {
      setOpen(false);
    }
  }, [startOpen]);

  // Monitor form state for successful submission
  useEffect(() => {
    // Check if we just finished a submission (was pending, now not pending)
    if (previousPendingRef.current && !isPending) {
      // Check if submission was successful (no errors in the errors object)
      const hasErrors = formState && formState.errors && Object.keys(formState.errors).some(key => {
        const errorArray = formState.errors[key as keyof typeof formState.errors];
        return errorArray && errorArray.length > 0;
      });
      
      if (!hasErrors) {
        // Small delay to ensure the UI updates properly before reset
        setTimeout(() => {
          resetForm();
        }, 100);
      }
    }
    
    // Update the previous pending state
    previousPendingRef.current = isPending;
  }, [formState, isPending, resetForm]);
  return (
    <div className="space-y-4">
      {!startOpen && (
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setOpen(!open)}
          className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium"
        >
          <Reply className="w-4 h-4 mr-1" />
          Reply
        </Button>
      )}
      {startOpen && !open && (
        <div className="text-center">
          <Button 
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Join the Discussion
          </Button>
        </div>
      )}
      {open && (
        <div className={`${startOpen ? 'bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50' : 'mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50'}`}>
          <form action={action} className="space-y-4">
            {/* Hidden input with combined content for submission */}
            <input type="hidden" name="content" value={getCombinedContent()} />
            
            <div className="space-y-3">
              <Textarea
                name="text-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={parentId ? "Write your reply..." : "Share your thoughts on this post..."}
                className="bg-slate-800/60 border-slate-600/50 focus:border-blue-400/50 focus:ring-blue-400/20 min-h-[100px] resize-none text-white placeholder:text-slate-400"
              />
              
              {/* Selected GIFs display */}
              {selectedGifs.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Selected GIFs:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedGifs.map((gifUrl, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={gifUrl} 
                          alt={`GIF ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-600/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeGif(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Preview section */}
              {(content || selectedGifs.length > 0) && (
                <div className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4">
                  <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Preview:</div>
                  <div className="text-slate-200 text-sm">
                    <CommentContent content={getCombinedContent()} />
                  </div>
                </div>
              )}
            </div>
            {formState.errors.content && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20">
                {formState.errors.content}
              </p>
            )}
            {formState.errors.formError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                {formState.errors.formError}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GifTrigger onGifSelect={handleGifSelect} />
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  disabled={isPending} 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {parentId ? 'Post Reply' : 'Post Comment'}
                    </>
                  )}
                </Button>
                {!startOpen && (
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setOpen(false)}
                    className="border-border text-muted-foreground hover:bg-accent"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default CommentCreateForm;
