import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './StartPage.css';


const MODES = {
  quick: {
    id: 'quick',
    cardClass: 'prof-card',
    icon: '⏳', // Hourglass/Clock
    title: 'Quick Review: Fundamentals',
    subtitle: 'Foundation: Core Concepts',
    description: 'Concise practice session featuring 10 essential questions for efficient proficiency assessment.',
    buttonLabel: 'Initiate Review →',
    group: 'training'
  },
  study: {
    id: 'study',
    cardClass: 'prof-card',
    icon: '📚', // Books
    title: 'Comprehensive Mastery Module',
    subtitle: 'Module: Full Curriculum Mastery',
    description: 'Detailed study of the complete 128-question bank with integrated progress tracking.',
    buttonLabel: 'Begin Module →',
    group: 'training'
  },
  exam: {
    id: 'exam',
    cardClass: 'prof-card',
    icon: '🎖️', // Military Medal/Seal
    title: 'Official Simulation Exam',
    subtitle: 'Assessment: Standardized Simulation',
    description: 'Formal examination mirroring the official USCIS 20-question naturalization format.',
    buttonLabel: 'Start Examination →',
    group: 'training'
  },
  real_no_options: {
    id: 'real_no_options',
    cardClass: 'prof-card',
    icon: '🛡️', // Shield
    title: 'Advanced Assessment (No Aids)',
    subtitle: 'Advanced: Independent Response',
    description: 'High-difficulty assessment without multiple-choice assistance. Manual verification required.',
    buttonLabel: 'Begin Assessment →',
    badge: 'ADVANCED',
    group: 'extra'
  },
  audio: {
    id: 'audio',
    cardClass: 'prof-card',
    icon: '🎧', // Headphones icon for Audio Study Guide
    title: 'Audio Study Guide',
    subtitle: 'Resource: Auditory Learning',
    description: 'Complete curriculum transition to professional audio-guided study sessions.',
    buttonLabel: 'Open Study Guide →',
    group: 'extra'
  },
}

function StartPage({ totalQuestions }) {
  const [pendingMode, setPendingMode] = useState(null);
  const navigate = useNavigate();

  // "Level 2" data: showing "Study All Questions" logic if needed, or just static text. 
  // The image shows "65% Mastered" pointing to a progress bar. 
  // For now I'll use static text or calculate if possible. 
  // StartPage props: { totalQuestions }. It doesn't seem to have progress data.
  // I will use a static placeholder or simple text for now.

  const handleModeSelect = (mode, lang) => {
    navigate('/quiz', { state: { mode, language: lang } });
    setPendingMode(null);
  };

  // --- Language selection overlay ---
  if (pendingMode) {
    return (
      <div className="start-page">
        <div className="language-selection-overlay">
          <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-primary)" }}>
            Choose Language / Elige idioma
          </h2>
          <div className="language-buttons">
            <button
              className="mode-card-btn"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              onClick={() => handleModeSelect(pendingMode, 'en')}
            >
              <img src="/usa-flag.png" alt="USA Flag" style={{ width: "30px", height: "auto" }} />
              English
            </button>
            <button
              className="mode-card-btn"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              onClick={() => handleModeSelect(pendingMode, 'es')}
            >
              <img src="/spain-flag.png" alt="Spain Flag" style={{ width: "30px", height: "auto" }} />
              Español
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              className="about-link-btn"
              onClick={() => setPendingMode(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Mode cards render ---
  return (
    <div className="start-page">
      <h1 className="start-page-title">Naturalization Study & Assessment Portal</h1>

      <div className="portal-section">
        <h2 className="section-title">- Training Levels - </h2>
        <div className="mode-cards">
          {Object.values(MODES).filter(m => m.group === 'training').map(mode => (
            <div key={mode.id} className={`mode-card ${mode.cardClass}`}>
              <div className="mode-card-body">
                <div className="mode-card-icon" aria-hidden="true">{mode.icon}</div>
                <h2 className="mode-card-title">{mode.title}</h2>
                <p className="mode-card-subtitle">{mode.subtitle}</p>

                {mode.id === 'study' ? (
                  <div className="progress-container">
                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '65%' }}></div></div>
                    <p className="progress-text">65% Curriculum Mastery</p>
                  </div>
                ) : (
                  <p className="mode-card-desc">{mode.description}</p>
                )}

                <button type="button" className="mode-card-btn" onClick={() => setPendingMode(mode.id)}>
                  {mode.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="portal-section">
        <h2 className="section-title">- Extra Modes -</h2>
        <div className="mode-cards">
          {Object.values(MODES).filter(m => m.group === 'extra').map(mode => (
            <div key={mode.id} className={`mode-card ${mode.cardClass}`}>
              {mode.badge && (
                <div className="mode-badge-container">
                  <span className="mode-badge">{mode.badge}</span>
                </div>
              )}
              <div className="mode-card-body">
                <div className="mode-card-icon" aria-hidden="true">{mode.icon}</div>
                <h2 className="mode-card-title">{mode.title}</h2>
                <p className="mode-card-subtitle">{mode.subtitle}</p>
                <p className="mode-card-desc">{mode.description}</p>
                <button type="button" className="mode-card-btn" onClick={() => setPendingMode(mode.id)}>
                  {mode.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StartPage;
