# DevBase Production Deployment Guide

This guide provides step-by-step instructions for deploying the DevBase platform to production. The architecture is split into three main components:
- **Database**: Supabase (PostgreSQL)
- **Backend API**: Render (Node.js/Express)
- **Frontend SPA**: Vercel (React/Vite)

---

## 1. Supabase (Database) Setup

Before deploying the application code, ensure your production database is ready and you have the necessary connection credentials.

1. **Create a Supabase Project:**
   - Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
   - Click **New Project** and configure your region and database password.
2. **Apply Migrations:**
   - Go to the **SQL Editor** in your Supabase dashboard.
   - Copy the contents of `supabase/migrations/20260806010158_init_devbase.sql` from your repository.
   - Paste it into the editor and click **Run** to generate your tables and indexes.
3. **Gather Connection Strings:**
   - Go to **Project Settings -> API**.
   - Copy your **Project URL** (this is your `SUPABASE_URL`).
   - Copy your **`service_role` secret key** (this is your `SUPABASE_SERVICE_ROLE_KEY`). *Note: Do not use the anon key for the backend since we are bypassing RLS for custom authentication.*

---

## 2. Render (Backend) Deployment

We will deploy the Node.js Express backend using Render's Web Service.

1. **Connect Repository:**
   - Log in to [Render](https://render.com/).
   - Click **New +** and select **Web Service**.
   - Connect your GitHub account and select the `quantifybeats/DevBase` repository.
2. **Configure Web Service:**
   - **Name:** `devbase-api` (or similar)
   - **Language:** `Node`
   - **Root Directory:** `server` (Important: This tells Render that the backend code lives inside the `server/` folder).
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
3. **Set Environment Variables:**
   Scroll down to the **Environment Variables** section and add the following keys:
   - `PORT`: `10000` (Render dynamically assigns ports, but explicitly setting it helps)
   - `SUPABASE_URL`: *(Paste your Supabase Project URL)*
   - `SUPABASE_SERVICE_ROLE_KEY`: *(Paste your Supabase service_role key)*
   - `JWT_SECRET`: *(Paste a strong, randomly generated hex string, e.g., the one from your local `.env`)*
   - `GEMINI_API_KEY`: *(Paste your Google Gemini API Key)*
   - `CLIENT_URL`: *(Leave this blank for now; we will update it after deploying Vercel to prevent CORS errors)*
4. **Deploy:**
   - Click **Create Web Service**. Render will now build and deploy your API. 
   - Once live, copy the assigned `.onrender.com` URL (e.g., `https://devbase-api.onrender.com`).

---

## 3. Vercel (Frontend) Deployment

We will deploy the React/Vite SPA using Vercel.

1. **Import Repository:**
   - Log in to [Vercel](https://vercel.com/).
   - Click **Add New... -> Project**.
   - Import the `quantifybeats/DevBase` GitHub repository.
2. **Configure Project Settings:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client` (Important: Click Edit and select the `client/` folder).
   - The Build and Output Settings will auto-populate (`npm run build` and `dist`). Leave them as is.
3. **Set Environment Variables:**
   - Open the **Environment Variables** dropdown.
   - Key: `VITE_API_BASE_URL`
   - Value: `https://devbase-api.onrender.com/api` *(Use the Render URL you copied earlier. Make sure to append `/api` if your backend routes require it).*
4. **Deploy:**
   - Click **Deploy**. Vercel will build the React app and assign a live URL (e.g., `https://devbase.vercel.app`).
   - Copy this URL.

---

## 4. Finalizing CORS & Environment Verification

To ensure the backend accepts requests from your new Vercel frontend and doesn't throw Cross-Origin Resource Sharing (CORS) errors, you must update the backend configuration.

1. **Update Render CORS Configuration:**
   - Go back to your `devbase-api` Web Service on **Render**.
   - Navigate to the **Environment** tab.
   - Find (or add) the `CLIENT_URL` environment variable.
   - Set the value to your live Vercel URL (e.g., `https://devbase.vercel.app`). *Note: Do not include a trailing slash.*
   - Save changes. Render will automatically trigger a new deployment to apply the updated environment variables.
2. **End-to-End Verification:**
   - Once Render finishes restarting, navigate to your live Vercel URL in your browser.
   - Open the browser's Developer Tools (Network tab).
   - Attempt to register a new user or log in. 
   - If the request succeeds and you are redirected to the Dashboard, your platform is fully connected and live!
