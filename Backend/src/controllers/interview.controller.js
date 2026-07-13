const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @name generateInterviewReportController
 * @description Controller to generate interview report based on user self description, resume and job description
 */
async function generateInterviewReportController(req, res) {

    if (!req.file) {
        return res.status(400).json({
            message: "Resume file is required. Send it as multipart/form-data under a field named 'resume'."
        })
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message : "Interview Report genearted succesfully",
        interviewReport
    })
}

/**
 * @name getInterviewreportByidcontroller
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewreportByidcontroller(req,res) {

    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport) {
        return res.status(404).json({
            message : "Interview report not found"
        })
    }

    res.status(200).json({
        message : "Interview report fetched succesfully.",
        interviewReport
    })

}


/**
 * @name getAllInterviewReportcontroller
 * @description Controller to get all interview report of logged in user.
 */
async function getAllInterviewReportcontroller(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan -strengths -missingKeyword -matchedSkill");

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports,
        });
    } catch (error) {
        console.error("getAllInterviewReportcontroller error:", error);
        return res.status(500).json({
            message: "Failed to fetch interview reports",
        });
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewreportByidcontroller,
    getAllInterviewReportcontroller
}