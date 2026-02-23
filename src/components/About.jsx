import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

function About() {
  return (
    <div className="start-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', textAlign: 'left' }}>
      <div className="content-card">
        <h1>About the U.S. Citizenship and Civics Test</h1>

        <div className="disclaimer" role="contentinfo" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
          <p>
            This <strong>civics test practice</strong> and <strong>US citizenship quiz</strong> follows the official <strong>USCIS</strong> materials for the 2025 naturalization test.
          </p>
        </div>

        <section className="seo-info">
          <p style={{ marginBottom: '1.5rem' }}>
            Free citizenship test practice online: use this tool to prepare for the <strong>naturalization test</strong>. Our <strong>civics test questions multiple choice</strong> and <strong>USCIS civics questions</strong> follow the official <strong>civic test questions 2025</strong> and <strong>128 civics questions practice test</strong> format.
          </p>

          <h2>How many questions are on the citizenship test?</h2>
          <p>
            During the <strong>naturalization</strong> interview, the officer asks up to 20 questions from the official <strong>USCIS</strong> <strong>civics test</strong> bank. The 2025 test uses a bank of 128 questions. You must answer at least 12 correctly to pass the civics portion.
          </p>

          <h2>What is the civics test?</h2>
          <p>
            The <strong>civics test</strong> is part of the U.S. <strong>citizenship test</strong> and <strong>naturalization</strong> interview. It covers American government, history, and integrated civics. <strong>US citizenship test questions</strong> are based on the official <strong>USCIS</strong> materials.
          </p>

          <h2>What happens if you fail the citizenship test?</h2>
          <p>
            If you do not pass the English or <strong>civics test</strong> at your first appointment, <strong>USCIS</strong> will schedule you to retake the portion you failed between 60 and 90 days later.
          </p>

          <h2>How to prepare for US citizenship test?</h2>
          <p>
            Study the official <strong>US citizenship test questions and answers</strong>. Use <strong>civics test practice</strong> and <strong>us civics test questions 2025</strong> multiple-choice quizzes like this one. Review the full <strong>128 civics questions practice test</strong> bank.
          </p>

          <h2>Práctica en español: examen de ciudadanía americana</h2>
          <p>
            <strong>Preguntas examen ciudadanía americana</strong> y <strong>examen de ciudadanía usa preguntas</strong> en un <strong>test de ciudadanía americana</strong> gratis. <strong>Preguntas civismo estados unidos</strong> y <strong>examen naturalización estados unidos</strong> para la <strong>prueba de ciudadanía americana online</strong>.
          </p>
        </section>

        <section className="contact-info" style={{ marginTop: '2rem' }}>
          <h2>Contact</h2>
          <p>
            For any questions or feedback, please contact us at <a href="mailto:mycivics.contact@gmail.com" style={{ color: '#90cdf4' }}>mycivics.contact@gmail.com</a>.
          </p>
        </section>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/" className="mode-card-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
