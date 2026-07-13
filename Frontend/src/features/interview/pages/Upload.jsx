import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../style/Upload.scss"
import dashboard1 from "../../../../assets/resume.png";
import dashboard2 from "../../../../assets/resume2.png";
import { useInterview } from "../hooks/useInterview";

const Upload = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const navigate = useNavigate();
  const safeReports = Array.isArray(reports) ? reports : [];

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const acceptFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("File is too large. Max size is 3MB.");
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleFileChange = (e) => {
    acceptFile(e.target.files[0]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    acceptFile(e.dataTransfer.files[0]);
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

    try {
      const createdReport = await generateReport({ jobDescription, resumeFile, selfDescription });
      navigate(`/interview/${createdReport._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate interview report. Please try again.");
    }
  };

  useEffect(() => {
    getReports().catch(console.error);
  }, []);

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

                        <div
                            className={`dropzone ${isDragging ? "dropzone--active" : ""} ${resumeFile ? "dropzone--filled" : ""}`}
                            onClick={handleBrowseClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            role="button"
                            tabIndex={0}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf"
                                onChange={handleFileChange}
                                hidden
                            />

                            {resumeFile ? (
                                <div className="dropzone__file">
                                    <span className="dropzone__file-icon" aria-hidden="true" />
                                    <span className="dropzone__file-name">{resumeFile.name}</span>
                                    <button type="button" className="dropzone__remove" onClick={handleRemoveFile}>
                                        &times;
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="dropzone__icon" aria-hidden="true" />
                                    <p className="dropzone__text">
                                        Drag &amp; drop your file here
                                        <span>or</span>
                                    </p>
                                    <span className="dropzone__browse">Browse File</span>
                                    <p className="dropzone__hint">PDF, Max 3MB</p>
                                </>
                            )}
                        </div>
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

                    <button type="submit" className="generate-btn" disabled={loading}>
                        {loading ? "Generating..." : "Generate Interview Report"}
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

        {/* Recent Reports List */}
            {safeReports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {safeReports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || "Untitled Position"}</h3>
                                <p className="report-meta">
                                    {new Date(report.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p
                                    className={`match-score ${
                                        report.matchScore >= 80
                                            ? "score--high"
                                            : report.matchScore >= 60
                                            ? "score--mid"
                                            : "score--low"
                                    }`}
                                >
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

    </div>
  )
}

export default Upload
