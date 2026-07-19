const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://resume-doctor-alb-535703116.ap-south-1.elb.amazonaws.com',
];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
}));

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/api/health", (_req, res) => res.status(200).json({ status: "ok" }));

const authRouter = require('./routes/auth.route');
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview-prep", interviewRouter);

module.exports = app;