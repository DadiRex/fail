# Railway Deployment Guide

## Step 1: Create New Repository
1. Go to GitHub and create a new repository
2. Name it something like `stem-sprouts-backend`
3. Make it public or private (your choice)

## Step 2: Upload Files
Drag and drop these files/folders into your new repository:

### Root Level Files:
- `railway.json` - Railway configuration
- `.gitignore` - Git ignore rules  
- `README.md` - Project documentation
- `DEPLOY.md` - This file

### Backend Folder:
- `backend/server/` - Complete backend application
  - `package.json` - Dependencies
  - `package-lock.json` - Locked versions
  - `server.js` - Main server file

## Step 3: Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your new repository

## Step 4: Set Environment Variables
In Railway dashboard, go to Variables tab and add:
- `OPENAI_API_KEY` = your actual OpenAI API key
- `OPENAI_MODEL` = gpt-4o-mini (optional)
- `LOG_LEVEL` = info (optional)

## Step 5: Deploy
1. Railway will automatically detect the Node.js app
2. It will build from `backend/server` directory
3. Deploy should complete successfully
4. Your app will be available at the Railway URL

## Step 6: Custom Domain (Optional)
1. In Railway, go to Settings  Domains
2. Add your custom domain: `www.wisesproutz.com`
3. Update DNS records as instructed

## Troubleshooting
- If build fails, check that all files are in the correct locations
- Ensure `railway.json` points to `backend/server`
- Verify `package.json` has all required dependencies
- Check that `server.js` is complete and valid JavaScript
