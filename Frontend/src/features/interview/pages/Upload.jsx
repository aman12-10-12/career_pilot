import { useState } from "react";
import "../style/Upload.scss"
import dashboard1 from "../../../../assets/resume.png";
import dashboard2 from "../../../../assets/resume2.png";



const Upload = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeFile) {
      setError("Please upload your resume (PDF) before generating a report.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description you're targeting.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    setIsSubmitting(true);

    try {
      // NOTE: adjust the base URL below to match your actual API origin
      // (e.g. via an env variable like import.meta.env.VITE_API_URL),
      // and swap `credentials: "include"` for an Authorization header
      // if your auth middleware expects a Bearer token instead of a cookie.
      const response = await fetch("/api/interview-prep/ai-resume-checker", {
        method: "POST",
        credentials: "include",
        body: formData, // do NOT set Content-Type manually - the browser
                         // sets the correct multipart boundary automatically
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to generate interview report.");
      }

      const data = await response.json();

      // TODO: replace with your actual navigation, e.g.:
      // navigate(`/reports/${data.interviewReport._id}`)
      console.log("Interview report generated:", data.interviewReport);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div>
        <div className="heading">
            <h1>
                Secure Your <span>Interview Chances</span> With a Tailored Resume
            </h1>
            <p>
                Turn applications into interviews with AI-powered ATS analysis,
                personalized feedback, and interview preparation.
            </p>
        </div>
        <form className='upload' onSubmit={handleSubmit}>
            <section className="upload__left">
                <div className="top">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        name="jobDescription"
                        id="jobDescription"
                        placeholder="Enter job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="bottom">
                    <div className="input-group">
                        <label htmlFor="resume">Upload Resume</label>
                        <input
                            type="file"
                            name="resume"
                            id="resume"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                        {resumeFile && <span className="file-hint">{resumeFile.name}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="selfDescription">Self Description</label>
                        <textarea
                            name="selfDescription"
                            id="selfDescription"
                            placeholder="Describe yourself in a few sentences..."
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="generate-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Generating..." : "Generate Interview Report"}
                    </button>
                </div>
            </section>

            <section className="upload__right">
                <div className="preview-stack">

                    <img
                        src={dashboard1}
                        className="preview preview--back"
                        alt=""
                    />

                    <img
                        src={dashboard2}
                        className="preview preview--front"
                        alt=""
                    />

                </div>

            </section>
        </form>
    </div>
  )
}

export default Upload

