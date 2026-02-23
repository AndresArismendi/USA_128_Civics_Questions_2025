import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

const TermsAndConditions = () => {
    return (
        <div className="start-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
            <div className="content-card">
                <h1>Terms and Conditions</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <div className="disclaimer" role="contentinfo" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                    <p>
                        <strong>Disclaimer:</strong> This website is an independent study tool for the USCIS Civics Test.
                        By using this site, you acknowledge that it is not an official government resource and we are not responsible for any inaccuracies.
                    </p>
                </div>

                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
                    If you do not agree with any part of these terms, you must not use this website.
                </p>

                <h2>2. Intellectual Property Rights</h2>
                <p>
                    Unless otherwise stated, US Citizenship Test Practice 2025 and/or its licensors own the intellectual property rights for all material on this website.
                    All intellectual property rights are reserved. You may access this from US Citizenship Test Practice 2025 for your own personal use subjected to restrictions set in these terms and conditions.
                </p>

                <h2>3. Use License</h2>
                <p>
                    Permission is granted to temporarily use the materials (information or software) on US Citizenship Test Practice 2025's website for personal, non-commercial transitory viewing only.
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul>
                    <li>Modify or copy the materials;</li>
                    <li>Use the materials for any commercial purpose, or for any public display;</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
                    <li>Remove any copyright or other proprietary notations from the materials; or</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>

                <h2>4. Disclaimer</h2>
                <p>
                    The materials on our website are provided on an 'as is' basis. US Citizenship Test Practice 2025 makes no warranties, expressed or implied,
                    and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                    fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2>5. Limitations</h2>
                <p>
                    In no event shall US Citizenship Test Practice 2025 or its suppliers be liable for any damages (including, without limitation,
                    damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials
                    on our website, even if we have been notified orally or in writing of the possibility of such damage.
                </p>

                <h2>6. Accuracy of Materials</h2>
                <p>
                    The materials appearing on our website could include technical, typographical, or photographic errors. US Citizenship Test Practice 2025
                    does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials
                    contained on its website at any time without notice.
                </p>

                <h2>7. Links</h2>
                <p>
                    US Citizenship Test Practice 2025 has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
                    The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
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

export default TermsAndConditions;
