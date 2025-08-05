"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deletePost(postId: string) {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    return { error: "You must be signed in to delete posts" }
  }

  try {
    // Check if user owns the post
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: session.user.id
      },
      include: {
        topic: true
      }
    })

    if (!post) {
      return { error: "Post not found or you don't have permission to delete it" }
    }

    // Delete the post (cascade will handle reactions and comments)
    await prisma.post.delete({
      where: { id: postId }
    })

    // Redirect to topic page
    revalidatePath(`/topics/${post.topic.slug}`)
    redirect(`/topics/${post.topic.slug}`)
  } catch (error) {
    console.error('Error deleting post:', error)
    return { error: "Failed to delete post" }
  }
}

export async function deleteComment(commentId: string) {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    return { error: "You must be signed in to delete comments" }
  }

  try {
    // Check if user owns the comment
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        userId: session.user.id
      },
      include: {
        post: true
      }
    })

    if (!comment) {
      return { error: "Comment not found or you don't have permission to delete it" }
    }

    // Delete the comment (cascade will handle reactions)
    await prisma.comment.delete({
      where: { id: commentId }
    })

    // Revalidate the post page
    revalidatePath(`/posts/${comment.postId}`)
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { error: "Failed to delete comment" }
  }
}
