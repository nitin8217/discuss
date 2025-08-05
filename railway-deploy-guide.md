# 🚀 Deploy to Railway - Step by Step Guide

## Prerequisites
- GitHub account
- Railway account (sign up at railway.app)
- Your project pushed to GitHub

## Step 1: Prepare Your Project

### 1.1 Add Railway Config
Create `railway.toml` in your project root:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### 1.2 Update package.json
Make sure you have these scripts:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

### 1.3 Environment Variables
Create `.env.example`:
```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-app.railway.app
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
DATABASE_URL="file:./dev.db"
```

## Step 2: Deploy to Railway

### 2.1 Connect GitHub
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `discuss` repository

### 2.2 Configure Environment Variables
In Railway dashboard:
1. Go to your project
2. Click "Variables" tab
3. Add all your environment variables:
   - `NEXTAUTH_SECRET` (generate a new one)
   - `NEXTAUTH_URL` (will be provided by Railway)
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `DATABASE_URL=file:./prisma/dev.db`

### 2.3 Database Setup
Railway will automatically:
- Install dependencies
- Run `prisma generate`
- Build your Next.js app
- Run database migrations

## Step 3: Update GitHub OAuth

### 3.1 Get Your Railway URL
After deployment, Railway will give you a URL like:
`https://your-app-name.railway.app`

### 3.2 Update GitHub OAuth App
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Edit your OAuth app
3. Update:
   - **Homepage URL**: `https://your-app-name.railway.app`
   - **Authorization callback URL**: `https://your-app-name.railway.app/api/auth/callback/github`

### 3.3 Update Environment Variables
In Railway dashboard, update:
- `NEXTAUTH_URL=https://your-app-name.railway.app`

## Step 4: Test Your Deployment

1. Visit your Railway URL
2. Test authentication
3. Test creating posts and comments
4. Test GIF functionality
5. Test reactions and delete buttons

## Alternative: Quick Vercel Deployment (with PostgreSQL migration)

If you prefer Vercel, you'll need to:

### 1. Switch to PostgreSQL
```bash
# Install PostgreSQL adapter
npm install @prisma/adapter-neon

# Update schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### 3. Add Neon PostgreSQL
1. Sign up at [neon.tech](https://neon.tech)
2. Create a database
3. Add connection string to Vercel environment variables

## Environment Variables Checklist
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`
- [ ] `GITHUB_CLIENT_ID`
- [ ] `GITHUB_CLIENT_SECRET`
- [ ] `DATABASE_URL`

## Common Issues & Solutions

### Issue: Database not found
**Solution**: Make sure `DATABASE_URL` is correct and migrations ran

### Issue: GitHub auth not working
**Solution**: Update GitHub OAuth callback URL to match your deployed URL

### Issue: Build fails
**Solution**: Check if all dependencies are in package.json, not just devDependencies

### Issue: 404 on routes
**Solution**: Make sure your Next.js app router structure is correct

## Pro Tips
1. **Use Railway** for easiest deployment with SQLite
2. **Use Vercel + Neon** for maximum performance
3. **Always test authentication** after deployment
4. **Monitor your logs** in the platform dashboard
5. **Set up custom domain** for production use

Happy deploying! 🎉
