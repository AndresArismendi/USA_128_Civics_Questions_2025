import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="global-footer">
            <div className="footer-content">
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
