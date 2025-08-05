import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import {prisma} from "@/lib";

// Use environment variables with fallbacks for build time
const githubClientId = process.env.GITHUB_CLIENT_ID || 'build-time-placeholder';
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || 'build-time-placeholder';

export const {handlers:{GET, POST},auth, signIn , signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if(session && user){
                session.user.id = user.id;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development'
})
