const mongoose = require('mongoose')

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {
    _id : false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        required : [true, "Severity is required"]
    },
    reason: {
        type: String,
        required: [true, "Reason is required"]
    },
    recommendation: {
        type: String,
        required: [true, "Recommendation is required"]
    }
}, {
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required"]
    },
    focus : {
        type : String, 
        required : [true, "Focus is required"]
    },
    tasks : [{
        type : String,
        required : [true, "Task is required"]
    }]
})

const overallFeedbackSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: [true, "Summary is required"]
    },
    resumeQuality: {
        type: String,
        enum: ["Poor", "Average", "Good", "Excellent"],
        required: true
    },
    hiringChance: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    }
}, {
    _id: false
});

const strengthSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const missingKeywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const matchedSkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ["Resume", "Self Description", "Both"],
        required: true
    }
}, {
    _id: false
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job description is required"]
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100,
    },
    technicalQuestions : [technicalQuestionSchema],
    behaviouralQuestions : [behaviouralQuestionSchema],
    strengths : [strengthSchema],
    missingKeyword : [missingKeywordSchema],
    matchedSkill : [matchedSkillSchema],
    skillGaps : [skillGapSchema],
    overallFeedback : [overallFeedbackSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : {
        type : String,
        required : [true, "Job title is required"]
    }
}, {
    timestamps: true
})

// using indexing here for better performance
interviewReportSchema.index({ userId: 1, createdAt: -1 });

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel