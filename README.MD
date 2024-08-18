# Bike Rental Reservation System Backend

Welcome to the Bike Rental Reservation System Backend! This project provides a comprehensive backend solution for managing bike rentals in a vibrant coastal town, enabling users to rent bikes seamlessly while allowing admins to manage the fleet and bookings efficiently.

## 🚀 Live URL

Check out the live version of this project [here](google.com)

## 📚 Features

- **User Authentication**: Secure registration and login system.
- **CRUD Operations**: Manage users, bikes, and bookings.
- **Authorization**: Role-based access control for users and admins.
- **Bike Availability**: Real-time updates on bike availability.
- **Booking Management**: Easily create, view, update, and delete bookings.
- **Transaction & Rollback**: Ensure data integrity
- **Error Handling**: Comprehensive error handling, including Zod validation.
- **Global Error Handling**: Unified error responses and not found route handler.

## 🛠️ Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM**: Mongoose
- **Validation Library**: Zod
- **Database**: MongoDB
- **Authentication**: Jwt

## 📦 Project Setup

### 1. Clone the Repository

    ```bash
     git clone https://github.com/ixaman/bike-rental-backend

    ```

### 2. Navigate to Project Directory

    ```bash
     cd bike-rental-backend
    ```

### 3. Install Dependencies

    ```bash
     npm install
    ```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

    ```
     PORT=5000
     DATABASE_URL=your_db_url
     BCRYPT_SALT_ROUND=your_salt_round
     JWT_ACCESS_SECRET=your_jwt_secret_key
     JWT_ACCESS_EXPIRES_IN=your_jwt_validity_time
    ```

### 5. Run the Application

    ```bash
     npm run start
    ```

## 📋 API Documentation

Explore the API endpoints in the Postman collection or use the following routes:

1. User Routes

   - Sign Up: `POST /api/auth/signup`
   - Login: `POST /api/auth/login`
   - Get Profile: `GET /api/users/me`
   - Update Profile: `PUT /api/users/me`

2. Bike Routes

   - Create Bike: `POST /api/bikes (Admin only)`
   - Get All Bikes: `GET /api/bikes`
   - Update Bike: `PUT /api/bikes/:id (Admin only)`
   - Delete Bike: `DELETE /api/bikes/:id (Admin only)`

3. Rental Routes
   - Create Rental: `POST /api/rentals (User only)`
   - Return Bike: `PUT /api/rentals/:id/return (Admin only)`
   - Get All Rentals: `GET /api/rentals (User only)`

## 🔒 Security

- Passwords are hashed using bcrypt.
- JWT is used for secure authentication.
- Input validation is enforced through Zod.
