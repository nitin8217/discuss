"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { createPost } from "@/actions/create-post";
import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
type CreatePostFormProps = {
  slug: string;
};
const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
    const [formState, action, pending] = useActionState(createPost.bind(null,slug), {errors:{}});
    const [open, setOpen] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    useEffect(() => {
      if (!pending && Object.keys(formState.errors).length === 0 && open && hasSubmitted) {
        const timer = setTimeout(() => {
          setOpen(false);
          setHasSubmitted(false); 
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [pending, formState.errors, open, hasSubmitted]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 border-0 rounded-xl px-6 py-3 font-semibold">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span>New Post</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] neo-glass shadow-xl shadow-black/40 backdrop-blur-ultra border border-slate-600/30 rounded-2xl">
        <form action={action} onSubmit={() => setHasSubmitted(true)}>
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Create a Post</DialogTitle>
            <DialogDescription className="text-slate-300 font-medium">
              Share your thoughts and insights with the community.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200 font-semibold">Post Title</Label>
              <Input 
                id="title" 
                name="title" 
                disabled={pending}
                className="neo-glass border-slate-600/30 focus:border-indigo-400/50 focus:ring-indigo-400/20 rounded-xl text-white placeholder:text-slate-400 py-3 font-medium shadow-lg"
                placeholder="Enter post title..."
              />
              {formState.errors.title && (
                <p className="text-sm text-red-400 neo-glass px-3 py-2 rounded-lg border border-red-800/30">
                  {formState.errors.title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-200 font-semibold">
                Content
              </Label>
              <Textarea 
                id="content" 
                name="content" 
                disabled={pending}
                className="neo-glass border-slate-600/30 focus:border-indigo-400/50 focus:ring-indigo-400/20 min-h-[120px] rounded-xl text-white placeholder:text-slate-400 font-medium shadow-lg resize-none"
                placeholder="Write your post content..."
              />
              {formState.errors.content && (
                <p className="text-sm text-red-400 neo-glass px-3 py-2 rounded-lg border border-red-800/30">
                  {formState.errors.content}
                </p>
              )}
            </div>
            {formState.errors.formError && (
              <div className="border border-red-800/30 neo-glass text-red-400 p-3 rounded-xl">
                {formState.errors.formError}
              </div>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={pending}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/25 rounded-xl py-3 font-semibold transition-all duration-300"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default PostCreateForm;

