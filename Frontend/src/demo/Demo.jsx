import { useEffect, useRef } from "react";
import "./demo.scss";

import uploadFormShot from "./screenshots/dashboard-and-upload.png";
import interviewPrepShot from "./screenshots/interview-prep-questions.png";
import recentPlansShot from "./screenshots/recent-interview-plans.png";


const DASHBOARD = {
  user: "Aman",
  overallScore: 86,
  atsCompatibility: 92,
  skillsMatch: 80,
  matchedSkills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "JWT"],
  missingSkills: ["GraphQL", "MySQL", "Entgo", "Graph DB"],
  profile: {
    totalExperience: "1.5+ Years",
    currentRole: "MERN Stack Developer",
    targetRole: "SDE / Full Stack Developer",
    matchScore: 80,
  },
  strengths: [
    "Strong MERN stack development experience",
    "Real-time apps using Socket.IO",
    "Authentication & authorization with JWT",
    "Good understanding of RESTful APIs",
    "Clean, modular and scalable code",
  ],
  improvements: [
    "Add GraphQL experience",
    "Include MySQL projects",
    "Highlight ORM (Entgo/Sequelize) usage",
    "Add Graph Database knowledge",
    "Include more quantified achievements",
  ],
  rewrite: {
    before: "Built web applications using React and Node.js.",
    after:
      "Developed full-stack web applications using React, Node.js, Express, and MongoDB, implementing RESTful APIs, JWT authentication, and real-time features with Socket.IO.",
  },
  actionPlan: [
    { label: "Improve Resume", detail: "Add missing keywords and quantify achievements", status: "Completed" },
    { label: "Learn Missing Skills", detail: "Focus on GraphQL, MySQL, Entgo", status: "In Progress" },
    { label: "Practice Interview", detail: "Solve technical, behavioral and HR questions", status: "In Progress" },
    { label: "Re-upload Resume", detail: "Analyze again after improvements", status: "Pending" },
  ],
  overallProgress: 50,
};

const INTERVIEW_PREP = {
  matchScore: 78,
  matchLabel: "Strong match for this role",
  matchedSkills: ["React.js", "JavaScript", "MySQL", "HTML5 & CSS3", "Git"],
  missingKeywords: [
    {
      term: "GraphQL",
      severity: "Medium",
      note: "The JD highlights GraphQL integration (schemas, queries, mutations, resolvers), but the resume only lists REST APIs.",
    },
    {
      term: "Entgo",
      severity: "Medium",
      note: "Entgo is specified as the relational database ORM in the JD. The candidate has basic relational experience but hasn't used this Go-based ORM.",
    },
  ],
  questions: [
    {
      id: 1,
      prompt:
        "In your CoDuo project, you achieved sub-100ms latency under concurrent load on AWS EC2. How did you optimize MongoDB schemas using compound indexing and projection to achieve this, and how would you optimize MySQL queries similarly for our database integration?",
      intention:
        "To test the candidate's understanding of database query optimization, indexing, and projection, specifically bridging NoSQL and SQL database concepts required for the role.",
      answer:
        "Explain that compound indexing targets query paths matching multiple fields, using the left-to-right prefix rule. Mention that projection prevents returning unnecessary fields, minimizing payload size. For MySQL, describe composite indexes on columns used in WHERE, JOIN, and ORDER BY clauses, and using EXPLAIN to catch full table scans.",
      open: true,
    },
    {
      id: 2,
      prompt:
        "You have strong experience with React.js hooks and state management. Can you explain the exact difference between useMemo and useCallback, and under what circumstances we should avoid using them?",
      open: false,
    },
    {
      id: 3,
      prompt:
        "The job description mentions GraphQL integration. While your projects focused on REST APIs with Node.js/Express, how would you go about transitioning a REST endpoint in your Collaborative Code Editor into a GraphQL schema with queries and mutations?",
      open: false,
    },
  ],
};

