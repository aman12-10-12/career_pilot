import { InterviewContext } from "../interview.context"
import { getAllInterviewReports, generateInterviewreport, getInterviewReportById } from "../services/interview.api"
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

    return { loading, report, reports, generateReport, getReportById, getReports }
}