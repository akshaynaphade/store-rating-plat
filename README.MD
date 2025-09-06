# Store Rating Web Application 🚀

Hello! This is my submission for the **Roxiler Systems Full-Stack Intern** coding challenge. I built this feature-rich web application from the ground up to create a platform where users can find and rate local stores.

It's a complete full-stack solution, featuring a secure backend API built with **Express.js** and a dynamic, interactive frontend powered by **React**.

---

## Key Features ✨

This application provides a unique, secure experience for three different types of users:

### ✅ Normal Users (The Public Experience)
- **Secure Authentication:** Seamless user registration and login with JWT.
- **Store Directory:** View and search a complete list of all registered stores.
- **Detailed Ratings:** See each store's overall average rating and their own previously submitted rating.
- **Interactive Rating:** Submit and update 1-5 star ratings for any store with instant UI updates.
- **Account Management:** Easily update their own password.

### ✅ System Administrators (The Control Panel)
- **Role-Protected Dashboard:** Access a secure dashboard with a complete overview of the platform.
- **Platform Statistics:** View real-time counts of total users, stores, and ratings submitted.
- **Full User Management:** View a filterable list of all users and create new users with specific roles (Admin, Store Owner, etc.).
- **Full Store Management:** View a complete list of all stores and add new ones to the platform.

### ✅ Store Owners (The Business View)
- **Dedicated Dashboard:** Log in to a secure dashboard built just for them.
- **Performance Metrics:** Instantly see their own store's current average rating.
- **Customer Insights:** View a detailed list of all users who have rated their store and the specific rating each person gave.

---

## Project Structure 📂

```
/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT validation gatekeeper
│   ├── routes/
│   │   ├── dashboardRoutes.js     # Routes for admin stats
│   │   ├── storeRoutes.js         # All store-related API endpoints
│   │   └── userRoutes.js          # User registration, login, etc.
│   ├── .gitignore
│   ├── db.js                      # PostgreSQL connection pool
│   ├── index.js                   # Main Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html             # Single HTML page shell
    ├── src/
    │   ├── components/            # Reusable React components
    │   │   ├── AdminDashboard.js
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── ProtectedRoute.js
    │   │   ├── Signup.js
    │   │   ├── StoreOwnerDashboard.js
    │   │   └── UpdatePassword.js
    │   ├── App.css
    │   ├── App.js                 # Main application component with routing
    │   ├── api.js                 # Centralized Axios API calls
    │   ├── index.js               # Frontend entry point
    │   └── ...
    └── package.json
```

---

## Tech Stack & Core Concepts ⚡

<div>
  <span style="background-color:#61dafb; color:#000; padding:3px 8px; border-radius:5px;">React.js</span>
  <span style="background-color:#ff6f61; color:#fff; padding:3px 8px; border-radius:5px;">React Router</span>
  <span style="background-color:#008080; color:#fff; padding:3px 8px; border-radius:5px;">Axios</span>
  <span style="background-color:#339933; color:#fff; padding:3px 8px; border-radius:5px;">Node.js</span>
  <span style="background-color:#000000; color:#fff; padding:3px 8px; border-radius:5px;">Express.js</span>
  <span style="background-color:#336791; color:#fff; padding:3px 8px; border-radius:5px;">PostgreSQL</span>
  <span style="background-color:#f7df1e; color:#000; padding:3px 8px; border-radius:5px;">JWT</span>
  <span style="background-color:#8b0000; color:#fff; padding:3px 8px; border-radius:5px;">bcrypt.js</span>
</div>

**Core Concepts:** Full-Stack Architecture, Secure Authentication, Role-Based Access Control, RESTful API Design, Advanced SQL (JOINs, aggregate functions)

---

## Setup and Installation 🛠️

### 1. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file and add your PostgreSQL credentials and JWT secret.  
- Run the database schema SQL to create the tables.  
- Start the server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
```
- Ensure the proxy is set in `package.json`:
```json
"proxy": "http://localhost:5000"
```
- Start the client:
```bash
npm start
```
Client runs on `http://localhost:3000`.

---

## Try It Yourself! (Sample Logins) 🔑

### System Administrator:
- **Email:** `akshay@gmail.com`  
- **Password:** `Pass@123`

### Store Owner:
- **Email:** `dummy@gmail.com`  
- **Password:** `Pass@1234`  
> *(This user must be manually linked to a store in the database to see their dashboard correctly.)*

### Normal User:
- **Email:** `Hello@gmail.com`  
- **Password:** `Pass@1234`

---

Thanks for checking out my project! 🙏