const SCREENSHOTS = [
  {
    id: "upload",
    src: uploadFormShot,
    alt: "Resume Doctor upload form next to the analysis dashboard showing an 86/100 resume score, 92% ATS compatibility, and an 80% skills match",
    eyebrow: "Step 1 — Upload",
    title: "Drop in a resume and a job description",
    description:
      "The intake form takes a job description, a resume (PDF, up to 3MB), and an optional self-description. Behind the scenes, the PDF is parsed with pdf-parse and sent to Gemini alongside the job description for structured analysis.",
  },
  {
    id: "dashboard",
    src: uploadFormShot,
    alt: "Resume Doctor dashboard showing resume strengths, areas for improvement, AI rewrite suggestions, personalized interview questions, and an action plan",
    eyebrow: "Step 2 — Analyze",
    title: "A full breakdown, not just a score",
    description:
      "The dashboard surfaces an overall resume score, ATS compatibility, matched vs. missing skills, before/after AI rewrite suggestions for weak bullet points, and a concrete action plan with progress tracking — all generated in a single structured Gemini response validated against a Zod schema.",
  },
  {
    id: "prep",
    src: interviewPrepShot,
    alt: "Interview Prep screen with technical questions, an intention and suggested answer for each, a 78% match score, matched skills, and missing keywords",
    eyebrow: "Step 3 — Prepare",
    title: "Interview questions built from your actual resume",
    description:
      "Each technical question is generated from real details in the resume (project names, specific technologies, metrics) and paired with the interviewer's intention and a model answer — so prep is grounded in what's actually on the page, not generic question banks.",
  },
  {
    id: "plans",
    src: recentPlansShot,
    alt: "Recent Interview Plans list showing three Full Stack Developer entries with match scores of 78%, 78%, and 80%",
    eyebrow: "Step 4 — Track",
    title: "Every past analysis, saved and comparable",
    description:
      "Past runs are kept as interview plans, each tagged with the role, date, and match score, so it's easy to see how a resume's fit for a role changes as it's revised.",
  },
];

const RECENT_PLANS = [
  { role: "Full Stack Developer", date: "13 Jul 2026", score: 78, active: false },
  { role: "Full Stack Developer", date: "13 Jul 2026", score: 78, active: true },
  { role: "Full Stack Developer", date: "12 Jul 2026", score: 80, active: false },
];

// ---------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------

function ScoreRing({ value, size = 96, label }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="score-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="8"
          fill="none"
        />
        <circle
          className="score-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="score-ring__label">
        <span className="score-ring__number">{value}</span>
        {label && <span className="score-ring__unit">{label}</span>}
      </div>
    </div>
  );
}

function MatchBadge({ score }) {
  const tier = score >= 80 ? "high" : score >= 60 ? "medium" : "low";
  return (
    <span className={`match-badge match-badge--${tier}`}>
      Match Score: {score}%
    </span>
  );
}

function StatusPill({ status }) {
  const tone = status.toLowerCase().replace(" ", "-");
  return <span className={`status-pill status-pill--${tone}`}>{status}</span>;
}

// ---------------------------------------------------------------------
// Section: Real Screenshots
// ---------------------------------------------------------------------

