# BanyanHire

A full-stack job portal where job recruiters and seekers can fullfill their needs. In addition to these two user roles, an admin role exists for user and post management. Seekers can sign up, log in, view the home page, their dashboard, explore all job listings with searching and filtering, save jobs to a bookmarks list, and apply to a job by uploading their resume and (optional) cover letter. Recruiters can interact with the home page, their dashboard, browse all jobs or only their own, post, edit, or delete jobs for their campus, and review applicants choosing to mark as reviewed or reject from the applicant manager. All recruiters must be approved by admins before they can start posting. Admins can only be created from the database for better security, so the registration page only provides an option between recruiter or seeker. Admins have an interactive statistics dashboard displaying all active job postings, seeker accounts, recruiter accounts, and recruiter accounts pending their approval. They can go in and manage these users depending on their user type, search and filter through lists of accounts or posts, and approve/reject recruiter accounts. Navigation is made easy with a dynamic sidebar, displaying differently based on the role of the user along with pagination and searching/filtering.


---
## Trailer
- https://youtu.be/yS84OWd0d8A
- https://youtu.be/wNEeQT8vhCs

---
## Live Link: 
- https://banyanhire.netlify.app/

## Team

| Members | Roles                                   |
|---------|-----------------------------------------|
| Ivy     | Full-Stack Developer / Project Manager  |
| Thien   | Full-Stack Developer / Backend          | 
| Angelo  | Full-Stack Developer / Backend          |
| Annika  | Full-Stack Developer / Frontend UI & UX |

---

## Proof of Collaboration
<img width="1412" height="907" alt="image" src="https://github.com/user-attachments/assets/5acfe7e4-0aee-4074-a9ae-195c3507de5b" />

Example contributions:

- Ivy — Seeker/Recruiter/Admin dashboard, Recruiter Approval, and Frontend & Backend Routing, Dynamic Sidebar
- Thien — Resume integration, Homepage video integration, Backend & Database additions
- Angelo — Authentication flows, Backend routes, MongoDB integration, Cloudinary, Automated Emails
- Annika — Frontend UI/UX design, Dashboard Page Design & More, Pagination, Recruiter/Company Flows & Profiles

---

## Project Overview

BanyanHire connects:

- Job Seekers → search/apply/save jobs
- Recruiters/Institutions → create/manage job postings
- Admins → manage users, companies, approvals, and job posting oversight

Inspired by:
- Handshake
- HigherEdJobs
- university hiring systems

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- React Icons

## Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Tokens/Authentication
- Cloudinary (PDF Resume Upload)
- Nodemailer (Automated Admin Emails)

## Authentication
- JWT Authentication
- Role-based authorization

---

# User Roles

## Job Seeker
- Browse jobs
- Search/filter jobs
- Save jobs
- Apply to jobs
- View saved jobs
- Track applications

## Recruiter
- Create job postings
- Edit/Delete job postings
- Manage company profile
- View applicants
- Manage recruiter dashboard

## Admin
- Manage users
- Manage companies
- View company users
- View company job postings
- Approvals workflow
- Platform oversight

---

# Features

## Authentication System
- Register/Login
- Role-based login
- Protected routes
- JWT authentication

## Job Management
- Create jobs
- Edit jobs
- Delete jobs
- View listings

## Job Search
- Browse jobs
- Search jobs
- Filter jobs
- Save jobs
- Apply jobs (Resume pdf upload to Cloudinary)

## Admin Dashboard
- Manage companies
- Manage users
- View job postings
- Automated Emails

---

# JWT Authentication Flow

- Token generation on login/registration (jwt.sign({id})) then returned to frontend alongside user data
- Token stored in frontend in localStorage (for persistence after frontend closed but backend is up) and as a React state (easily callable during session)
- When making authenticated API calls, tokens are sent in the Authorization header needed by all protected API endpoints
- Token verification works in protect where the token is extracted from the Authorization header then verified against the jwt secret- if valid, attaches the user data to the requested object else returns 401
- Any routes that need authentcation use that protect middleware

---

# Email Notifications
 
BanyanHire sends automated emails using Nodemailer for key platform events:
 <img width="740" height="326" alt="Screenshot 2026-05-01 081519" src="https://github.com/user-attachments/assets/79b656ec-ca9c-47f9-928b-77b4c50e3916" />
 <img width="610" height="297" alt="Screenshot 2026-05-01 081528" src="https://github.com/user-attachments/assets/373a89dd-d193-48cb-bbf2-30b72501b751" />
 <img width="703" height="259" alt="Screenshot 2026-05-01 081542" src="https://github.com/user-attachments/assets/1cd1b1e5-8069-4115-99f5-ea7a668e2666" />

1. **Recruiter Approved** — When admin approves a recruiter, confirmation email sent
2. **Recruiter Rejected** — When admin rejects a recruiter, notification email sent
3. **Application Reviewed** — When recruiter marks application as "reviewed", seeker notified
4. **Application Rejected** — When recruiter rejects application, seeker notified
 
---

# Database Models

## User
- name
- email
- password
- role
- companyName
- companyBio

