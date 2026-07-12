const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
  }));

// require all the routes here 
const authRouter = require('./routes/auth.route')
const interviewRouter = require("./routes/interview.routes")

//  using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview-prep",interviewRouter)

module.exports = app;