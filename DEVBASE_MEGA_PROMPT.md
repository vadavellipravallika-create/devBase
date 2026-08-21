# DevBase Mega-Prompt

You are a **Full-Stack Software Architect and UI/UX Engineer** with expertise in building scalable SaaS platforms. Your objective is to build out the complete **"DevBase"** platform—a student progression ecosystem—using modern architectural patterns and highly polished conversion-optimized aesthetics. 

Your technology stack is:
- **Frontend:** React, Vite, Tailwind CSS v3, React Router DOM, Axios, Lucide React (for icons)
- **Backend:** Node.js, Express, Supabase PostgreSQL, @google/genai SDK (Gemini 2.5 Flash), Multer (file handling)
- **Design System:** Dark mode default, frosted glassmorphism (`backdrop-blur-md`, `bg-white/5`), subtle 3D block elements, soft ambient glows, smooth micro-animations.

You will execute this project in three distinct phases. Do not hallucinate external packages beyond the standard stack unless explicitly stated. Follow the requirements strictly:

---

### Phase 1: Glassmorphic SaaS Landing Page (Frontend)
Build the `Landing.jsx` view that serves as the entry point to the application. It must immediately establish a premium, high-tech aesthetic.
1. **Hero Section:**
   - Headline: *"Your 4-Year AI-Powered Engineering Career Companion"*
   - Subheadline highlighting the intersection of exam preparation, intelligent code debugging, and career readiness.
   - Actionable CTAs: primary "Get Started Free" (glow effect) and secondary "Explore Modules" (glass button).
   - A stunning visual element: an abstract floating 3D block or a mocked glass UI preview of the dashboard.
2. **Design Language & Atmosphere:**
   - Implement a dark UI theme (`bg-slate-900`).
   - Use `backdrop-blur-md` and semi-transparent backgrounds (e.g., `bg-white/5` or `bg-slate-800/50`) combined with soft borders (`border-white/10`) to achieve true glassmorphism.
3. **Sticky Glass Header:**
   - A fixed navigation bar seamlessly blending into the background as the user scrolls, housing the logo and login/register links.
4. **Feature Grid (Social Proof & Modules):**
   - An interactive 3-column grid showcasing the three core modules (**ExamScope**, **FixMyCode**, and **RoleReady**).
   - Include hover interactions (subtle scale, border color shift, or inner glow) to bring the cards to life.

---

### Phase 2: Core Modules Implementation (Backend)
Expand the Express application to fully power the three modules. Implement robust controllers, error handling, and routing.
1. **ExamScope API (`exam.routes.js` & `exam.controller.js`):**
   - Endpoints to fetch semester-based revision modules and related question banks.
   - A POST route to record a user's quiz score history and update their progression metrics.
2. **FixMyCode AI API (`ai.routes.js` & `ai.controller.js`):**
   - Secure the integration with `@google/genai` using the `gemini-2.5-flash` model.
   - Enforce a strict JSON structured output using the SDK's `responseSchema` (type: OBJECT) requiring: `bugsFound` (ARRAY of STRINGs), `correctedCode` (STRING), and `explanation` (STRING).
   - Ensure the original broken code, language, and the structured AI analysis are securely saved into the Supabase `debug_sessions` table.
3. **RoleReady API (`resume.routes.js` & `resume.controller.js`):**
   - Implement `multer` middleware to intercept `multipart/form-data` uploads (accepting only `.pdf` and `.docx`).
   - Write a controller function to handle the file, simulate/perform text extraction, and prompt Gemini to extract a technical skill tag cloud.
   - Prompt Gemini to generate a tailored 7-day micro-learning roadmap based on the extracted skills.
   - Save the results into the Supabase `user_resumes` and `learning_roadmaps` tables.

---

### Phase 3: Core Modules Integration (Frontend)
Build out the authenticated React dashboard views corresponding to the backend modules, maintaining the premium glassmorphic design language.
1. **ExamScope (`ExamScope.jsx`):**
   - Build a module browser fetching data from the backend.
   - Create a quiz-taking interface with a countdown timer, instant visual feedback for correct/incorrect answers, and a post-quiz summary screen tracking completion progress.
2. **FixMyCode (`FixMyCode.jsx`):**
   - Create a split-pane interface.
   - Left pane: A clean code editor `<textarea>` input, a language selector dropdown, and an actionable submit button with loading states.
   - Right pane: A structured, elegant display handling the AI response. Show `bugsFound` as a warning list, `explanation` as a clear paragraph, and render `correctedCode` within a stylized, syntax-highlighted (or monospaced) block.
3. **RoleReady (`RoleReady.jsx`):**
   - Design an interactive drag-and-drop dropzone for resume uploads utilizing subtle hover animations to guide user action.
   - Upon successful upload, gracefully animate the appearance of the extracted skills as a tag cloud.
   - Render the 7-day micro-learning roadmap as an interactive, vertical timeline or milestone checklist.

---

**Execution Instructions:**
Begin your response by mapping out the folder structure modifications required for these additions. Once confirmed, output the code block by block, starting with the Phase 1 Landing Page component. Ensure all CSS relies strictly on Tailwind utility classes and modern web best practices.
