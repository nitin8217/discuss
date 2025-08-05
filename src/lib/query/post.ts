import { Post } from "@/generated/prisma"
import { prisma } from "..";
export type PostWithData = Post & {
  user?: {
    name: string | null;
  };
  topic?: {
    slug: string;
  };
  _count?: {
    comments: number;
  };
};
export const fetchPostByTopicSlug = async (slug: string): Promise<PostWithData[]> => {
    return prisma.post.findMany({
        where: {
            topic: {
                slug
            }
        },
        include: {
            topic: {
                select : {
                    slug: true
                }
            },
            _count: {   
                select: {
                    comments: true
                }
            },
            user: {
                select: {
                    name: true,
                }
            }
        },
    });
}
export const fetchTopPosts = async () : Promise<PostWithData[]> =>
{
    return prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            topic: {
                select: {
                    slug: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        },
        take: 5
    });
}
export const fetchPostBySearch = async (term: string): Promise<PostWithData[]> => {
    return prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: term,
                    }
                },
                {
                    content: {
                        contains: term,
                    }
                }
            ]
        },
        include: {
            topic: {
                select: {
                    slug: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        }
    });
}
