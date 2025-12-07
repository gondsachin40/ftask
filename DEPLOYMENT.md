# Deployment Guide for Render

This guide will help you deploy your Angular frontend and Node.js backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. MongoDB database (MongoDB Atlas recommended for cloud hosting)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

Make sure all your changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

## Step 2: Deploy Backend Service

1. Go to your Render dashboard: https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository
4. Configure the service:
   - **Name**: `ftask-backend` (or your preferred name)
   - **Root Directory**: `TaskShare`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose your plan (Free tier available)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRET` = Your JWT secret key (generate a strong random string)
   - `FRONTEND_URL` = Will be set after frontend deployment (e.g., `https://ftask-frontend.onrender.com`)

6. Click **"Create Web Service"**

7. Wait for deployment to complete and note the backend URL (e.g., `https://ftask-backend.onrender.com`)

## Step 3: Deploy Frontend Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect the same Git repository
3. Configure the service:
   - **Name**: `ftask-frontend` (or your preferred name)
   - **Root Directory**: Leave empty (root of repo)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose your plan (Free tier available)

4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = Will be automatically set by Render

5. Click **"Create Web Service"**

6. Wait for deployment to complete and note the frontend URL (e.g., `https://ftask-frontend.onrender.com`)

## Step 4: Update Environment Variables

1. Go back to your **Backend Service** settings
2. Update the `FRONTEND_URL` environment variable with your frontend URL:
   - `FRONTEND_URL` = `https://ftask-frontend.onrender.com`
3. Save changes (this will trigger a redeploy)

## Step 5: Update Frontend API Endpoints

Your frontend currently uses the backend URL `https://taskshare-1d4b.onrender.com` in multiple files. 

**If you're deploying a NEW backend service**, you'll need to update these URLs in your frontend code:

Files that need updating:
- `src/app/home/home.ts` (line 19)
- `src/app/login/login.ts` (line 43)
- `src/app/all/all.ts` (line 23)
- `src/app/task/task.ts` (line 115)
- `src/app/edit-task/edit-task.ts` (line 87)
- And any other files making API calls

Replace `https://taskshare-1d4b.onrender.com` with your new backend URL (e.g., `https://ftask-backend.onrender.com`).

**Optionally**, you can create an environment configuration file for easier management:
1. Create `src/environments/environment.ts` and `src/environments/environment.prod.ts`
2. Define `apiUrl` in these files
3. Import and use the environment variable in your components

**If you're keeping the existing backend**, no changes are needed.

## Alternative: Using render.yaml (Blueprints)

If you prefer to use the `render.yaml` file:

1. In Render dashboard, click **"New +"** → **"Blueprint"**
2. Connect your Git repository
3. Render will automatically detect `render.yaml` and create both services
4. You'll still need to manually add environment variables in the Render dashboard:
   - Backend: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`
5. After both services are deployed, update `FRONTEND_URL` in the backend service

## Troubleshooting

### Frontend shows 404 errors
- Make sure `angular-http-server` is in `dependencies` (not `devDependencies`)
- Verify the start command uses `$PORT` environment variable

### Backend connection issues
- Check that `MONGODB_URI` is correctly set
- Verify MongoDB Atlas allows connections from Render IPs (0.0.0.0/0 for all)
- Check backend logs in Render dashboard

### CORS errors
- Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that CORS configuration in `TaskShare/index.js` allows your frontend origin

### Build failures
- Check build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

## Notes

- Free tier services on Render spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to a paid plan for always-on services
- Monitor your service logs in the Render dashboard for any issues

