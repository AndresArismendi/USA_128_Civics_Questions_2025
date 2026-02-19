import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './StartPage.css';


const MODES = {
  quick: {
    id: 'quick',
    cardClass: 'level-1',
    icon: '⚡', // Lightning bolt
    title: 'Level 1:\nThe 2-Minute Drill',
    subtitle: 'Algorithm: Foundation',
    description: 'Short practice session with 10 randomized evaluation for fast retest. No pass/fail limit.',
    buttonLabel: 'Start Practice →',
  },
  study: {
    id: 'study',
    cardClass: 'level-2',
    icon: '📖', // Open book
    title: 'Level 2: The Gauntlet',
    subtitle: 'Module: Full Deck Mastery',
    description: '65% Mastered', // Placeholder for progress if available, else static text from image
    buttonLabel: 'Begin Challenge →',
  },
  exam: {
    id: 'exam',
    cardClass: 'final-boss',
    icon: '👑', // Crown
    title: 'The Final Boss',
    subtitle: 'Assessment: Official Simulation',
    description: '20 Qs',
    buttonLabel: 'Take Exam →',
  },
  real_no_options: {
    id: 'real_no_options',
    cardClass: 'bonus-round',
    icon: '💀', // Skull
    title: 'Bonus Round:\nGhost Mode',
    subtitle: 'Hardcore: No Assistance',
    description: '',
    buttonLabel: 'Attempt Hard →',
    badge: 'HARD',
  },
  audio: {
    id: 'audio',
    cardClass: 'level-2',
    icon: '🎧', // Headphones
    title: 'Audio Mode',
    subtitle: 'Listen and Learn',
    description: 'Full Deck Audio Experience',
    buttonLabel: 'Start Listening →',
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
        <h2 style={{ textAlign: "center", margin: "2rem 0", color: "#fff" }}>
          Choose Language / Elige idioma
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <button
            className="mode-card-btn"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff" }}
            onClick={() => handleModeSelect(pendingMode, 'en')}
          >
            <img src="/usa-flag.png" alt="USA Flag" style={{ width: "30px", height: "auto", color: "#fff" }} />
            English
          </button>
          <button
            className="mode-card-btn"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff" }}
            onClick={() => handleModeSelect(pendingMode, 'es')}
          >
            <img src="/spain-flag.png" alt="Spain Flag" style={{ width: "30px", height: "auto", color: "#fff" }} />
            Español
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="about-link-btn"
            onClick={() => setPendingMode(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // --- Mode cards render ---
  return (
    <div className="start-page">
      <h1 className="start-page-title">Choose Your Study Mode</h1>

      {/* Skill Progression section - per image, if feasible later, skipping for now to focus on cards */}
      <div className="skill-progression-placeholder"></div>

      <div className="mode-cards">
        {/* Level 1: Quick */}
        <div className={`mode-card ${MODES.quick.cardClass}`}>
          <div className="mode-card-body">
            <div className="mode-card-icon" aria-hidden="true">{MODES.quick.icon}</div>
            <h2 className="mode-card-title">{MODES.quick.title}</h2>
            <p className="mode-card-subtitle">{MODES.quick.subtitle}</p>
            <p className="mode-card-desc">{MODES.quick.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => setPendingMode('quick')}>
              {MODES.quick.buttonLabel}
            </button>
          </div>
        </div>

        {/* Level 2: Study */}
        <div className={`mode-card ${MODES.study.cardClass}`}>
          <div className="mode-card-body">
            <div className="mode-card-icon" aria-hidden="true">{MODES.study.icon}</div>
            <h2 className="mode-card-title">{MODES.study.title}</h2>
            <p className="mode-card-subtitle">{MODES.study.subtitle}</p>
            {/* Progress bar placeholder */}
            <div className="progress-container">
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '65%' }}></div></div>
              <p className="progress-text">{MODES.study.description}</p>
            </div>
            <button type="button" className="mode-card-btn" onClick={() => setPendingMode('study')}>
              {MODES.study.buttonLabel}
            </button>
          </div>
        </div>

        {/* Final Boss: Exam */}
        <div className={`mode-card ${MODES.exam.cardClass}`}>
          <div className="castle-header-decoration"></div> {/* Specific decoration if needed in CSS */}
          <div className="mode-card-body">
            <div className="hearts-container">❤️❤️❤️</div>
            <div className="mode-card-icon" aria-hidden="true">{MODES.exam.icon}</div>
            <h2 className="mode-card-title">{MODES.exam.title}</h2>
            <p className="mode-card-subtitle">{MODES.exam.subtitle}</p>
            <p className="mode-card-desc">{MODES.exam.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => setPendingMode('exam')}>
              {MODES.exam.buttonLabel}
            </button>
          </div>
        </div>

        {/* Bonus Round */}
        <div className={`mode-card ${MODES.real_no_options.cardClass}`}>
          <div className="mode-badge-container">
            <span className="mode-badge">{MODES.real_no_options.badge}</span>
          </div>
          <div className="mode-card-body">
            <div className="mode-card-icon" aria-hidden="true">{MODES.real_no_options.icon}</div>
            <h2 className="mode-card-title">{MODES.real_no_options.title}</h2>
            <p className="mode-card-subtitle">{MODES.real_no_options.subtitle}</p>
            <button type="button" className="mode-card-btn" onClick={() => setPendingMode('real_no_options')}>
              {MODES.real_no_options.buttonLabel}
            </button>
          </div>
        </div>

        {/* Audio Mode */}
        <div className={`mode-card ${MODES.audio.cardClass}`}>
          <div className="mode-card-body">
            <div className="mode-card-icon" aria-hidden="true">{MODES.audio.icon}</div>
            <h2 className="mode-card-title">{MODES.audio.title}</h2>
            <p className="mode-card-subtitle">{MODES.audio.subtitle}</p>
            <p className="mode-card-desc">{MODES.audio.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => setPendingMode('audio')}>
              {MODES.audio.buttonLabel}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default StartPage;
