# Store Rating Web Application - Implementation Plan

## Overview
Build a complete full-stack Store Rating Web Application with React (Vite) frontend, Express.js backend, MySQL database, JWT authentication, and role-based access control (Admin, User, Store Owner).

## Tech Stack
- **Frontend**: React (Vite), Material UI, React Router DOM, Axios, React Hook Form, React Toastify
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: MySQL
- **Auth**: JWT + bcrypt

## Proposed Changes

### Database Layer (Prisma)
#### [NEW] server/prisma/schema.prisma
- User model (id, name, email, password, address, role enum)
- Store model (id, name, email, address, ownerId FK)
- Rating model (id, rating 1-5, userId FK, storeId FK, unique constraint on userId+storeId)

---

### Backend - Server Setup & Config
#### [NEW] server/package.json
#### [NEW] server/.env.example
#### [NEW] server/index.js - Express server entry point
#### [NEW] server/config/db.js - Prisma client singleton
#### [NEW] server/config/jwt.js - JWT config

### Backend - Middleware
#### [NEW] server/middlewares/auth.js - JWT verification
#### [NEW] server/middlewares/role.js - Role-based authorization
#### [NEW] server/middlewares/errorHandler.js - Global error handler
#### [NEW] server/middlewares/validate.js - Request validation middleware

### Backend - Validators
#### [NEW] server/validators/auth.validator.js
#### [NEW] server/validators/user.validator.js
#### [NEW] server/validators/store.validator.js
#### [NEW] server/validators/rating.validator.js

### Backend - Controllers & Routes
#### [NEW] server/controllers/auth.controller.js
#### [NEW] server/controllers/admin.controller.js
#### [NEW] server/controllers/store.controller.js
#### [NEW] server/controllers/rating.controller.js
#### [NEW] server/controllers/owner.controller.js
#### [NEW] server/routes/auth.routes.js
#### [NEW] server/routes/admin.routes.js
#### [NEW] server/routes/store.routes.js
#### [NEW] server/routes/rating.routes.js
#### [NEW] server/routes/owner.routes.js

### Backend - Services
#### [NEW] server/services/auth.service.js
#### [NEW] server/services/user.service.js
#### [NEW] server/services/store.service.js
#### [NEW] server/services/rating.service.js

### Backend - Utils
#### [NEW] server/utils/response.js - Standardized API response
#### [NEW] server/utils/seed.js - Database seeder

---

### Frontend - Setup
#### [NEW] client/ - Vite React app
#### [NEW] client/src/services/api.js - Axios instance
#### [NEW] client/src/context/AuthContext.jsx
#### [NEW] client/src/context/ThemeContext.jsx

### Frontend - Pages
#### [NEW] Login, Register, Dashboard (Admin/User/Owner), Store Listing, Profile, 404, Unauthorized

### Frontend - Components
#### [NEW] Navbar, Sidebar, StarRating, DataTable, DashboardCard, ConfirmDialog, LoadingSpinner, EmptyState

### Frontend - Routing
#### [NEW] ProtectedRoute, RoleRoute, AppRoutes

---

## Verification Plan
### Manual Verification
- Run `npm install` and `npm run dev` for both client and server
- Test all CRUD operations and role-based access
