import './About.css'

function About({ onBackToStart }) {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="about-title">About the U.S. Citizenship and Civics Test</h1>
        {onBackToStart && (
          <button type="button" className="about-back-btn" onClick={onBackToStart}>
            ← Back to Home
          </button>
        )}
      </div>

      <section className="seo-info" id="citizenship-test-info" aria-label="Citizenship test information">
        <p className="seo-info-intro">
          Free citizenship test practice online: use this <strong>civics test practice</strong> and <strong>US citizenship quiz</strong> to prepare for the <strong>naturalization test</strong>. Our <strong>civics test questions multiple choice</strong> and <strong>USCIS civics questions</strong> follow the official <strong>civic test questions 2025</strong> and <strong>128 civics questions practice test</strong> format. <strong>American civics test online</strong> — <strong>practice citizenship test online free</strong>.
        </p>

        <h3 className="seo-info-q">How many questions are on the citizenship test?</h3>
        <p className="seo-info-a">
          During the <strong>naturalization</strong> interview, the officer asks up to 20 questions from the official <strong>USCIS</strong> <strong>civics test</strong> bank. The 2025 test uses a bank of 128 questions. You must answer at least 12 correctly to pass the civics portion. This <strong>citizenship test practice 2025</strong> and <strong>100 civics questions practice test</strong> style quiz helps you get ready.
        </p>

        <h3 className="seo-info-q">What is the civics test?</h3>
        <p className="seo-info-a">
          The <strong>civics test</strong> is part of the U.S. <strong>citizenship test</strong> and <strong>naturalization</strong> interview. It covers American government, history, and integrated civics. <strong>US citizenship test questions</strong> are based on the official <strong>USCIS</strong> materials. This <strong>naturalization test questions</strong> practice and <strong>uscis test practice quiz</strong> mirrors the real <strong>immigration test</strong>.
        </p>

        <h3 className="seo-info-q">What happens if you fail the citizenship test?</h3>
        <p className="seo-info-a">
          If you do not pass the English or <strong>civics test</strong> at your first <strong>naturalization interview practice test</strong> appointment, <strong>USCIS</strong> will schedule you to retake the portion you failed (English or civics) between 60 and 90 days later. Use this <strong>free citizenship test practice online</strong> to improve before your interview.
        </p>

        <h3 className="seo-info-q">How to prepare for US citizenship test?</h3>
        <p className="seo-info-a">
          Study the official <strong>US citizenship test questions and answers</strong>. Use <strong>civics test practice</strong> and <strong>us civics test questions 2025</strong> multiple-choice quizzes like this one. Review the full <strong>128 civics questions practice test</strong> bank and take a <strong>naturalization interview practice test</strong> to be ready for the real <strong>citizenship test</strong>.
        </p>

        <h3 className="seo-info-q">Práctica en español: examen de ciudadanía americana</h3>
        <p className="seo-info-a">
          <strong>Preguntas examen ciudadanía americana</strong> y <strong>examen de ciudadanía usa preguntas</strong> en un <strong>test de ciudadanía americana</strong> gratis. <strong>Preguntas civismo estados unidos</strong> y <strong>examen naturalización estados unidos</strong> para la <strong>prueba de ciudadanía americana online</strong>. <strong>Preguntas examen ciudadanía americana 2025</strong>, <strong>examen de ciudadanía americana en español</strong>, <strong>test de ciudadanía americana gratis</strong>. <strong>Preguntas y respuestas ciudadanía usa</strong> — use este <strong>simulador examen ciudadanía americana</strong> para <strong>práctica examen ciudadanía estados unidos</strong>.
        </p>
      </section>
    </div>
  )
}

export default About
