import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

const Contact = () => {
    return (
        <div className="start-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
            <div className="content-card">
                <h1>Contact Us</h1>
                <p>
                    We value your feedback and are here to help you with any questions you may have about our US Citizenship Test Practice tool.
                </p>

                <div className="disclaimer" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                    <h3>Support & Feedback</h3>
                    <p>
                        For technical support, reporting bugs, or providing feedback to improve our study materials, please reach out to us via email.
                    </p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                        Email: <a href="mailto:mycivics.contact@gmail.com" style={{ color: 'var(--accent-color)' }}>mycivics.contact@gmail.com</a>
                    </p>
                </div>

                <h2>Response Time</h2>
                <p>
                    We strive to respond to all inquiries within 24-48 hours. Please include a clear subject line so we can assist you more efficiently.
                </p>

                <h2>Our Mission</h2>
                <p>
                    Our mission is to provide free, high-quality study resources to help future U.S. citizens prepare for their naturalization interview and civics test.
                    Your input helps us keep our questions updated and accurate according to official USCIS standards.
                </p>

                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" className="mode-card-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
