const express = require("express")
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate interview report on the basis of candidates's resume pdf , self description and job description
 * @acces Private
 */
interviewRouter.post("/ai-resume-checker", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)


module.exports = interviewRouter