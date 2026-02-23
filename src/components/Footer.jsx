import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="global-footer">
            <div className="footer-content">
                <nav className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                </nav>
                <p className="disclaimer-text">
                    <strong>Disclaimer:</strong> This website is an unofficial study tool for the USCIS Civics Test.
                    It is not affiliated with, endorsed by, or connected to the USCIS or any other government agency.
                </p>
                <p className="copyright-text">
                    &copy; {new Date().getFullYear()} US Citizenship Test Practice. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
