

const resume = `
AMAN RAJ

Aspiring Software Engineer | Full Stack Developer

Location:
Bengaluru, Karnataka, India - 562157

Email:
aman01122raj@gmail.com

Phone:
+91 7070518943

LinkedIn:
https://linkedin.com/in/amanraj4483

GitHub:
https://github.com/aman12-10-12

Professional Summary

Final year Computer Science engineer with practical experience in full stack development and cloud native deployment. Proficient in JavaScript, React, Node.js, REST APIs, MongoDB, and MySQL. Experienced with Docker, Kubernetes, and AWS (EC2, ECS, ECR, IAM, ALB, SES) for containerized microservices. Skilled in JWT-secured APIs, WebSocket systems, CI/CD pipelines, and the full Software Development Life Cycle (SDLC), including design, development, integration testing, QA, and production support.

Technical Skills

Languages:
Java (Basics), JavaScript, Python, SQL, C++

Frontend:
React.js, HTML5, CSS3, Tailwind CSS, Vite, Monaco Editor

Backend & APIs:
Node.js, Express.js, REST APIs, JWT, Socket.IO, WebSockets, Microservices

Databases:
MySQL, MongoDB, Query Optimization, NoSQL Schema Design, Compound Indexing

Cloud & DevOps:
AWS (EC2, ECS, ECR, IAM, ALB, VPC, SES), Docker, Kubernetes, Nginx, GitHub Actions, CI/CD, Linux OS

Security:
JWT, Bcrypt, Cloudflare SSL, HTTPS, IAM Roles, Security Groups

Data & Machine Learning:
Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Power BI, Exploratory Data Analysis (EDA), Feature Engineering

Core Computer Science:
Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Agile/Scrum

Soft Skills:
Analytical Thinking, Problem Solving, Written and Verbal Communication, Logical Reasoning, Leadership, Data Storytelling, Adaptability, Debugging Mindset

Projects

1. CoDuo – Developer Matching Platform
Technologies: Node.js, Express.js, React.js, MongoDB, JWT, Socket.IO, AWS EC2, Amazon SES

- Built and deployed a production-grade REST API with profile management, feed pagination, and matchmaking.
- Achieved sub-100ms latency under concurrent load on AWS EC2.
- Implemented stateless JWT authentication with Bcrypt hashing.
- Optimized MongoDB schemas using compound indexing and projection.
- Engineered real-time chat using Socket.IO and WebSockets.
- Deployed using Nginx, Cloudflare SSL, and AWS EC2.
- Wrote Jest unit and integration tests.

2. Collaborative Code Editor
Technologies: React, Node.js, Socket.IO, Yjs CRDTs, Docker, AWS ECS, ECR, IAM, ALB

- Built a real-time collaborative code editor using Yjs CRDTs and Monaco Editor.
- Implemented WebSocket synchronization with Socket.IO.
- Added active user tracking, username-based sessions, and automatic reconnection.
- Containerized with Docker.
- Deployed on AWS ECS using ECR, IAM Task Execution Roles, VPC, Security Groups, and Application Load Balancer.

3. Vehicle Sales Analytics
Technologies: Python, Pandas, Scikit-learn, Matplotlib, Seaborn, Power BI, MySQL, Excel

- Processed over 558,000 vehicle auction records using SQL and Python.
- Performed data cleaning, feature engineering, and exploratory data analysis.
- Built Linear Regression and Random Forest models for used vehicle price prediction.
- Developed Power BI dashboards and visualizations for sales performance and market analysis.

Education

Bachelor of Engineering in Computer Science
Sir M. Visvesvaraya Institute of Technology
December 2022 – June 2026

CGPA:
8.30 / 10

Achievements & Leadership

- Two-time winner of the Annual College Cricket Tournament, leading an 11-member team.
- Led Publicity & Outreach for Kalanjali Cultural Fest, managing 15 volunteers and increasing event footfall by 30%.
- Volunteer at Aero Show 2023, coordinating logistics for over 5,000 attendees.
`;

const selfDescription = `
I am a final-year Computer Science student passionate about building scalable full-stack applications and solving real-world problems. I enjoy developing production-ready software using React, Node.js, Express.js, MongoDB, and MySQL.
I have hands-on experience building secure REST APIs, real-time applications using Socket.IO, collaborative systems with CRDTs, and deploying cloud-native applications on AWS using Docker, Kubernetes, ECS, EC2, ECR, IAM, ALB, and Nginx.
I enjoy learning new technologies, writing clean and maintainable code, optimizing application performance, and following software engineering best practices. I am particularly interested in backend engineering, distributed systems, cloud technologies, and system design.
I work well in teams, communicate effectively, and enjoy taking ownership of features from design through deployment. I am looking for a Software Engineer or Full Stack Developer role where I can contribute to building high-quality products while continuously improving my technical skills.
`;

const jobDescription = `
NTT DATA strives to hire exceptional, innovative and passionate individuals who want to grow with us. If you want to be part of an inclusive, adaptable, and forward-thinking organization, apply now.
We are currently seeking a Full Stack Developer to join our team in Bengaluru, Karnataka (IN-KA), India (IN).

In these roles you will be responsible for:
- Design, develop, test, and maintain end-to-end application features across frontend and backend.
- Build responsive, reusable, and high-performance user interfaces using React.js, CSS, and JavaScript.
- Integrate applications with relational databases using MySQL, Entgo (ORM), and GraphQL.
- Design and implement GraphQL APIs including schema definitions and resolvers (good to have).
- Model complex data relationships and optimize queries for performance and scalability.
- Write clean, maintainable, and well-tested code following engineering best practices.
- Participate in code reviews and contribute to improving code quality and system design.
- Troubleshoot, debug, and resolve issues across development, testing, and production environments.
- Collaborate with product managers, architects, and QA teams.
- Take ownership of assigned modules or services from design through deployment and support.
- Mentor junior developers and contribute to knowledge sharing within the team.

Requirements for this role include:

- Strong proficiency in React.js, including hooks, component design, and state management.
- Solid experience with HTML5, JavaScript, and CSS3.
- Experience designing and implementing GraphQL APIs (good to have).
- Proficient in relational database design and optimization using MySQL.
- Experience with graph databases (good to have).
- Experience using Entgo or any other ORM (good to have).
- Good understanding of API security, performance optimization, and scalability.
- Experience with version control systems such as Git and collaborative development workflows.
- Strong analytical and problem-solving abilities.
- Strong communication skills to collaborate effectively with team members.
- Ability to work independently with a proactive approach and take ownership of deliverables.
`;

module.exports = {
    resume, selfDescription, jobDescription
}

// async function listModels() {
//   const models = await ai.models.list();

//   for await (const model of models) {
//     console.log(model.name);
//   }
// }

// module.exports = listModels


// async function invokeGeminiAi() {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-flash-latest",
//       contents: "Hello Gemini! Explain what an interview is.",
//     });

//     console.log(response.text);
//   } catch (err) {
//     console.error(err);
//   }
// }


// module.exports = invokeGeminiAi