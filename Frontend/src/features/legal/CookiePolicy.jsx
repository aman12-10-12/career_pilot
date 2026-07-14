import { Link } from "react-router";
import "./Legal.scss";

const CookiePolicy = () => {
    return (
        <div className="legal-page">
            <Link to="/" className="legal-page__back">
                &larr; Back to home
            </Link>

            <header className="legal-page__header">
                <h1>Cookie Policy</h1>
                <p className="legal-page__updated">Last updated: July 15, 2026</p>
            </header>

            <div className="legal-page__card">
                <p className="legal-page__intro">
                    This Cookie Policy explains what cookies Resume Doctor uses and why.
                </p>

                <section className="legal-section">
                    <h2>1. What Are Cookies</h2>
                    <p>
                        Cookies are small text files stored on your device by your browser.
                        They allow a website to recognize your browser across requests, which
                        is what makes it possible to stay signed in as you navigate between
                        pages.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>2. Cookies We Use</h2>

                    <h3>Strictly necessary cookies</h3>
                    <p>
                        We set a single authentication cookie containing a signed session
                        token (JWT) when you log in. This cookie is essential for the service
                        to function — without it, you would be logged out on every page
                        navigation. This cookie:
                    </p>
                    <ul>
                        <li>Is set only when you log in or register</li>
                        <li>Is marked HttpOnly, meaning it cannot be read by JavaScript, which helps protect against cross-site scripting attacks</li>
                        <li>Expires automatically or is cleared when you log out</li>
                    </ul>

                    <h3>Analytics and advertising cookies</h3>
                    <p>
                        We do not currently use analytics or advertising cookies. If this
                        changes, this policy will be updated to disclose the specific
                        providers, the data collected, and how to opt out.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>3. Third-Party Cookies</h2>
                    <p>
                        We do not currently embed third-party services (such as ad networks or
                        analytics dashboards) that would set their own cookies in your browser
                        while using Resume Doctor.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>4. Managing Cookies</h2>
                    <p>
                        Most browsers let you block or delete cookies through their settings.
                        Since our authentication cookie is essential to the service, blocking
                        it will prevent you from staying logged in.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Changes to This Policy</h2>
                    <p>
                        We may update this Cookie Policy as our use of cookies changes. We will
                        update the "Last updated" date above when we do.
                    </p>
                </section>

                <div className="legal-page__contact">
                    <p>
                        Questions about our use of cookies? Contact us at{" "}
                        <a href="mailto:amanraj01122@gmail.com">amanraj01122@gmail.com</a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
