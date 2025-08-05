// Runtime validation for production
if (process.env.NODE_ENV === 'production') {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set in production environment");
    }
}

export { GET, POST } from "@/auth";
