'use server'
import { auth } from '@/auth';
import { Post } from '@/generated/prisma/wasm';
import { prisma } from '@/lib';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {z} from 'zod';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

type CreatePostState = {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    }
}
 
export const createPost = async (slug:string, prevState: CreatePostState, formData: FormData):Promise<CreatePostState> => {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })
    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const session = await auth();
    if(!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['You have to login to create posts']
            }
        }
    }
    
    // First find the topic by slug
    const topic = await prisma.topic.findUnique({
        where: { slug }
    });
    
    if (!topic) {
        return {
            errors: {
                _form: ['Topic not found']
            }
        }
    }
    
    let post: Post;
    try{
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch(error: unknown) {
        if(error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong while creating post']
                }
            }
        }
    }
    revalidatePath(`/topics/${slug}`)
    redirect(`/topics/${slug}/posts/${post.id}`)
}

export const editPost = async (postId: string, prevState: CreatePostState, formData: FormData): Promise<CreatePostState> => {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['You have to login to edit posts']
            }
        }
    }
    
    try {
        // First check if the post exists and user owns it
        const existingPost = await prisma.post.findUnique({
            where: { id: postId }
        });
        
        if (!existingPost) {
            return {
                errors: {
                    _form: ['Post not found']
                }
            }
        }
        
        if (existingPost.userId !== session.user.id) {
            return {
                errors: {
                    _form: ['You can only edit your own posts']
                }
            }
        }
        
        await prisma.post.update({
            where: { id: postId },
            data: {
                title: result.data.title,
                content: result.data.content
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong while editing post']
                }
            }
        }
    }
    
    revalidatePath(`/posts/${postId}`)
    return {
        errors: {}
    }
}
