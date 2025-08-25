# 🚂 Railway Deployment Guide for WiseSproutz

## 🎯 **Goal: Get your website online at www.wisesproutz.com**

## 📋 **Step 1: Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. **FREE PLAN** - Select "Deploy from GitHub repo"

## 📋 **Step 2: Connect Your Code**
1. Click "Deploy from GitHub repo"
2. Select your repository: `stem-sprouts-website`
3. Railway will automatically detect it's a Node.js project
4. Click "Deploy Now"

## 📋 **Step 3: Set Environment Variables**
1. In Railway dashboard, go to "Variables" tab
2. Add these variables:
   ```
   OPENAI_API_KEY = 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
   NODE_ENV = production
   PORT = 3000
   ```

## 📋 **Step 4: Get Your Railway URL**
1. After deployment, Railway gives you a URL like:
   `https://your-project-name-production.up.railway.app`
2. Copy this URL - you'll need it for the domain setup

## 📋 **Step 5: Connect Your Domain**
1. In Railway, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter: `www.wisesproutz.com`
4. Railway will give you DNS settings to configure

## 📋 **Step 6: Configure DNS (at your domain provider)**
1. Go to where you bought `wisesproutz.com` (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add these records (Railway will show you the exact values):
   - Type: CNAME
   - Name: www
   - Value: [Railway URL from Step 4]

## 🎉 **Done!**
- Your website will be live at www.wisesproutz.com
- It will automatically update when you push code to GitHub
- 100% free hosting with professional reliability

## 🔧 **Troubleshooting**
- If deployment fails, check the "Deployments" tab for error logs
- Make sure all environment variables are set correctly
- The first deployment might take 5-10 minutes

## 📱 **Test Your Website**
Once deployed, test these endpoints:
- `https://www.wisesproutz.com/healthz`
- `https://www.wisesproutz.com/__selfcheck`
- `https://www.wisesproutz.com/api/character`
- `https://www.wisesproutz.com/api/story` 