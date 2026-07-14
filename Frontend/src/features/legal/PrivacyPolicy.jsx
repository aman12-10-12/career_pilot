import { Link } from "react-router";
import "./Legal.scss";

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <Link to="/" className="legal-page__back">
                &larr; Back to home
            </Link>

            <header className="legal-page__header">
                <h1>Privacy Policy</h1>
                <p className="legal-page__updated">Last updated: July 15, 2026</p>
            </header>

            <div className="legal-page__card">
                <p className="legal-page__intro">
                    This Privacy Policy explains what information Resume Doctor ("we", "us",
                    "our") collects when you use our resume analysis and interview
                    preparation platform, how we use it, and the choices you have.
                </p>

                <section className="legal-section">
                    <h2>1. Information We Collect</h2>

                    <h3>Account information</h3>
                    <p>
                        When you register, we collect your username, email address, and a
                        securely hashed password. We never store your password in plain text.
                    </p>

                    <h3>Resume and application content</h3>
                    <p>
                        When you use our resume analysis feature, we collect and process:
                    </p>
                    <ul>
                        <li>The resume file you upload (PDF) and the text extracted from it</li>
                        <li>Any job description you paste in for comparison</li>
                        <li>Any self-description you write about yourself</li>
                        <li>
                            Personal details contained within your resume (such as your name
                            and email address), which our system may extract to personalize
                            your report
                        </li>
                    </ul>

                    <h3>Automatically collected information</h3>
                    <p>
                        We use a session cookie to keep you signed in. We do not currently use
                        analytics or advertising cookies — see our{" "}
                        <Link to="/cookie-policy">Cookie Policy</Link> for details.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>To generate your ATS compatibility score, skill-gap analysis, and interview preparation report</li>
                        <li>To authenticate you and keep your account secure</li>
                        <li>To let you retrieve your past reports from your account</li>
                        <li>To improve the accuracy and quality of our AI-generated feedback</li>
                        <li>To communicate with you about your account, if necessary</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>3. AI Processing and Third-Party Services</h2>
                    <p>
                        To generate your resume analysis and interview questions, the text of
                        your resume, job description, and self-description is sent to Google's
                        Gemini AI models for processing. This means this content is
                        transmitted to and processed by Google as our AI service provider,
                        subject to Google's own data handling terms. We do not sell or share
                        this content with any other third party for advertising or marketing
                        purposes.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>4. Data Storage and Retention</h2>
                    <p>
                        Your resume text, job descriptions, self-descriptions, and generated
                        reports are stored in our database and linked to your account. Reports
                        remain accessible in your account until you delete them or delete your
                        account. You may request deletion of your account and all associated
                        data at any time by contacting us using the details below.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Your Rights</h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul>
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your account and associated data</li>
                        <li>Request a copy of your data in a portable format</li>
                        <li>Withdraw consent for processing, where consent is the basis for processing</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>6. Data Security</h2>
                    <p>
                        We use industry-standard measures to protect your data, including
                        password hashing, stateless JWT authentication, and access controls
                        that scope every report to the account that created it. No method of
                        transmission or storage is 100% secure, and we cannot guarantee
                        absolute security.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>7. Children's Privacy</h2>
                    <p>
                        Resume Doctor is not directed at children under 18. We do not
                        knowingly collect personal information from children under 18. If you
                        believe a child has provided us with personal data, please contact us
                        so we can remove it.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will update
                        the "Last updated" date above when we do. Continued use of Resume
                        Doctor after changes take effect constitutes acceptance of the revised
                        policy.
                    </p>
                </section>

                <div className="legal-page__contact">
                    <p>
                        Questions about this policy? Contact us at{" "}
                        <a href="mailto:amanraj01122@gmail.com">amanraj01122@gmail.com</a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
