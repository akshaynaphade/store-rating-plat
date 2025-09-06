# Store Rating Web Application 

Hello! This is my submission for the Roxiler Systems Full-Stack Intern coding challenge. I built this feature-rich web application from the ground up to create a platform where users can find and rate local stores.

It's a complete full-stack solution, featuring a secure backend API built with Express.js and a dynamic, interactive frontend powered by React.

///

## What It Does: A Tour of the Features 

This application provides a unique experience for three different types of users:

#### For Normal Users (The Public Experience)
-   **Sign Up & Log In:** A seamless and secure registration and login process.
-   **Discover Stores:** Browse and search a complete directory of all registered stores.
-   **Get the Full Picture:** See a store's overall average rating and check your own previously submitted rating.
-   **Share Your Opinion:** Submit and update a 1-5 star rating for any store, with the page updating instantly.
-   **Stay Secure:** Easily update your own password from a dedicated page.

####  For System Administrators (The Control Panel)
-   **Total Control:** Access a secure, role-protected dashboard with a complete overview of the platform.
-   **Platform at a Glance:** View real-time statistics for total users, stores, and ratings submitted.
-   **Manage Everything:** View, filter, and manage complete lists of all users and stores on the platform.
-   **Create Content:** Add new stores and even create new user accounts (including other Admins or Store Owners) directly from the dashboard.

#### For Store Owners (The Business View)
-   **A Dedicated Hub:** Log in to a secure dashboard built just for store owners.
-   **Track Performance:** Instantly see their store's current average rating.
-   **Know Your Customers:** View a detailed list of all the users who have rated their store and the specific rating each person gave.

---

## Core Concepts I Implemented

Building this project was a great opportunity to work with several key web development concepts:

-   **Full-Stack Architecture:** Designing and connecting a React single-page application to a Node.js/Express.js backend.
-   **Secure Authentication:** Implementing a modern, token-based authentication system from scratch using JSON Web Tokens (JWT) and `bcrypt` for password hashing.
-   **Role-Based Access Control:** Creating a robust authorization system that delivers a unique, secure experience for three different user roles.
-   **RESTful API Design:** Building a logical and secure API with endpoints for creating, reading, and updating data.
-   **Advanced SQL:** Writing complex database queries with `JOIN`s, aggregate functions (`AVG`), and conflict handling to manage data efficiently.

---

## Tech Stack

This project was built using a modern full-stack JavaScript ecosystem:

-   **Frontend:** React.js, React Router, Axios
-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL
-   **Authentication:** JWT (JSON Web Tokens), bcrypt.js

---

## Getting Started: Running the App Locally

Want to run this project on your own machine? Here's how:

#### Prerequisites
-   You'll need Node.js and PostgreSQL installed on your computer.

#### 1. Get the Code
First, clone the repository from GitHub:
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd your-project-folder
```

#### 2. Set Up the Backend
1.  Navigate to the backend: `cd backend`
2.  Install all the packages: `npm install`
3.  Create a `.env` file and add your database details (you can use `.env.example` as a guide).
4.  Set up your database tables by running the provided SQL schema.
5.  Start the server! `npm run dev`
    *(It will be running at `http://localhost:5000`)*

#### 3. Launch the Frontend
1.  Open a **new terminal** and navigate to the frontend: `cd frontend`
2.  Install all the packages: `npm install`
3.  Start the React app: `npm start`
    *(It will open automatically at `http://localhost:3000`)*

---

## Try It Yourself! (Sample Logins)

To see the role-based security in action, I've set up three sample users for you to try out.

* **System Administrator:**
    * **Email:** `akshay@gmail.com`
    * **Password:** `Pass@123`

* **Store Owner:**
    * **Email:** `dummy@gmail.com`
    * **Password:** `Pass@1234`
    * *(Note: This user is the owner of the 'Cool Kicks' store).*

* **Normal User:**
    * **Email:** `Hello@gmail.com`
    * **Password:** `Pass@1234`

Thanks for checking out my project!