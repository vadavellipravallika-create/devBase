<div align="center">
  
  # ⚡️ DevBase
  
  **Your 4-Year AI-Powered Engineering Career Companion**

  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Gemini API](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)

  *A sleek, glassmorphic SaaS platform engineered to track, enhance, and accelerate student progression through academic and technical milestones.*

</div>

<br />

## 🌟 Overview

**DevBase** is a comprehensive, full-stack student progression ecosystem. Built with a stunning dark-mode glassmorphic aesthetic, the platform leverages advanced AI capabilities to provide students with tailored learning roadmaps, instant code debugging, and curated examination prep.

## 🚀 Core Modules

* 📚 **ExamScope**: Browse curated revision modules and take timed practice question banks. Fallback mocked data ensures immediate functionality, while the backend seamlessly connects to PostgreSQL.
* 🐛 **FixMyCode**: An integrated code editor interface where students can paste buggy snippets. Integrated with the **Gemini 2.5 Flash API**, it delivers structured AI bug analysis, detailed explanations, and refactored code.
* 📄 **RoleReady**: A robust resume upload system. Users drag-and-drop their PDFs/DOCs, which are parsed to extract key technical skills. The system then automatically generates a highly personalized 7-day micro-learning roadmap to level up their career.

## 💻 Tech Stack

### Frontend (Client)
- **Framework:** React + Vite (Single Page Application)
- **Styling:** Tailwind CSS v3 (Dark Mode, Glassmorphism, Custom Animations)
- **Routing:** React Router v6
- **State/HTTP:** React Context API, Axios (with JWT interceptors)
- **Icons:** Lucide React

### Backend (Server)
- **Runtime & Framework:** Node.js, Express.js
- **Database & Auth:** Supabase PostgreSQL (direct postgres connection & JWT verification)
- **AI Integration:** `@google/genai` (Gemini 2.5 Flash SDK)
- **File Uploads:** Multer (multipart/form-data)
- **Security:** bcrypt, jsonwebtoken, Zod (schema validation)

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- A Supabase Project
- A Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/your-username/DevBase.git
cd DevBase
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the root of the project with your credentials (see `SUPABASE_SETUP.md` for database schema):
```env
PORT=5001
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres:password@db.url:5432/postgres"
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="your-secure-jwt-secret"
CLIENT_URL="http://localhost:5173"
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
# In a new terminal tab
cd client
npm install
```
Create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```
Start the frontend development server:
```bash
npm run dev
```

Your app will be running at `http://localhost:5173`! 🎉

---

## ☁️ Deployment

DevBase is designed for a split monorepo deployment setup:
- **Frontend:** Vercel (Root Directory: `client/`, Framework: Vite)
- **Backend:** Render (Web Service, Root Directory: `server/`, Build Command: `npm install`, Start Command: `node src/server.js`)

Ensure all Environment Variables from your local `.env` are mirrored in the respective Vercel/Render dashboard settings.

## 🎨 Design System
The application utilizes a strict, highly polished design system out of the box:
- `backdrop-blur-xl` and `bg-slate-900/80` for frosted glass panels.
- Custom gradient glows and subtle 3D hover effects.
- Inter/Outfit typography for a modern, crisp SaaS feel.

## 📄 License
This project is licensed under the MIT License.
