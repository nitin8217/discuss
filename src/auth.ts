import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import {prisma} from "@/lib";

// Use placeholder values during build, real values at runtime
const githubClientId = process.env.GITHUB_CLIENT_ID || 'build-placeholder';
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || 'build-placeholder';

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
    }
})
