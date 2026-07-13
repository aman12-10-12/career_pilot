const { GoogleGenAI } =  require("@google/genai")
const { parse } = require("dotenv")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
})

// ---------- Sub-schemas  ----------

const technicalQuestionSchema = z.object({
    question: z.string().describe("The technical question can be asked in the interview relevant to the job description and the candidate's resume/skills."),
    intention: z.string().describe("Why this question is being asked - what skill, concept, or experience the interviewer is trying to probe."),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
})
 
const behaviouralQuestionSchema = z.object({
    question: z.string().describe("A behavioural interview question (e.g. teamwork, conflict, leadership) relevant to the role."),
    intention: z.string().describe("Why this question is being asked - what soft skill or trait the interviewer wants to evaluate."),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
})
 
const strengthSchema = z.object({
    title: z.string().describe("A short label for the candidate's strength (e.g. 'Strong backend experience')."),
    explanation: z.string().describe("A brief explanation of why this is a strength, referencing the resume/self description and how it aligns with the job description.")
})
 
const missingKeywordSchema = z.object({
    keyword: z.string().describe("A skill, tool, or keyword present in the job description but missing/underrepresented in the resume or self description."),
    importance: z.enum(["Low", "Medium", "High"]).describe("How important this missing keyword is for the role."),
    reason: z.string().describe("Why this keyword matters for the job and why its absence is notable.")
})
 
const matchedSkillSchema = z.object({
    skill: z.string().describe("A skill from the job description that the candidate demonstrably has."),
    source: z.enum(["Resume", "Self Description", "Both"]).describe("Where this matched skill was found : the resume, the self description, or both.")
})
 
const skillGapSchema = z.object({
    skill: z.string().describe("A skill required or preferred by the job description that the candidate is lacking or weak in."),
    severity: z.enum(["low", "medium", "high"]).describe("How critical this gap is relative to the job requirements."),
    reason: z.string().describe("Why this is considered a gap, based on the resume/self description versus the job description."),
    recommendation: z.string().describe("A concrete suggestion for how the candidate can close this skill gap.")
})
 
const overallFeedbackSchema = z.object({
    summary: z.string().describe("A concise overall summary of the candidate's fit for the role."),
    resumeQuality: z.enum(["Poor", "Average", "Good", "Excellent"]).describe("An assessment of how well-written and well-structured the resume is."),
    hiringChance: z.enum(["Low", "Medium", "High"]).describe("An estimate of the candidate's likelihood of being hired for this role based on the match.")
})
 
const preparationPlanSchema = z.object({
    day: z.number().int().describe("The day number in the preparation plan (e.g. 1, 2, 3...)."),
    focus: z.string().describe("The main focus area for this day (e.g. 'System Design Basics', 'Mock Behavioural Interviews')."),
    tasks: z.array(z.string()).describe("A list of specific, actionable tasks the candidate should complete on this day.")
})
 
// ---------- Top level schema ----------
 
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100)
        .describe("Overall match score (0-100) between the candidate (resume + self description) and the job description."),
 
    technicalQuestions: z.array(technicalQuestionSchema)
        .describe("A list of technical interview questions tailored to the job description and candidate's background, with intentions and model answers."),
 
    behaviouralQuestions: z.array(behaviouralQuestionSchema)
        .describe("A list of behavioural interview questions tailored to the role, with intentions and model answers."),
 
    strengths: z.array(strengthSchema)
        .describe("Key strengths of the candidate relative to this job description."),
 
    missingKeyword: z.array(missingKeywordSchema)
        .describe("Important keywords/skills from the job description that are missing or weak in the resume/self description."),
 
    matchedSkill: z.array(matchedSkillSchema)
        .describe("Skills from the job description that the candidate clearly has, and where that evidence came from."),
 
    skillGaps: z.array(skillGapSchema)
        .describe("Specific skill gaps between the candidate's profile and the job requirements, with severity, reasoning, and recommendations."),
 
    overallFeedback: overallFeedbackSchema
        .describe("A single overall feedback block summarizing resume quality, fit, and hiring chances."),
 
    preparationPlan: z.array(preparationPlanSchema)
        .describe("A day by day preparation plan to help the candidate get ready for this interview."),
    
    title: z.string().describe("the title of the job for which the interview report is generated")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
 
    const prompt = `
                    You are an expert technical recruiter and interview coach.
 
                    Analyze the candidate's resume and job description below and produce a full interview preparation report.
 
                    Return ONLY JSON matching the provided response schema.
                        - Do not rename fields.
                        - Do not add new fields.
                        - Do not omit required fields.
                        - Do not wrap any nested object or array as a JSON-encoded string - return real nested objects/arrays, not stringified JSON.
 
                    Job Description:
                    """
                    ${jobDescription}
                    """
 
                    Candidate Resume:
                    """
                    ${resume || "Not provided"}
                    """
 
                    Candidate Self Description:
                    """
                    ${selfDescription || "Not provided"}
                    """
 
                    Instructions:
                    - Extract the candidate's full name and email address exactly as they appear in the resume text. If either is missing from the resume, return an empty string for that field - do not guess or invent one.
                    - Compute a matchScore (0-100) reflecting how well the candidate fits the job description.
                    - Generate EXACTLY 8 technical interview questions and EXACTLY 5 behavioural interview questions - no more, no fewer - each with an intention and a strong sample answer.
                    - Identify the candidate's strengths, matched skills (and their source), missing keywords, and skill gaps.
                    - Give an overall feedback summary including resume quality and hiring chance.
                    - Create a realistic day-by-day preparation plan.
                    - Base everything strictly on the provided job description, resume, and self description.
                    `.trim()
 
    const rawSchema = z.toJSONSchema(interviewReportSchema)
    delete rawSchema.$schema

 
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: rawSchema
        }
    })
 
     let parsed
    try {
        parsed = JSON.parse(response.text)
    } catch (err) {
        throw new Error("Failed to parse Gemini response as JSON: " + err.message)
    }
 
    // console.log("Parsed result from Gemini:", parsed)
 
    const validated = interviewReportSchema.parse(parsed)
 
    if (!validated.candidateEmail) {
        const emailMatch = (resume || "").match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
        if (emailMatch) validated.candidateEmail = emailMatch[0]
    }
 
    if (!validated.candidateName) {
        const firstLine = (resume || "").split("\n").map(l => l.trim()).find(l => l.length > 0)
        if (firstLine) validated.candidateName = firstLine
    }
 
    return validated
}


const resumePdfSchema = z.object({
    html: z.string().describe("The full HTML content of the resume, ready to be rendered directly to PDF via Puppeteer.")
})
 
async function generatePdfFromHtml(html) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
 
    try {
        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: "networkidle0" })
 
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }
        })
 
        return pdfBuffer
    } finally {
        await browser.close()
    }
}
 
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
 
    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
 
                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        Use Times New Roman as font and also the gap should be minimal everything adjusted perfectly.
                        Think like you are Recruiter and Hiring Head and seeing my so act like that and make it.
                    `
 
    const rawSchema = z.toJSONSchema(resumePdfSchema)
    delete rawSchema.$schema
 
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: rawSchema
        }
    })
 
    let parsed
    try {
        parsed = JSON.parse(response.text)
    } catch (err) {
        throw new Error("Failed to parse Gemini response as JSON: " + err.message)
    }
 
    const validated = resumePdfSchema.parse(parsed)
 
    const pdfBuffer = await generatePdfFromHtml(validated.html)
 
    return pdfBuffer
}
 
module.exports = { generateInterviewReport, generateResumePdf }
