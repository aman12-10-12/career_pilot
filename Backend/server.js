require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const { resume, selfDescription, jobDescription} = require("./src/services/temp.js")
const generateInterviewReport = require("./src/services/ai.service.js")

// Connect to MongoDB
connectDB();
generateInterviewReport({resume, selfDescription, jobDescription})

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
})