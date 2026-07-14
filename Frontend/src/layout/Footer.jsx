import { Link } from "react-router";
import "./Footer.scss";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Brand Section */}
        <div className="footer__section footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">📄</span>
            <span className="footer__logo-text">Resume Doctor</span>
          </div>
          <p className="footer__tagline">
            Optimize your resume. Prepare for interviews. Get hired.
          </p>
          <div className="footer__socials">
            <a href="https://github.com/aman12-10-12" className="footer__social-link" aria-label="Github">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/amanraj4483/" className="footer__social-link" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com/Aman__samrat" className="footer__social-link" aria-label="Twitter">
              <FaXTwitter size={20} />
            </a>
            <a href="mailto:amanpersonaluse1@gmail.com" className="footer__social-link" aria-label="Email">
              <MdEmail size={20} />
            </a>
            <a href="https://www.instagram.com/aman___samrat" className="footer__social-link" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Product Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">Product</h3>
          <ul className="footer__links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/upload">Upload your resume</a>
            </li>
            <li>
              <a href="/info">How It Works</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">Resources</h3>
          <ul className="footer__links">
            <li>
              <a href="https://github.com/aman12-10-12/career_pilot">Blog</a>
            </li>
            <li>
              <a href="https://github.com/aman12-10-12/career_pilot">Documentation</a>
            </li>
            <li>
              <a href="https://github.com/aman12-10-12/career_pilot">Support</a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">Legal</h3>
          <ul className="footer__links">
            <li>
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li>
              <Link to={"/terms-of-service"}>Terms of Service</Link>
            </li>
            <li>
              <Link to={"/cookie-policy"}>Cookie Policy</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="footer__divider"></div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {currentYear} Resume Doctor. All rights reserved.
        </p>
        <p className="footer__made-with">
          Made with <span className="footer__heart">❤️</span> for job seekers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
