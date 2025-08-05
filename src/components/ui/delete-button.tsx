"use client"

import { Trash2 } from "lucide-react"
import { Button } from "./button"
import { deletePost, deleteComment } from "@/actions/delete-content"
import { useState, useTransition } from "react"

interface DeletePostButtonProps {
  postId: string
}

interface DeleteCommentButtonProps {
  commentId: string
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    startTransition(async () => {
      await deletePost(postId)
    })
  }

  if (!showConfirm) {
    return (
      <Button
        onClick={() => setShowConfirm(true)}
        size="sm"
        variant="outline"
        className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-300"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Post
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDelete}
        disabled={isPending}
        size="sm"
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {isPending ? "Deleting..." : "Confirm Delete"}
      </Button>
      <Button
        onClick={() => setShowConfirm(false)}
        size="sm"
        variant="outline"
        className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
      >
        Cancel
      </Button>
    </div>
  )
}

export function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    startTransition(async () => {
      await deleteComment(commentId)
    })
  }

  if (!showConfirm) {
    return (
      <Button
        onClick={() => setShowConfirm(true)}
        size="sm"
        variant="outline"
        className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-300"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDelete}
        disabled={isPending}
        size="sm"
        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1"
      >
        {isPending ? "..." : "Delete"}
      </Button>
      <Button
        onClick={() => setShowConfirm(false)}
        size="sm"
        variant="outline"
        className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 text-xs px-2 py-1"
      >
        Cancel
      </Button>
    </div>
  )
}