## Job
- title
- institution
- location
- salaryMin
- salaryMax
- employmentType
- description
- qualifications
- recruiterId

## Application
- userId
- jobId
- resume
- status
- dateApplied

## Saved Jobs
- userId
- jobId

---

# API Endpoints
 
### Authentication (`/routes/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login, returns JWT | Public |
| PUT | `/update-company` | Update recruiter company info | Recruiter |
| PUT | `/approve-recruiter/:userId` | Approve recruiter account | Admin |
| PUT | `/reject-recruiter/:userId` | Reject recruiter account | Admin |
| GET | `/admin/recruiters` | Fetch all recruiters | Admin |
| GET | `/admin/seekers` | Fetch all seekers | Admin |
| PUT | `/admin/disable-user/:userId` | Disable any user account | Admin |
 
### Jobs (`/routes/jobs`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all active jobs | Public |
| GET | `/my` | Get recruiter's own jobs | Recruiter |
| GET | `/recruiter/:recruiterId` | Get jobs owned by recruiter | Admin |
| GET | `/:id` | Get single job by ID | Public |
| POST | `/` | Create new job posting | Recruiter |
| PUT | `/:id` | Update job posting | Recruiter (owner) |
| DELETE | `/:id` | Delete job posting | Recruiter (owner) / Admin |
 
### Applications (`/routes/applications`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/apply` | Submit job application | Seeker |
| GET | `/my-applications` | Get seeker's applications | Seeker |
| GET | `/job/:jobId` | Get applicants for a job | Recruiter (owner) |
| PUT | `/update-status/:applicationId` | Update application status | Recruiter / Admin |
| PUT | `/update-job-applications/:jobId` | Bulk update application status | Recruiter / Admin |
 
### Bookmarks (`/routes/bookmarks`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get saved jobs | Seeker |
| POST | `/:jobId` | Save a job | Seeker |
| DELETE | `/:jobId` | Unsave a job | Seeker |
 
---

# Pages & Routes

### Public
| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Landing page with hero video, Find Job / Hire Now buttons |
| `/auth` | AuthPage | Login/signup slider with role selection |
 
### Any Logged-in User
| Route | Page | Description |
|-------|------|-------------|
| `/profile` | UserProfile | View/edit personal profile |
| `/jobs` | JobListings | Browse all jobs with search, filter, pagination |
| `/jobs/:id` | JobDetails | View full job details, apply/bookmark (if seekers) |
 
### Seeker Only
| Route | Page | Description |
|-------|------|-------------|
| `/seeker` | SeekerDashboard | Dashvoard: saved jobs + application status |
| `/jobs/saved` | SavedJobs | All bookmarked jobs |
 
### Recruiter (Approved)
| Route | Page | Description |
|-------|------|-------------|
| `/recruiter` | RecruiterDashboard | Overview with job postings + applications |
| `/jobs/my` | MyJobPostings | Manage own postings (edit, delete, view applicants) |
| `/jobs/:id/applicants` | ApplicantsList | View applicants with resumes for a job |
| `/create-job` | CreateEditJob | Create new job posting form |
| `/edit-job/:id` | CreateEditJob | Edit existing job posting (pre-filled) |
| `/recruiterprofile` | RecruiterProfileAccordions | Personal + company profile management |
 
### Recruiter (Unapproved)
| Route | Page | Description |
|-------|------|-------------|
| `/recruiter-onboard` | RecruiterOnboard | Company profile setup |
| `/pending-approval` | PendingApproval | Waiting for admin approval |
 
### Admin Only
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | AdminDashboard | Platform stats (jobs, recruiters, seekers, pending) |
| `/manage-seekers` | ManageSeekers | Seeker account oversight |
| `/manage-recruiters` | ManageRecruiters | Recruiter account oversight |
| `/view/:id` | ViewUsersAndPostings | User and posting management |

---

# System Flow

<img width="1487" height="1730" alt="Banyanhire Sequence Diagram" src="https://github.com/user-attachments/assets/099c60a4-ba4f-4d29-b923-b84e684a046e" />

---

# UI Main Theme

Colors:
- Brown → #583927
- Cream → #FAF3E8
- Aqua → #91D8D4
- Green → #B5CD88
- Pink → #BB616D

Fonts:
- League Gothic
- Montserrat

---

# Challenges

- Git merge conflicts
- Role permissions
- Pagination logic
- Database integration
- UI consistency
- Resume integration

---

# Running Locally

## Environment Variables
```
// In Root Directory (same level as frontend & backend folders)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/banyanhire
JWT_SECRET=your-secret-key
PORT=3005

EMAIL_HOST=email-host
EMAIL_PORT=port-number
EMAIL_PASS=email-password
EMAIL_PREVIEW=bool

EMAIL_USER=email-user
EMAIL_FROM=email-from
CLIENT_URL=client-url
```
```
// In Frontend Folder
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Backend
```bash
cd backend
npm install
npm run dev
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

---

# Contributors

Built by Ivy, Thien, Angelo, and Annika

Spring 2026, Software Engineering, Project 02
