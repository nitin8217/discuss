import { prisma } from ".."
import type {Comment} from "@/generated/prisma";
import { cache } from "react";
type CommentWithAuthor = Comment &{
     user : {
        name: string | null;
        image: string | null;
    }
}
export const fetchCommentsByPostId = cache(async (postId: string) : Promise<CommentWithAuthor[]> =>
{
    return prisma.comment.findMany({
        where: {
            postId
        },
        include: {
            user: {
                select: {
                    name: true,
                    image:true,
                }
            }
        }
    })
})
