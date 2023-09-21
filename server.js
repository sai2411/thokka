// Import necessary modules
const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors library
const db = require('./models');
const userRoutes = require('./routes/userRoutes');

// Set up your port
const PORT = process.env.PORT || 8080;

// Assign the variable app to express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials (cookies, headers, etc.)
  })); // Use the cors middleware to enable CORS for all routes

// Synchronize the database and force it to false so we don't lose data
db.sequelize.sync({ force: false}).then(() => {
    console.log("db has been re sync");
});


// Routes for the user API
app.use('/api/users', userRoutes);

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
