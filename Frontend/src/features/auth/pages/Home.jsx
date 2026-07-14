import { useEffect, useRef, useState } from "react";
import "./Home.scss";
import dashboardPreview1 from "../../../../assets/resume.png";
import dashboardPreview2 from "../../../../assets/resume2.png";
import evaluationIllustration from "../../../../assets/creative-image.svg";
import { Link } from "react-router"

function useScrollReveal() {
    const rootRef = useRef(null);

    useEffect(() => {
        const nodes = rootRef.current.querySelectorAll(".reveal");

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

        nodes.forEach((node) => observer.observe(node));

        return () => observer.disconnect();
    }, []);

    return rootRef;
}

const EVALUATION_DATA = [
    {
        title: "ATS Compatibility",
        text: "We analyze your resume's structure, formatting, and keywords to ensure it can be accurately parsed by modern Applicant Tracking Systems.",
    },
    {
        title: "Resume & Job Match",
        text: "Our AI compares your resume with the job description to identify matched skills, missing keywords, and your overall job fit.",
    },
    {
        title: "Resume Quality",
        text: "We evaluate your resume for clarity, measurable achievements, strong action verbs, and areas that can be improved.",
    },
    {
        title: "Interview Preparation",
        text: "Based on your resume and the target role, we generate personalized technical, behavioral, and HR interview questions with suggested answers.",
    },
    {
        title: "Skill Gap Analysis",
        text: "We identify missing skills, explain their importance, and recommend what you should learn to become a stronger candidate.",
    },
    {
        title: "Personalized Action Plan",
        text: "Receive a step-by-step preparation roadmap with resume improvements, learning goals, and interview practice tailored to your profile.",
    },
];

