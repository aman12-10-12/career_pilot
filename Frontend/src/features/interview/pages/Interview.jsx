import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/interview.scss";
import InterviewSkeleton from "./InterviewSkeleton";



/* ---------------------------------------------------------
   Icons
--------------------------------------------------------- */
const Icon = {
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 3 12 9 6" />
      <polyline points="15 6 21 12 15 18" />
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Gap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Spark: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { key: "technicalQuestions", label: "Technical Questions", icon: Icon.Code },
  { key: "behaviouralQuestions", label: "Behavioural Questions", icon: Icon.Chat },
  { key: "skillGaps", label: "Skill Gap", icon: Icon.Gap },
  { key: "preparationPlan", label: "Preparation Plan", icon: Icon.Map },
];

const severityToClass = (level) => {
  const l = (level || "").toLowerCase();
  if (l === "high") return "tone-danger";
  if (l === "medium") return "tone-warning";
  return "tone-success";
};

/* ---------------------------------------------------------
   Accordion — used for technical & behavioural questions
--------------------------------------------------------- */
function QuestionAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`accordion__item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="accordion__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="accordion__question">{item.question}</span>
              <span className="accordion__chevron">
                <Icon.Chevron />
              </span>
            </button>

            <div className="accordion__panel">
              <div className="accordion__panel-inner">
                <div className="accordion__block">
                  <span className="accordion__block-label">Intention</span>
                  <p>{item.intention}</p>
                </div>
                <div className="accordion__block">
                  <span className="accordion__block-label">Suggested answer</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------
   Roadmap — preparation plan
--------------------------------------------------------- */
function Roadmap({ plan }) {
  return (
    <div className="roadmap">
      <div className="roadmap__rail" aria-hidden="true" />
      {plan.map((step) => (
        <div className="roadmap__step" key={step.day}>
          <div className="roadmap__node">
            <span>{step.day}</span>
          </div>
          <div className="roadmap__content glass-card glass-card--tight">
            <div className="roadmap__day-tag">Day {step.day}</div>
            <h4>{step.focus}</h4>
            <ul>
              {step.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Skill gap cards
--------------------------------------------------------- */
function SkillGaps({ gaps }) {
  return (
    <div className="gap-grid">
      {gaps.map((gap, i) => (
        <div className="gap-card glass-card" key={i}>
          <div className="gap-card__head">
            <h4>{gap.skill}</h4>
            <span className={`badge ${severityToClass(gap.severity)}`}>{gap.severity}</span>
          </div>
          <p className="gap-card__reason">{gap.reason}</p>
          <div className="gap-card__recommend">
            <span className="gap-card__recommend-label">
              <Icon.Spark /> Recommendation
            </span>
            <p>{gap.recommendation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Match score ring (right panel signature element)
--------------------------------------------------------- */
function MatchScoreRing({ score }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  const tone = clamped >= 75 ? "tone-success" : clamped >= 50 ? "tone-warning" : "tone-danger";
  const label = clamped >= 75 ? "Strong match for this role" : clamped >= 50 ? "Moderate match — a few gaps" : "Needs targeted prep";

  return (
    <div className="score-ring">
      <svg viewBox="0 0 140 140" className="score-ring__svg">
        <circle className="score-ring__track" cx="70" cy="70" r={radius} />
        <circle
          className={`score-ring__value ${tone}`}
          cx="70"
          cy="70"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring__label">
        <span className="score-ring__number">{clamped}</span>
        <span className="score-ring__percent">%</span>
      </div>
      <p className={`score-ring__caption ${tone}`}>{label}</p>
    </div>
  );
}

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
export default function Interview({ data: providedData }) {
  const { interviewId } = useParams();
  const { report, loading, getReportById } = useInterview();
  const [fetchError, setFetchError] = useState("");
  const [activeSection, setActiveSection] = useState("technicalQuestions");

  useEffect(() => {
    if (providedData || !interviewId) return;
    setFetchError("");
    getReportById(interviewId).catch((err) => {
      setFetchError(err?.response?.data?.message || "Failed to load this interview report.");
    });
  }, [interviewId, providedData]);

  const data = report || providedData;

  const feedback = useMemo(() => (data?.overallFeedback && data.overallFeedback[0]) || {}, [data]);

  if (loading) {
    return <InterviewSkeleton />;
  }

  if (!data) {
      return (
          <div className="ipd ipd--empty">
              <div className="glass-card ipd__status">
                  {fetchError
                      ? (
                          <p className="ipd__status-error">{fetchError}</p>
                      )
                      : (
                          <p>No report data available.</p>
                      )}
              </div>
          </div>
      );
  }

  const sectionTitle = {
    technicalQuestions: "Technical Questions",
    behaviouralQuestions: "Behavioural Questions",
    skillGaps: "Skill Gap Analysis",
    preparationPlan: "Preparation Road Map",
  }[activeSection];

  const sectionSub = {
    technicalQuestions: `${data.technicalQuestions?.length || 0} questions generated from your resume & the JD`,
    behaviouralQuestions: `${data.behaviouralQuestions?.length || 0} questions on leadership, ownership & adaptability`,
    skillGaps: `${data.skillGaps?.length || 0} gaps identified against the role`,
    preparationPlan: `${data.preparationPlan?.length || 0}-day plan`,
  }[activeSection];

  const reportKey = data._id || interviewId || "sample";

  return (
    <div className="ipd">
      <div className="ipd__layout">
        {/* Sidebar */}
        <aside className="ipd__sidebar glass-card">
          <div className="ipd__brand">
            <span className="ipd__brand-dot" />
            Interview Prep
          </div>

          <p className="ipd__sidebar-label">Sections</p>
          <nav className="ipd__nav">
            {NAV_ITEMS.map(({ key, label, icon: ItemIcon }) => (
              <button
                key={key}
                type="button"
                className={`ipd__nav-item ${activeSection === key ? "is-active" : ""}`}
                onClick={() => setActiveSection(key)}
              >
                <span className="ipd__nav-icon">
                  <ItemIcon />
                </span>
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="ipd__main glass-card">
          {data.jobTitle && (
            <div className="ipd__job-title">
              <span className="ipd__job-title-icon">
                <Icon.Briefcase />
              </span>
              <div>
                <span className="ipd__job-title-label">Preparing you for</span>
                <h1>{data.jobTitle}</h1>
              </div>
            </div>
          )}

          <header className="ipd__main-head">
            <h2>{sectionTitle}</h2>
            <p>{sectionSub}</p>
          </header>

          <div className="ipd__main-body">
            {activeSection === "technicalQuestions" && (
              <QuestionAccordion key={`technical-${reportKey}`} items={data.technicalQuestions || []} />
            )}
            {activeSection === "behaviouralQuestions" && (
              <QuestionAccordion key={`behavioural-${reportKey}`} items={data.behaviouralQuestions || []} />
            )}
            {activeSection === "skillGaps" && <SkillGaps gaps={data.skillGaps || []} />}
            {activeSection === "preparationPlan" && <Roadmap plan={data.preparationPlan || []} />}
          </div>
        </main>

        {/* Right panel */}
        <aside className="ipd__right">
          <section className="glass-card ipd__panel">
            <p className="ipd__panel-title">Match Score</p>
            <MatchScoreRing score={data.matchScore} />
          </section>

          <section className="glass-card ipd__panel">
            <p className="ipd__panel-title">Matched Skills</p>
            <div className="chip-row">
              {(data.matchedSkill || []).map((s, i) => (
                <span className="chip" key={i}>
                  {s.skill}
                  <em>{s.source}</em>
                </span>
              ))}
            </div>
          </section>

          <section className="glass-card ipd__panel">
            <p className="ipd__panel-title">Missing Keywords</p>
            <ul className="keyword-list">
              {(data.missingKeyword || []).map((k, i) => (
                <li key={i}>
                  <div className="keyword-list__head">
                    <span>{k.keyword}</span>
                    <span className={`badge ${severityToClass(k.importance)}`}>{k.importance}</span>
                  </div>
                  <p>{k.reason}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card ipd__panel">
            <p className="ipd__panel-title">Strengths</p>
            <ul className="strength-list">
              {(data.strengths || []).map((s, i) => (
                <li key={i}>
                  <h5>{s.title}</h5>
                  <p>{s.explanation}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card ipd__panel">
            <p className="ipd__panel-title">Overall Feedback</p>
            <div className="feedback">
              <p className="feedback__summary">{feedback.summary}</p>
              <div className="feedback__meta">
                <div>
                  <span>Resume quality</span>
                  <strong>{feedback.resumeQuality}</strong>
                </div>
                <div>
                  <span>Hiring chance</span>
                  <strong>{feedback.hiringChance}</strong>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
