# Movie Booking Site Backend

This repository contains the backend codebase for a movie booking site. The backend is responsible for handling user authentication, managing movie data, scheduling shows, and handling booking requests.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely. Authentication is implemented using JWT (JSON Web Tokens) for secure communication between the client and server.
  
- **Movie Management**: Administrators can add, update, and delete movie information such as title, description, duration, genre, and poster image.

- **Show Scheduling**: Administrators can create schedules for movie shows, specifying the movie, date, time, and theater.

- **Booking Management**: Users can browse available shows and book tickets. The backend manages the booking process, including seat availability and reservation status.

## Technologies Used

- **Node.js**: The backend is built using Node.js, a JavaScript runtime.
  
- **Express.js**: Express.js is used as the web application framework for Node.js, providing a robust set of features for building web applications and APIs.
  
- **MongoDB**: MongoDB is used as the database to store user data, movie information, show schedules, and booking details. Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, is used to simplify interactions with the database.
  
- **JWT (JSON Web Tokens)**: JWT is used for user authentication. Tokens are generated upon successful login and are used to authenticate subsequent API requests.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/movie-booking-backend.git
    ```

2. Install dependencies:

    ```bash
    cd movie-booking-backend
    npm install
    ```

3. Set up environment variables:
   
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     - `PORT`: Port number for the server to run on.
     - `MONGODB_URI`: URI for connecting to MongoDB database.
     - `JWT_SECRET`: Secret key for JWT token generation.
   
   Example `.env` file:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/movie_booking
   JWT_SECRET=mysecretkey
   ```

4. Start the server:

    ```bash
    npm start
    ```

5. Use PostMan API to test the API endpoints

## API Documentation

The backend exposes various endpoints for user authentication, movie management, show scheduling, and booking management. Refer to the API documentation for details on available endpoints and their usage.

[API Documentation](https://www.postman.com/what-is-an-api/)

## Helpful Resource - https://www.youtube.com/watch?v=H9M02of22z4&t=3210s 

