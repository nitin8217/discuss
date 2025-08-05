"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib"
import { revalidatePath } from "next/cache"

interface ToggleReactionProps {
  type: 'like' | 'love' | 'laugh' | 'fire' | 'wow' | 'star'
  postId?: string
  commentId?: string
}

export async function toggleReaction({ type, postId, commentId }: ToggleReactionProps) {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    return { error: "You must be signed in to react" }
  }

  try {
    // Check if reaction already exists
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        userId: session.user.id,
        type,
        ...(postId ? { postId } : { commentId })
      }
    })

    if (existingReaction) {
      // Remove existing reaction
      await prisma.reaction.delete({
        where: { id: existingReaction.id }
      })
    } else {
      // Add new reaction
      await prisma.reaction.create({
        data: {
          type,
          userId: session.user.id,
          ...(postId ? { postId } : { commentId })
        }
      })
    }

    // Revalidate the page
    if (postId) {
      revalidatePath(`/posts/${postId}`)
    }
    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('Error toggling reaction:', error)
    return { error: "Failed to toggle reaction" }
  }
}

export async function getReactions(postId?: string, commentId?: string) {
  try {
    const reactions = await prisma.reaction.findMany({
      where: {
        ...(postId ? { postId } : { commentId })
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    // Group reactions by type and count them
    const reactionCounts = reactions.reduce((acc, reaction) => {
      if (!acc[reaction.type]) {
        acc[reaction.type] = {
          count: 0,
          users: []
        }
      }
      acc[reaction.type].count++
      acc[reaction.type].users.push({
        name: reaction.user.name,
        image: reaction.user.image
      })
      return acc
    }, {} as Record<string, { count: number; users: Array<{ name: string | null; image: string | null }> }>)

    return reactionCounts
  } catch (error) {
    console.error('Error getting reactions:', error)
    return {}
  }
}

export async function getUserReactions(userId: string, postId?: string, commentId?: string) {
  try {
    const reactions = await prisma.reaction.findMany({
      where: {
        userId,
        ...(postId ? { postId } : { commentId })
      }
    })

    return reactions.map(r => r.type)
  } catch (error) {
    console.error('Error getting user reactions:', error)
    return []
  }
}
