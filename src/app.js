const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// require all the routes here 
const authRouter = require('./routes/auth.route')

//  using all the routes here
app.use("/api/auth", authRouter)


module.exports = app;