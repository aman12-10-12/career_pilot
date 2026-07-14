# Resume Doctor

## Overview
Resume Doctor is a full-stack career support application built to help job seekers analyze resumes, compare resumes to job descriptions, generate interview preparation reports, and create tailored PDFs from resume content. The project is divided into two main parts:

- `Backend/`: Node.js + Express API server with authentication, file upload, MongoDB storage, and AI-powered report generation.
- `Frontend/`: React + Vite client application with authentication, file upload forms, report viewing, and interactive user flow.

> This README documents the architecture, backend flow, frontend flow, and how both systems connect.

---

## Table of Contents

1. [Architecture Summary](#architecture-summary)
2. [Backend Flow](#backend-flow)
   - [Directory Structure](#backend-directory-structure)
   - [Key Backend Components](#key-backend-components)
   - [Backend Flow Diagram](#backend-flow-diagram)
3. [Frontend Flow](#frontend-flow)
   - [Directory Structure](#frontend-directory-structure)
   - [Key Frontend Components](#key-frontend-components)
   - [Frontend Flow Diagram](#frontend-flow-diagram)
4. [Combined Flow](#combined-flow)
5. [Environment & Setup](#environment--setup)
6. [Important Notes](#important-notes)

---

## Architecture Summary

Resume Doctor is built as a client-server application:

- **Frontend** is a React application served by Vite. It provides login/register screens, resume upload, job description input, report generation, and viewing saved interview reports.
- **Backend** is an Express server that connects to MongoDB. It handles user authentication, JWT cookie management, resume upload parsing, secure AI report generation, PDF generation, and report storage.
- The frontend uses authenticated API requests with cookies, and the backend protects sensitive routes using middleware.

---

## Backend Flow

### Backend Directory Structure

```
Backend/
  .env
  package.json
  server.js
  src/
    app.js
    config/
      database.js
    controllers/
      auth.controller.js
      interview.controller.js
    middlewares/
      auth.middleware.js
      file.middleware.js
    models/
      blacklist.model.js
      interviewReport.model.js
      user.model.js
    routes/
      auth.route.js
      interview.routes.js
    services/
      ai.service.js
```

### Key Backend Components

#### `server.js`
- Loads environment variables.
- Connects to MongoDB using `src/config/database.js`.
- Starts the Express server on `process.env.BACKEND_PORT`.

#### `src/app.js`
- Configures middleware for JSON parsing, cookies, and CORS.
- Mounts routes for authentication and interview prep.
- Enables cross-origin authentication with credentials from the React frontend.

#### Authentication
- `src/routes/auth.route.js`: Defines auth endpoints.
- `src/controllers/auth.controller.js`: Implements registration, login, logout, and `get-me` endpoints.
- `src/models/user.model.js`: Mongoose schema for users.
- `src/middlewares/auth.middleware.js`: Verifies JWT tokens from cookies and rejects blacklisted tokens.
- `src/models/blacklist.model.js`: Stores invalidated tokens after logout.

#### Interview Report Flow
- `src/routes/interview.routes.js`: Defines protected interview endpoints.
- `src/controllers/interview.controller.js`: Handles resume upload parsing, AI report generation, report retrieval, and resume PDF generation.
- `src/models/interviewReport.model.js`: Stores generated report data and metadata in MongoDB.
- `src/services/ai.service.js`: Uses Google GenAI to produce JSON interview reports and HTML resumes, then converts HTML to PDF with Puppeteer.

#### File Upload
- `src/middlewares/file.middleware.js`: Uses `multer.memoryStorage()` to accept resume uploads in memory.
- Upload limit is configured at 3 MB.

### Backend Flow Diagram

1. Client authenticates with `/api/auth/login` or `/api/auth/register`.
2. Backend creates and signs a JWT token.
3. Backend returns the JWT token in an HTTP-only cookie.
4. Client sends authenticated requests with credentials.
5. Protected routes use `auth.middleware.authUser` to validate the JWT and check token blacklist.
6. Resume upload requests go through `multer` and are parsed using `pdf-parse`.
7. Parsed resume text, job description, and self-description are passed to `ai.service`.
8. `ai.service` calls Google GenAI to generate structured JSON report data.
9. Report is saved into MongoDB using `interviewReport.model.js`.
10. On request, backend returns saved reports or generates PDF resumes using Puppeteer.

---

## Frontend Flow

### Frontend Directory Structure

```
Frontend/
  package.json
  vite.config.js
  index.html
  src/
    App.jsx
    app.routes.jsx
    main.jsx
    style.scss
    assets/
    demo/
    features/
      auth/
        auth.context.jsx
        hooks/useAuth.js
        pages/
          Home.jsx
          Login.jsx
          Register.jsx
        services/auth.api.js
      interview/
        interview.context.jsx
        hooks/useInterview.js
        pages/
          Interview.jsx
          InterviewSkeleton.jsx
          Upload.jsx
        services/interview.api.js
      legal/
    layout/
      Footer.jsx
      MainLayout.jsx
    styles/
      button.scss
```

### Key Frontend Components

#### `src/App.jsx`
- Wraps the application in `AuthProvider` and `InterviewProvider`.
- Sets video background and overlay.
- Renders routes via `RouterProvider`.

#### `src/app.routes.jsx`
- Defines pages and protected routes.
- `/upload` and `/interview/:interviewId` require authentication.
- Other landing, demo, and legal pages are public.

#### Auth Context and Hooks
- `src/features/auth/auth.context.jsx`: Provides user, loading, and auth state.
- `src/features/auth/hooks/useAuth.js`: Handles login, registration, logout, and current user retrieval.
- `src/features/auth/services/auth.api.js`: Sends auth requests to the backend using Axios.

#### Interview Services
- `src/features/interview/services/interview.api.js`: Sends interview analysis requests and fetches reports.
- Generates `FormData` with `resume`, `jobDescription`, and `selfDescription`.
- Requests are sent to protected backend endpoints with credentials.

#### Interview Context
- `src/features/interview/interview.context.jsx`: Stores current report and list of saved reports.

#### Upload & Report Pages
- `Upload.jsx`: Provides resume upload UI and form fields for job description and self-description.
- `Interview.jsx`: Displays generated interview report details.
- `InterviewSkeleton.jsx`: Likely shown while data is loading or when a report is not ready.

### Frontend Flow Diagram

1. User visits the frontend at `http://localhost:5173`.
2. User can register or login via auth forms.
3. After authentication, the frontend obtains user details using `/api/auth/get-me`.
4. Authenticated user navigates to `/upload`.
5. User selects a resume file and enters job description and self-description.
6. Frontend sends the file and text to `/api/interview-prep/ai-resume-checker`.
7. The backend processes the request, generates the AI report, and returns saved interview report data.
8. Frontend stores the returned report in context and navigates to the report view.
9. User can view saved interview reports and request resume PDF generation.

---

## Combined Flow

### End-to-End Sequence

1. **User Authentication**
   - Frontend calls backend auth endpoints.
   - Backend issues JWT in an HTTP-only cookie.
   - Frontend uses this cookie for all further authenticated API requests.

2. **Report Generation**
   - On `/upload`, frontend submits resume file + text.
   - Backend parses the PDF into plain text.
   - Backend sends a prompt to Google GenAI via `ai.service`.
   - AI returns a structured JSON report.
   - Backend validates and saves this report to MongoDB.
   - Frontend receives and renders the report.

3. **Report Retrieval**
   - Frontend request `/api/interview-prep/` to list saved reports.
   - Backend returns report summaries for the authenticated user.
   - Frontend request `/api/interview-prep/report/:interviewId` for a full report.

4. **Resume PDF Generation**
   - Frontend calls `/api/interview-prep/resume/pdf/:interviewReportId`.
   - Backend reuses saved report data and AI-generated resume HTML.
   - Puppeteer renders HTML to PDF and returns the file.

### Integration Points

- `Backend/src/app.js` sets the CORS and credentials policy used by the frontend.
- `Frontend/src/features/interview/services/interview.api.js` uses `withCredentials: true`.
- Protected frontend routes rely on the backend cookie-based auth mechanism.
- Both systems communicate through JSON-based REST APIs.

---

## Environment & Setup

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` with required values:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `HASH_ITERATIONS`
   - `BACKEND_PORT`
   - `GOOGLE_GENAI_API_KEY`

4. Run the backend:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend app:
   ```bash
   npm run dev
   ```

### Base URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## Important Notes

- The backend uses cookie-based JWT auth and stores token state in `Backend/src/models/blacklist.model.js`.
- Resume uploads are accepted as multipart/form-data with the field name `resume`.
- AI generation is handled by Google GenAI, and output is validated with Zod schemas.
- The frontend is designed for React 19 and Vite.
- This README does not modify any existing code.

---

## Image References

The repository includes image assets in the frontend folder that may be useful for documentation or demo pages:

- `Frontend/public/logo.png`
- `Frontend/src/demo/screenshots/recent-interview-plans.png`
- `Frontend/src/demo/screenshots/dashboard-and-upload.png`
- `Frontend/src/demo/screenshots/interview-prep-questions.png`
- `Frontend/assets/creative-image.svg`
- `Frontend/assets/resume.png`
- `Frontend/assets/profile.jpeg`
- `Frontend/assets/resume2.png`

> If you want to use images in a published README, reference these by relative path from the root README file or copy them to a shared documentation folder.