function ScreenshotsSection() {
  return (
    <section className="demo-section demo-section--screenshots" data-reveal>
      <header className="demo-section__header">
        <span className="demo-section__eyebrow">Inside the App</span>
        <h2 className="demo-section__title">What it actually looks like</h2>
        <p className="demo-section__subtitle">
          Real screens from the running app — not mockups.
        </p>
      </header>

      <div className="shot-list">
        {SCREENSHOTS.map((shot, i) => (
          <div
            key={shot.id}
            className={`shot-row${i % 2 === 1 ? " shot-row--reverse" : ""}`}
            data-reveal
          >
            <figure className="shot-row__figure">
              <img
                className="shot-row__image"
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
              />
            </figure>
            <div className="shot-row__copy">
              <span className="shot-row__eyebrow">{shot.eyebrow}</span>
              <h3 className="shot-row__title">{shot.title}</h3>
              <p className="shot-row__description">{shot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Section: Dashboard
// ---------------------------------------------------------------------

function DashboardSection() {
  return (
    <section className="demo-section demo-section--dashboard" data-reveal>
      <header className="demo-section__header">
        <span className="demo-section__eyebrow">Dashboard</span>
        <h2 className="demo-section__title">Welcome back, {DASHBOARD.user} 👋</h2>
        <p className="demo-section__subtitle">
          Your AI-powered resume analysis and interview preparation insights, all in one place.
        </p>
      </header>

      <div className="dash-grid">
        <div className="glass-card dash-grid__score">
          <h3 className="glass-card__title">Overall Resume Score</h3>
          <ScoreRing value={DASHBOARD.overallScore} label="/100" />
          <p className="dash-grid__note">
            <strong>Great job!</strong> Your resume is strong. A few improvements can make it even better.
          </p>
        </div>

        <div className="glass-card dash-grid__ats">
          <h3 className="glass-card__title">ATS Compatibility</h3>
          <div className="big-stat big-stat--green">{DASHBOARD.atsCompatibility}%</div>
          <p className="dash-grid__note">
            <strong>Excellent Match.</strong> Your resume has high compatibility with the job description.
          </p>
        </div>

        <div className="glass-card dash-grid__skills">
          <h3 className="glass-card__title">Skills Match</h3>
          <div className="big-stat big-stat--blue">{DASHBOARD.skillsMatch}%</div>
          <div className="tag-row">
            {DASHBOARD.matchedSkills.map((s) => (
              <span key={s} className="tag tag--matched">{s}</span>
            ))}
          </div>
          <p className="dash-grid__label">Missing Skills</p>
          <div className="tag-row">
            {DASHBOARD.missingSkills.map((s) => (
              <span key={s} className="tag tag--missing">{s}</span>
            ))}
          </div>
        </div>

        <div className="glass-card dash-grid__profile">
          <h3 className="glass-card__title">Profile Overview</h3>
          <ul className="profile-list">
            <li><span>Total Experience</span><strong>{DASHBOARD.profile.totalExperience}</strong></li>
            <li><span>Current Role</span><strong>{DASHBOARD.profile.currentRole}</strong></li>
            <li><span>Target Role</span><strong>{DASHBOARD.profile.targetRole}</strong></li>
            <li><span>Match Score</span><strong>{DASHBOARD.profile.matchScore}%</strong></li>
          </ul>
        </div>

        <div className="glass-card dash-grid__strengths">
          <h3 className="glass-card__title">Resume Strengths</h3>
          <ul className="check-list">
            {DASHBOARD.strengths.map((s) => (
              <li key={s} className="check-list__item check-list__item--good">{s}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card dash-grid__improve">
          <h3 className="glass-card__title">Areas for Improvement</h3>
          <ul className="check-list">
            {DASHBOARD.improvements.map((s) => (
              <li key={s} className="check-list__item check-list__item--warn">{s}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card dash-grid__rewrite">
          <h3 className="glass-card__title">AI Resume Rewrite Suggestions</h3>
          <div className="rewrite-compare">
            <div className="rewrite-compare__before">
              <span className="rewrite-compare__label">Before</span>
              <p>{DASHBOARD.rewrite.before}</p>
            </div>
            <div className="rewrite-compare__arrow">→</div>
            <div className="rewrite-compare__after">
              <span className="rewrite-compare__label">After (AI Optimized)</span>
              <p>{DASHBOARD.rewrite.after}</p>
            </div>
          </div>
          <button type="button" className="btn btn--ghost">Apply Suggestion</button>
        </div>

        <div className="glass-card dash-grid__action">
          <h3 className="glass-card__title">Action Plan</h3>
          <ul className="action-list">
            {DASHBOARD.actionPlan.map((item) => (
              <li key={item.label} className="action-list__item">
                <div>
                  <p className="action-list__label">{item.label}</p>
                  <p className="action-list__detail">{item.detail}</p>
                </div>
                <StatusPill status={item.status} />
              </li>
            ))}
          </ul>
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${DASHBOARD.overallProgress}%` }}
            />
          </div>
          <span className="progress-bar__label">{DASHBOARD.overallProgress}% Overall Progress</span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Section: Interview Prep
// ---------------------------------------------------------------------

function QuestionCard({ question }) {
  const detailsRef = useRef(null);

  return (
    <div className={`question-card${question.open ? " question-card--open" : ""}`}>
      <div className="question-card__row">
        <span className="question-card__index">{String(question.id).padStart(2, "0")}</span>
        <p className="question-card__prompt">{question.prompt}</p>
        <span className="question-card__chevron">{question.open ? "︿" : "﹀"}</span>
      </div>
      {question.intention && (
        <div className="question-card__details" ref={detailsRef}>
          <div className="question-card__block">
            <span className="question-card__block-label">Intention</span>
            <p>{question.intention}</p>
          </div>
          <div className="question-card__block">
            <span className="question-card__block-label">Suggested Answer</span>
            <p>{question.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function InterviewPrepSection() {
  return (
    <section className="demo-section demo-section--prep" data-reveal>
      <header className="demo-section__header">
        <span className="demo-section__eyebrow">Interview Prep</span>
        <h2 className="demo-section__title">Technical Questions</h2>
        <p className="demo-section__subtitle">
          {INTERVIEW_PREP.questions.length} questions generated from your resume & the job description.
        </p>
      </header>

      <div className="prep-grid">
        <div className="prep-grid__main">
          {INTERVIEW_PREP.questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>

        <aside className="prep-grid__side">
          <div className="glass-card prep-grid__match">
            <span className="glass-card__eyebrow">Match Score</span>
            <ScoreRing value={INTERVIEW_PREP.matchScore} label="%" size={120} />
            <p className="prep-grid__match-label">{INTERVIEW_PREP.matchLabel}</p>
          </div>

          <div className="glass-card">
            <span className="glass-card__eyebrow">Matched Skills</span>
            <div className="tag-row">
              {INTERVIEW_PREP.matchedSkills.map((s) => (
                <span key={s} className="tag tag--matched">{s} <em>BOTH</em></span>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <span className="glass-card__eyebrow">Missing Keywords</span>
            {INTERVIEW_PREP.missingKeywords.map((k) => (
              <div key={k.term} className="keyword-block">
                <div className="keyword-block__row">
                  <strong>{k.term}</strong>
                  <span className="keyword-block__severity">{k.severity}</span>
                </div>
                <p>{k.note}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Section: Recent Interview Plans
// ---------------------------------------------------------------------

function RecentPlansSection() {
  return (
    <section className="demo-section demo-section--plans" data-reveal>
      <div className="glass-card plans-panel">
        <h2 className="demo-section__title demo-section__title--center">My Recent Interview Plans</h2>
        <div className="plans-row">
          {RECENT_PLANS.map((plan, i) => (
            <div
              key={i}
              className={`plan-card${plan.active ? " plan-card--active" : ""}`}
            >
              <h3 className="plan-card__role">{plan.role}</h3>
              <p className="plan-card__date">{plan.date}</p>
              <MatchBadge score={plan.score} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// DemoPage
// ---------------------------------------------------------------------

export default function DemoPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="demo-page" ref={rootRef}>
      <header className="demo-page__intro" data-reveal>
        <span className="demo-page__eyebrow">Live Demo</span>
        <h1 className="demo-page__title">See Resume Doctor in action</h1>
        <p className="demo-page__subtitle">
          Upload a resume and a job description — Resume Doctor scores it, finds the gaps,
          and builds an interview prep plan around exactly what you're missing.
        </p>
      </header>

      <ScreenshotsSection />
      <DashboardSection />
      <InterviewPrepSection />
      <RecentPlansSection />
    </main>
  );
}
