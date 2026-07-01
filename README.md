# Full Stack Store Rating Web Application

A complete, production-ready, Full Stack Store Rating Web Application built with React.js (Vite), Material UI, Node.js, Express.js, MySQL, and Prisma ORM.

## Project Structure

The project is structured into two main directories:
- `client/`: Contains the React.js (Vite) frontend application.
- `server/`: Contains the Node.js / Express.js REST API with Prisma ORM.

```
/
├── client/                     # React Frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── assets/
│       ├── components/         # Reusable MUI Components
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── StarRating.jsx
│       │   ├── DashboardCard.jsx
│       │   ├── ConfirmDialog.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── EmptyState.jsx
│       │   ├── SearchBar.jsx
│       │   └── RatingDialog.jsx
│       ├── context/            # Auth and Theme (Dark/Light Mode) Contexts
│       ├── hooks/              # Custom React Hooks (useDebounce, etc.)
│       ├── layouts/            # Dashboard and Auth Layout templates
│       ├── pages/              # Views (Admin, Owner, User dashboards, Auth pages)
│       ├── routes/             # Protected routes and Role Authorization checks
│       ├── services/           # Axios instance configuration
│       └── utils/              # Client-side form validators
└── server/                     # Node.js Express Backend API
    ├── index.js
    ├── package.json
    ├── .env
    ├── config/                 # DB and JWT Configuration
    ├── controllers/            # Request handlers
    ├── middlewares/            # Auth guards, role checks, and error handlers
    ├── models/
    ├── prisma/                 # Prisma Schema and DB Migration script
    ├── routes/                 # Express Routers
    ├── services/               # Database operations and business logic
    ├── utils/                  # API response formatting & seed script
    └── validators/             # Express Request validator arrays
```

## Features

### Role-Based Access Control & Dashboards
The application supports three distinct user roles with different views and permissions:
1. **System Administrator**:
   - Access to Admin Dashboard showing total users, stores, and ratings metrics.
   - User Management: Create and view Admins, Store Owners, and Users. Displays average store ratings for owners.
   - Store Management: Create new stores and assign them to owners. Displays store details alongside computed average ratings.
   - Server-side searching, sorting, and pagination for user and store listings.
2. **Store Owner**:
   - Access to Store Owner Dashboard.
   - Displays computed overall Average Rating for their owned store.
   - Displays a listing of all users who submitted ratings to their store (Name, Email, and Rating Value).
3. **Normal User**:
   - Registration with password requirements (min 8 chars, uppercase, special character).
   - Store Listing page showing Store Name, Address, Computed Average Rating, and their own rating (if submitted).
   - Ability to submit a rating (1 to 5 stars) or update their previous rating.
   - Server-side searching and pagination.

### Key Technical Aspects
- **Authentication**: JWT token-based auth stored securely on the client.
- **Security**: Password hashing using bcryptjs. Middleware protection for API routes and query validation.
- **Form Validation**: Strict validation rules enforced on both frontend (React Hook Form) and backend (Express Validator):
  - **Name**: 20-60 characters.
  - **Password**: 8-16 characters, containing at least one uppercase letter and one special character.
  - **Address**: Max 400 characters.
  - **Email**: Proper email validation.
  - **Store Name**: 20-60 characters.
- **UI Design**: Modern Material UI implementation with light/dark theme toggle, clean responsive sidebar navigation, glassmorphism authentication headers, dynamic cards, smooth hover effects, empty states, and custom loadings.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en) (v18 or higher recommended)
- [MySQL Server](https://www.mysql.com/) running locally or hosted

### Backend Setup (`server/`)
1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Copy `.env.example` to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```
   *Modify `DATABASE_URL` in `.env` to point to your running MySQL instance (e.g., `mysql://root:password@localhost:3306/store_rating_db`).*
4. Run Prisma migrations to generate the database schema tables:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Seed the database with sample admin, owners, stores, and ratings:
   ```bash
   npm run seed
   ```
6. Start the backend development server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

### Frontend Setup (`client/`)
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```

---

## API Endpoints List

Detailed descriptions and payloads are in [API Documentation](file:///c:/Users/Samarth/Desktop/task/server/api_documentation.md).

### Auth API
- `POST /api/auth/register` - User registration (USER role)
- `POST /api/auth/login` - User login (returns JWT token and user details)
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/change-password` - User password update

### Admin API
- `GET /api/admin/dashboard` - Retrieve count metrics for dashboard
- `POST /api/admin/users` - Create users of any role
- `GET /api/admin/users` - Paginated user listing with search and sort
- `GET /api/admin/users/:id` - Fetch details for a specific user
- `POST /api/admin/stores` - Create stores and assign owners
- `GET /api/admin/stores` - Paginated store listing with search, sort, and average ratings

### User API
- `GET /api/stores` - Store listing for normal users with average ratings and user-specific ratings
- `POST /api/ratings` - Submit a new store rating
- `PUT /api/ratings/:id` - Update an existing rating

### Store Owner API
- `GET /api/owner/dashboard` - Fetch owner's store metrics and user rating submissions

## Postman Collection
Import the [Postman Collection](file:///c:/Users/Samarth/Desktop/task/server/store_rating_postman_collection.json) to quickly test and interact with the API endpoints.
