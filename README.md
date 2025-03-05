# Forgot Password Exercise

A simple Node.js application demonstrating password reset functionality using email verification.

## 🧠 Learning Project

**Note:** This repository is intended as a personal learning exercise to explore backend authentication patterns.
## 🔑 Features

- User registration with password hashing
- Password reset via email verification
- Time-limited reset tokens (1 hour)
- MongoDB integration for user data storage

## 🛠️ Technologies Used

- **Node.js** with **Express** for the backend server
- **MongoDB** with **Mongoose** for database operations
- **Nodemailer** for sending password reset emails
- **bcrypt** for secure password hashing
- **crypto** for generating reset tokens

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB database (local or Atlas)
- Gmail account for sending emails

### Installation

1. Clone the repository
   ```
   git clone https://github.com/DanielPodolsky/Forgot-Password-Exercise.git
   cd Forgot-Password-Exercise
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_CLUSTER=your_cluster_address
   MONGODB_OPTIONS=retryWrites=true&w=majority
   GMAIL_MAIL=your_gmail_address
   GMAIL_PASSWORD=your_app_password
   ```

4. Start the server
   ```
   nodemon app.js
   ```

## 📝 API Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/forgot-password** - Request password reset email
- **POST /api/auth/forgot-password/:token** - Reset password with token
