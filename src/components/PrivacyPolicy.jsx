import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

const PrivacyPolicy = () => {
    return (
        <div className="start-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <div className="disclaimer" role="contentinfo">
                <p>
                    This website is a study tool for the USCIS 2025 Civics Test and is not an official USCIS site. All questions and answers are based on the publicly available USCIS materials.
                </p>
                <p>
                    We make every effort to provide accurate and up-to-date information, but we cannot guarantee correctness and the official USCIS test may be updated.
                </p>
                <p>
                    This site is for educational purposes only. We do not provide immigration advice. For official information about the U.S. citizenship test, please visit{' '}
                    <a href="https://www.uscis.gov/citizenship" target="_blank" rel="noopener noreferrer">uscis.gov/citizenship</a>.
                </p>
            </div>

            <h2>Introduction</h2>
            <p>
                At US Citizenship Test Practice 2025 ("we", "our", or "us"), we are committed to protecting your privacy.
                This Privacy Policy explains how your information is collected, used, and disclosed by our website.
            </p>

            <h2>Information We Collect</h2>
            <p>
                <strong>Log Files:</strong> Like many other websites, we adhere to a standard procedure of using log files.
                These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses,
                browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                These are not linked to any information that is personally identifiable.
            </p>

            <h2>Cookies and Web Beacons</h2>
            <p>
                Like any other website, we use "cookies". These cookies are used to store information including visitors' preferences,
                and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience
                by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2>Google DoubleClick DART Cookie</h2>
            <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors
                based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of
                DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
            </p>

            <h2>Advertising Partners Privacy Policies</h2>
            <p>
                You may consult this list to find the Privacy Policy for each of the advertising partners of US Citizenship Test Practice 2025.
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective
                advertisements and links that appear on our site, which are sent directly to users' browser. They automatically receive your
                IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or
                to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
                Note that we have no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2>Third Party Privacy Policies</h2>
            <p>
                Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective
                Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions
                about how to opt-out of certain options.
            </p>

            <h2>Children's Information</h2>
            <p>
                We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your
                child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will
                do our best efforts to promptly remove such information from our records.
            </p>

            <h2>Consent</h2>
            <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/" className="mode-card-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
