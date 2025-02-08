# **Lab4 Users Database**

This project is a Node.js application that uses Express and MongoDB (with Mongoose) to perform basic CRUD operations on a `users` collection. It validates user inputs and integrates MongoDB Atlas as the database. The project follows all required specifications, including validation, API creation, and schema design.

---

## **Project Overview**

This application performs the following:
1. Validates user data using Mongoose validation and `express-validator`.
2. Connects to MongoDB Atlas to store, retrieve, update, and delete user data.
3. Includes API endpoints for adding users, retrieving users, updating users, and deleting users.
4. Uses Postman for testing all endpoints with both valid and invalid data.

---

## **Features**

- **User Schema Validation**:
  - All fields are mandatory.
  - Username must be at least 4 characters long.
  - Only valid email addresses are accepted.
  - City names must only contain alphabets and spaces.
  - Website URLs must be valid (starting with `http` or `https`).
  - Zip code must follow the format `12345-1234`.
  - Phone numbers must follow the format `1-123-123-1234`.

- **API Endpoints**:
  - **POST /users**: Add a new user with validation.
  - **GET /users**: Retrieve all users.
  - **PUT /users/:id**: Update an existing user.
  - **DELETE /users/:id**: Delete a user by ID.

- **Database**: MongoDB Atlas is used to host the `users` collection.

---

## **Tech Stack**

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for API creation.
- **MongoDB**: NoSQL database to store user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Postman**: Tool for testing RESTful APIs.

---

## **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Gone-M/comp3133_lab_ex_4.git
   cd lab4_users_database
