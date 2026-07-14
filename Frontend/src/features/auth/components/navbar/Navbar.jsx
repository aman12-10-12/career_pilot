import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.scss";


const NAV_LINKS = [
    { label: "Homepage", to: "/" },
    { label: "Info", to: "/info" },
    { label: "About", to: "/about-us" },
    { label: "Upload Resume", to: "/upload"}
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // useAuth exposes handleLogout (not `logout`), and doesn't rethrow on
    // failure - it just logs and resolves either way, so there's nothing
    // to catch here.
    const { user, handleLogout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onLogoutClick = async () => {
        setIsMenuOpen(false);
        await handleLogout();
    };

    return (
        <header className="navbar">
            {/* ---------------- START: hamburger + dropdown ---------------- */}
            <div className="navbar__start" ref={menuRef}>
                <button
                    type="button"
                    className="navbar__icon-btn"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>

                <ul className={`navbar__dropdown ${isMenuOpen ? "navbar__dropdown--open" : ""}`}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link to={link.to} onClick={() => setIsMenuOpen(false)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ---------------- CENTER: brand ---------------- */}
            <div className="navbar__center">
                <Link to="/" className="navbar__brand">
                    Resume Doctor
                </Link>
            </div>

            {/* ---------------- END: auth buttons ---------------- */}
            <div className="navbar__end">
                {user ? (
                    <button type="button" className="navbar__btn navbar__btn--ghost" onClick={onLogoutClick}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="navbar__btn navbar__btn--ghost">
                            Login
                        </Link>
                        <Link to="/register" className="navbar__btn navbar__btn--primary">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
