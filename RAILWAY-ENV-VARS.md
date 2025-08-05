# 🚀 Railway Environment Variables

Copy these to Railway Dashboard → Your Project → Variables tab:

## 🔥 Required Environment Variables:

NEXTAUTH_SECRET=your-super-secret-key-here-generate-a-new-one-for-production
NEXTAUTH_URL=https://your-app-name.railway.app
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
DATABASE_URL=file:./prisma/dev.db

## 🎨 Optional Environment Variables:

NEXT_PUBLIC_GIPHY_API_KEY=your-giphy-api-key-here

## How to get these values:

### NEXTAUTH_SECRET
Generate a new secret key using this command:
```bash
openssl rand -base64 32
```
Or use any random 32+ character string

### NEXTAUTH_URL
Railway will provide this after deployment (something like https://discuss-production-xxxx.railway.app)
Update this after your first deployment

### GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET
- Go to GitHub Settings → Developer settings → OAuth Apps
- Edit your existing OAuth app OR create a new one
- Use these URLs:
  - Homepage URL: https://your-railway-domain.railway.app
  - Authorization callback URL: https://your-railway-domain.railway.app/api/auth/callback/github

### DATABASE_URL
Keep as: file:./prisma/dev.db (Railway supports file-based SQLite)

### NEXT_PUBLIC_GIPHY_API_KEY (Optional)
**What it does**: Enables GIF search and insertion in comments
**How to get it**:
1. Go to [developers.giphy.com](https://developers.giphy.com/)
2. Sign up for free account
3. Create a new app
4. Copy your API key
5. Add to Railway as: `NEXT_PUBLIC_GIPHY_API_KEY=your-key-here`

**Note**: Without this key, GIF functionality will still work but users will need to paste direct GIF URLs

## 🚨 Important Notes:

- **NEXT_PUBLIC_** prefix means this variable is exposed to the browser (safe for API keys meant to be public)
- **GIPHY is optional** - your app works without it, users can still paste GIF URLs manually
- **All other variables are required** for the app to function properly
