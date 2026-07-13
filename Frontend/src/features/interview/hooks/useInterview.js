import { InterviewContext } from "../interview.context"
import { getAllInterviewReports, generateInterviewreport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext } from "react"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvide")  
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, resumeFile, selfDescription}) => {
        setLoading(true)
        try {
            const response = await generateInterviewreport({jobDescription, resumeFile, selfDescription})
            setReport(response.interviewReport)
            return response.interviewReport
        }catch(error) {
            console.log(error)
            throw error
        }finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading (true)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response 
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
}