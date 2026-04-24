# BanyanHire

A Platform where recruiters and Job Seekers can fullfill their needs. Recruiters can post jobs for their campus and Job Seekers are students from those universities and can apply to those jobs.


---

## Team

| Members | Roles                                   |
|---------|-----------------------------------------|
| Ivy     | Full-Stack Developer / Project Manager  |
| Thien   | Full-Stack Developer / Backend          | 
| Angelo  | Full-Stack Developer / Backend          |
| Annika  | Full-Stack Developer / Frontend UI & UX |

---

## Proof of Collaboration

Example contributions:

- Ivy — Seeker dashboard, approval workflows, notifications
- Thien — Resume integration, Homepage video integration, backend
- Angelo — Authentication flows, backend routes, MongoDB integration
- Annika — Frontend UI/UX design, dashboards and several page designs, pagination, recruiter/company flows

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
- Node.js
- Express.js
- MongoDB
- Mongoose

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
- Apply jobs

## Admin Dashboard
- Manage companies
- Manage users
- View job postings
- 


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

# System Flow

Frontend (React)
↓
Express API
↓
MongoDB Database

---

# Key Pages

- Homepage
- Authentication
- Job Listings
- Job Details
- Seeker Dashboard
- Recruiter Dashboard
- Create Job
- Company Profile
- Admin Dashboard
- Manage Companies
- View Users & Postings

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

# Future Improvements

- Email notifications
- Recruiter analytics
- Deployment

---

# Running Locally

## Backend
```bash
cd backend
npm run dev
```

## Frontend
```bash
cd frontend
npm run dev
```

---

# Contributors

Built by Ivy, Thien, Angelo, and Annika

Spring 2026, Software Engineering, Project 02
