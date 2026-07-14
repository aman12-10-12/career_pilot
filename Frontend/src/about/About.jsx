import "./About.scss";
import profile from "../../assets/profile.jpeg"

const technologies = [
  "React",
  "SCSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "JWT",
  "Redux Toolkit",
  "Gemini AI",
  "Puppeteer",
  "PDF Parsing",
  "Axios",
  "Cloudinary",
  "Multer",
];

const useCases = [
  "Analyze resumes using AI.",
  "Identify missing technical and soft skills.",
  "Generate personalized interview questions.",
  "Create a preparation roadmap.",
  "Download detailed AI reports as PDF.",
  "Track previous resume analyses.",
];

const About = () => {
  return (
    <div className="about-page">

      <div className="hero-card">
        <h1>
          About Us?
        </h1>

        <h3>
          There is no <span>"Us"</span>. It's just me, my laptop,
          Stack Overflow, countless cups of coffee, and several questionable
          life choices.
        </h3>
      </div>

      <div className="developer-card">

        <div className="left">

          <img
            src={profile}
            alt="Developer"
          />

        </div>

        <div className="right">

          <h2>Aman Raj</h2>

          <p>
            Hi 👋 I'm the developer behind this project.
            I built this AI powered Resume Analyzer to help
            students and job seekers understand how well
            their resume matches a job description and what
            they should improve before appearing in interviews.
          </p>

          <div className="contact">

            <div>
              📧
              <a href="mailto:amanpersonaluse1@gmail.com">
                amanraj@gmail.com
              </a>
            </div>

            <div>
              💼
              <a
                href="https://www.linkedin.com/in/amanraj4483/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>

            <div>
              💻
              <a
                href="https://github.com/aman12-10-12"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>

          </div>

        </div>

      </div>

      <div className="glass-card">

        <h2>Why I Built This</h2>

        <p>
          Preparing for interviews can be overwhelming.
          Many candidates submit resumes without knowing
          whether they align with the job requirements.
          This project uses AI to analyze resumes,
          compare them against job descriptions,
          identify missing skills, generate interview
          questions, provide preparation roadmaps,
          and even export professional PDF reports.
        </p>

      </div>

      <div className="glass-card">

        <h2>Use Cases</h2>

        <ul>

          {useCases.map((item) => (
            <li key={item}>
              ✅ {item}
            </li>
          ))}

        </ul>

      </div>

      <div className="glass-card">

        <h2>Tools & Technologies</h2>

        <div className="tech-grid">

          {technologies.map((tech) => (
            <span key={tech}>
              {tech}
            </span>
          ))}

        </div>

      </div>

      <div className="glass-card ending">

        <h2>Final Note ❤️</h2>

        <p>
          This project started as an idea to make interview
          preparation smarter using AI. Every feature from
          resume parsing and skill gap analysis to interview
          questions, preparation roadmaps, and downloadable
          reports was designed and developed by me.

          <br />
          <br />

          Thanks for checking it out. If you have suggestions,
          feedback, or just want to connect, feel free to reach
          out. I'm always open to learning, improving, and
          building something even better.
        </p>

      </div>

    </div>
  );
};

export default About;