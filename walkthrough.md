# Store Rating Web Application - Walkthrough

A complete, production-ready Full Stack Store Rating application has been built from scratch.

## Project Deliverables Accomplished

### 1. Database & Schema Design
- Normalized MySQL relational database design using **Prisma ORM**.
- **User** table with roles: `ADMIN`, `USER`, `OWNER`.
- **Store** table linked to one `OWNER` user.
- **Rating** table with value constraints (1-5 stars) and a unique composite key on `(userId, storeId)` to prevent duplicate ratings.
- Created `migration.sql` script under `server/prisma/` containing raw SQL commands corresponding to the schema structure.
- Developed a complete seeder script (`server/utils/seed.js`) that automatically initializes default admin, store owners, stores, and ratings with hashed passwords using bcrypt.

### 2. Backend API
- Setup an MVC-inspired folder structure (`controllers/`, `routes/`, `middlewares/`, `services/`, `validators/`, `config/`).
- Implemented robust input validation utilizing `express-validator` enforcing name constraints (min 20 / max 60 characters), address maximum length (400 characters), email regex matching, and password complexity (8-16 chars, 1 uppercase, 1 special character).
- Developed JWT-based Authentication guard middlewares and Role Authorization middlewares.
- Designed endpoints with server-side search, sort, and pagination:
  - `POST /api/auth/register` / `login` / `logout` / `change-password`
  - `GET /api/admin/dashboard` (metrics computation)
  - `POST /api/admin/users` & `GET /api/admin/users` (includes store average rating for owner roles)
  - `POST /api/admin/stores` & `GET /api/admin/stores` (computes overall average store ratings)
  - `GET /api/stores` (normal user page list including user's specific rating state)
  - `POST /api/ratings` (rating submission) / `PUT /api/ratings/:id` (rating update)
  - `GET /api/owner/dashboard` (aggregate rating stats and rater list)
- Configured Express CORS setup to securely interact with the frontend port.

### 3. Frontend React App
- Initialized a **Vite React** application.
- Structured directories: `components/`, `context/`, `hooks/`, `layouts/`, `pages/`, `routes/`, `services/`, `utils/`.
- Implemented styling utilizing **Material UI** consistently across all screens.
- Programmed a custom MUI ThemeProvider supportting a full **Dark Mode** toggle.
- Installed **React Hook Form** for responsive forms with frontend-based validation messages.
- Embedded **React Toastify** alerts for API state indicators (success/error).
- Embedded **Recharts** chart visualizations in the Admin Dashboard showing statistics.
- Programmed role-based page redirects, protected layout route guards, responsive sidebars, custom loadings, empty states, and delete confirmation dialogs.

## Setup Instructions

Please consult the main [README.md](file:///c:/Users/Samarth/Desktop/task/README.md) file in the root workspace for step-by-step setup guides to initialize both server and client services.