function EvaluationItem({ number, title, text }) {
    return (
        <div className="evaluation-item reveal">
            <span className="evaluation-item__number">{number}</span>
            <div className="evaluation-item__body">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

function Evaluation() {
    return (
        <section className="evaluation">
            <div className="evaluation__visual reveal">
                <img
                    src={evaluationIllustration}
                    alt="Animated illustration of Resume Doctor's AI evaluation process"
                    className="evaluation__image"
                />
            </div>

            <div className="evaluation__content">
                <h2 className="reveal">How Resume Doctor Evaluates Your Resume</h2>
                <p className="evaluation__intro reveal">
                    Resume Doctor uses AI to analyze your resume beyond basic ATS checks. It
                    compares your resume with the job description to provide personalized
                    feedback and interview preparation.
                </p>

                <div className="evaluation__list">
                    {EVALUATION_DATA.map((item, index) => (
                        <EvaluationItem key={item.title} number={index + 1} title={item.title} text={item.text} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const FAQ_DATA = [
    {
        question: "What is a resume checker?",
        answer:
            "A resume checker is a tool that scans your resume the way both an Applicant Tracking System (ATS) and a human recruiter would — checking formatting, keyword relevance, grammar, and overall content quality. Resume Doctor goes a step further: alongside a compatibility score, it flags missing skills against a specific job description, points out generic phrasing recruiters tend to skim past, and suggests concrete rewrites so your resume reads as achievement-driven rather than duty-driven.",
    },
    {
        question: "How do I check my resume score?",
        answer:
            "Upload your resume (PDF or DOCX) from the dashboard, optionally paste in the job description you're targeting, and Resume Doctor generates your score within seconds.",
        list: [
            "An overall Resume Score out of 100",
            "Your ATS Compatibility percentage",
            "A Skills Match percentage against the job description",
        ],
    },
    {
        question: "How do I improve my resume score?",
        list: [
            "Add measurable outcomes to your bullet points (%, ₹, time saved) instead of listing duties",
            "Mirror the exact keywords used in the job description, not just synonyms",
            "Keep formatting simple — avoid tables, columns, and graphics that ATS parsers can't read",
            "Trim outdated or irrelevant experience so your most relevant skills stand out",
            "Apply the Before/After rewrite suggestions Resume Doctor generates automatically",
        ],
    },
    {
        question: "How do I know my resume is ATS compliant?",
        answer:
            "Your ATS Compatibility score tells you exactly that. It checks for parser-breaking elements — like multi-column layouts, text inside images, unusual fonts, and missing section headers — that cause many ATS platforms to misread or drop parts of your resume, even when the content itself is strong.",
    },
    {
        question: "What is a good ATS score?",
        answer:
            "Generally, a score of 80% or higher means your resume is well-structured and ATS parsers should read it accurately. Below 70% usually signals formatting issues or missing keywords worth fixing before you apply — even a great resume can get filtered out for parsing reasons rather than content reasons.",
    },
    {
        question: "Can an ATS read PDFs?",
        answer:
            "Most modern ATS platforms can read PDFs, but only if the PDF preserves selectable text rather than storing your resume as a flattened image. Resume Doctor's uploader automatically checks that your file is machine-readable before scoring it.",
    },
    {
        question: "How do I review my resume for errors?",
        answer:
            "Resume Doctor's grammar and spelling check runs automatically on upload and highlights issues inline. For a final pass, try reading your resume out loud, or ask someone unfamiliar with your work to read it — both catch awkward phrasing that spellcheck alone tends to miss.",
    },
    {
        question: "What should I focus on when checking my resume?",
        list: [
            "Formatting consistency (fonts, spacing, bullet styles)",
            "Grammar, spelling, and tense consistency",
            "Keyword alignment with the target job description",
            "Quantified, achievement-based bullet points",
            "Contact information accuracy",
            "Section order and relevance to the role",
            "File type and naming (avoid \"Resume_Final_v3.pdf\")",
            "Length — ideally one page for under 10 years of experience",
            "No unexplained employment gaps",
        ],
    },
    {
        question: "Can I create a resume checklist?",
        answer: "Yes — a simple one to run through before every application:",
        list: [
            "Every job description keyword is reflected somewhere in the resume",
            "Every bullet point states an outcome, not just a task",
            "Formatting is ATS-safe (no tables, columns, or embedded images)",
        ],
        list2: [
            "Upload your resume and check the score",
            "Apply the suggested keyword and rewrite fixes",
            "Re-run the check to confirm the score improved",
            "Save the final version before applying",
        ],
    },
    {
        question: "Should I read my resume after writing it?",
        answer:
            "Yes — always. A first draft almost always has small inconsistencies (dates, tense, formatting) that are easy to miss while writing but obvious on a second pass. We recommend reviewing it once after a short break, and again after running it through Resume Doctor's analysis.",
    },
    {
        question: "Does your resume checker serve other purposes?",
        answer:
            "Beyond scoring, Resume Doctor generates a full interview preparation report from the same resume — technical and behavioural questions tailored to the job description, sample answers, and a day-by-day prep plan — so the same upload that improves your resume also gets you ready for the interview that follows.",
    },
    {
        question: "What's the difference between the free and paid resume checker plan?",
        answer:
            "The Free plan includes one resume analysis with a basic ATS score and a handful of interview questions. Pro and Premium unlock unlimited analyses, the full interview prep report, AI-powered resume rewriting, and priority support — see the Pricing section above for the full breakdown.",
    },
];

const BENEFITS = [
  {
    icon: "📊",
    title: "ATS Resume Analysis",
    subtitle: "Optimize Your Resume",
    description:
      "Analyze your resume against any job description. Discover missing keywords, improve ATS compatibility, and increase your chances of getting shortlisted.",
    button: "Analyze Resume",
    link: "/upload",
  },
  {
    icon: "🧠",
    title: "AI Interview Prep",
    subtitle: "Practice with Confidence",
    description:
      "Generate personalized technical and behavioral interview questions based on your resume, experience, and target job role.",
    button: "Start Preparing",
    link: "/upload",
  },
  {
    icon: "🎯",
    title: "Skill Gap Report",
    subtitle: "Bridge the Missing Skills",
    description:
      "Identify the skills you're missing and receive an AI-powered roadmap to strengthen your profile before interviews.",
    button: "View Roadmap",
    link: "/upload",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
    return (
        <div className={`faq-item reveal ${isOpen ? "faq-item--open" : ""}`}>
            <button
                className="faq-item__header"
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
            >
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true" />
            </button>

            <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                    {item.answer && <p>{item.answer}</p>}
                    {item.list && (
                        <ul>
                            {item.list.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    )}
                    {item.list2 && (
                        <ol>
                            {item.list2.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}

function Faq() {
    const [openIndex, setOpenIndex] = useState(0); // first question open by default

    const handleToggle = (index) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };

    return (
        <section className="faq">
            <div className="section-heading reveal">
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about checking and improving your resume</p>
            </div>

            <div className="faq__list">
                {FAQ_DATA.map((item, index) => (
                    <FaqItem
                        key={item.question}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={handleToggle}
                    />
                ))}
            </div>
        </section>
    );
}

export default function Home() {
    const rootRef = useScrollReveal();

    return (
        <div className="home" ref={rootRef}>
            {/* ---------------- HERO ---------------- */}
            <section className="hero">
                <div className="hero__content reveal">
                    <span className="hero__badge">AI-Powered Career Growth Platform</span>

                    <h1 className="hero__title">
                        Optimize Your Resume.
                        <br />
                        Prepare for Interviews.
                        <br />
                        <span className="hero__title--accent">Get Hired.</span>
                    </h1>

                    <p className="hero__message">
                        Resume Doctor reads your resume the way a hiring manager does. Upload
                        it alongside a job description and get an instant ATS compatibility
                        score, a skill-gap breakdown, and a tailored set of interview
                        questions with model answers — so you walk into every interview
                        already knowing what you'll be asked.
                    </p>

                    <div className="hero__actions">
                        <Link to={"/upload"}>
                            <button className="btn btn--primary">Upload Resume</button>
                        </Link>
                        <Link to={"/info"}>
                            <button className="btn btn--ghost">More Info</button>
                        </Link>
                    </div>

                    <div className="hero__trust">
                        <div className="hero__avatars">
                            <span className="hero__avatar" />
                            <span className="hero__avatar" />
                            <span className="hero__avatar" />
                        </div>
                        <p>Trusted by 25,000+ job seekers worldwide</p>
                    </div>
                </div>

                <div className="hero__visual reveal reveal--right">
                    <img
                        src={dashboardPreview1}
                        alt="Resume Doctor landing and dashboard preview"
                        className="hero__image hero__image--back"
                    />
                    <img
                        src={dashboardPreview2}
                        alt="Resume Doctor personalized dashboard preview"
                        className="hero__image hero__image--front"
                    />
                </div>
            </section>

            {/* ---------------- FEATURES ---------------- */}
            <section className="features">
                <div className="section-heading reveal">
                    <h2>Powerful Features to Boost Your Career</h2>
                    <p>Everything you need to stand out and land your dream job</p>
                </div>

                <div className="features__grid">
                    <FeatureCard
                        icon="📄"
                        title="AI Resume Analysis"
                        text="Get a detailed ATS score, strengths, weaknesses, and actionable feedback."
                    />
                    <FeatureCard
                        icon="🎤"
                        title="Interview Preparation"
                        text="Access role-specific technical and behavioural questions with model answers."
                    />
                    <FeatureCard
                        icon="📊"
                        title="Skills Gap Analysis"
                        text="Discover missing skills and get a personalized day-by-day learning plan."
                    />
                    <FeatureCard
                        icon="✍️"
                        title="AI Resume Rewrite"
                        text="Improve weak bullet points into metric-driven, recruiter-ready lines."
                    />
                </div>
            </section>

            {/* ---------------- EVALUATION ---------------- */}
            <Evaluation />

            {/* ---------------- HOW IT WORKS ---------------- */}
            <section className="how-it-works">
                <div className="section-heading reveal">
                    <h2>How It Works</h2>
                    <p>Simple steps to transform your career</p>
                </div>

                <div className="how-it-works__steps">
                    <Step number="1" title="Upload Resume" text="Upload your resume in PDF format securely." />
                    <Step number="2" title="AI Analysis" text="Our AI analyzes your resume, ATS score, and skills match." />
                    <Step number="3" title="Get Insights" text="Receive actionable feedback and improvement tips." />
                    <Step number="4" title="Prepare & Succeed" text="Practice with tailored questions and get hired." />
                </div>
            </section>

            {/* ---------------- TESTIMONIALS ---------------- */}
            <section className="testimonials">
                <div className="section-heading reveal">
                    <h2>Loved by Job Seekers</h2>
                </div>

                <div className="testimonials__grid">
                    <Testimonial
                        quote="Resume Doctor helped me improve my resume and land interviews at top tech companies."
                        name="Arjun Mehta"
                        role="Software Engineer"
                    />
                    <Testimonial
                        quote="The interview questions and AI feedback were game-changers. Highly recommended!"
                        name="Priya Sharma"
                        role="Product Manager"
                    />
                    <Testimonial
                        quote="My ATS score went from 45 to 92! Amazing platform."
                        name="Rohit Verma"
                        role="Data Analyst"
                    />
                </div>
            </section>

            {/* ---------------- Benefits ---------------- */}
            <section className="benefits">
            <div className="section-heading reveal">
                <h2>Everything You Need to Get Hired</h2>
                <p>
                More than a resume checker—an AI career assistant that prepares you for
                every stage of the hiring process.
                </p>
            </div>

            <div className="benefits__grid">
                {BENEFITS.map((item) => (
                <div className="benefit-card reveal" key={item.title}>
                    <div className="benefit-card__icon">{item.icon}</div>

                    <h3>{item.title}</h3>

                    <h4>{item.subtitle}</h4>

                    <p>{item.description}</p>

                    <Link to={item.link}>
                        <button className="btn btn--primary">
                        {item.button}
                        </button>
                    </Link>
                </div>
                ))}
            </div>
            </section>

            {/* ---------------- FAQ ---------------- */}
            <Faq />
        </div>
    );
}

function FeatureCard({ icon, title, text }) {
    return (
        <div className="feature-card reveal">
            <div className="feature-card__icon">{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

function Step({ number, title, text }) {
    return (
        <div className="step reveal">
            <div className="step__number">{number}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

function Testimonial({ quote, name, role }) {
    return (
        <div className="testimonial-card reveal">
            <p className="testimonial-card__quote">"{quote}"</p>
            <div className="testimonial-card__author">
                <span className="testimonial-card__avatar" />
                <div>
                    <strong>{name}</strong>
                    <span>{role}</span>
                </div>
            </div>
        </div>
    );
}
