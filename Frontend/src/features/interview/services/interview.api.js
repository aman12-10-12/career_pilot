import axios from "axios"

const api = axios.create({
    baseURL: "",
    withCredentials : true,
})

/**
 * @name generateInterviewreport
 * @description Service to generate interview report based on user seld description, resume, and job description.
 */
export const generateInterviewreport = async ({jobDescription, resumeFile, selfDescription}) => {
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resumeFile)
    formData.append("selfDescription", selfDescription)

    const response = await api.post("/api/interview-prep/ai-resume-checker", formData, {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.data
}

/**
 * @name getInterviewReportById
 * @description Service to get interview report by interviewid.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview-prep/report/${interviewId}`)
    return response.data
}

/**
 * @name getAllInterviewReports
 * @description Service to get all interview report of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview-prep/")
    return response.data
};

/**
 * @name generateResumePdf
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview-prep/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })
    return response.data
}