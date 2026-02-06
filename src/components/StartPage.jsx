import './StartPage.css'

const MODES = {
  study: {
    id: 'study',
    headerClass: 'card-header study',
    icon: '📖',
    title: 'Study All Questions',
    description: 'Full study mode covering the entire civics question bank. No time limit, no pass/fail—learn at your own pace.',
    buttonLabel: 'Start →',
  },
  exam: {
    id: 'exam',
    headerClass: 'card-header exam',
    icon: '🏛️',
    title: 'Real Test Exam Mode (20 Questions)',
    description: 'Simulated official-style test with 20 randomized questions. You must answer at least 12 correctly to pass.',
    buttonLabel: 'Begin Exam →',
    badge: 'Most Popular',
  },
  quick: {
    id: 'quick',
    headerClass: 'card-header quick',
    icon: '⚡',
    title: 'Quick Practice (10 Questions)',
    description: 'Short practice session with 10 randomized questions for fast review. No pass/fail limit.',
    buttonLabel: 'Go →',
  },
}

function StartPage({ totalQuestions, onSelectMode, onShowAbout }) {
  const studyTitle = totalQuestions != null
    ? `Study All ${totalQuestions} Questions`
    : 'Study All Questions'

  return (
    <div className="start-page">
      <h1 className="start-page-title">Choose Your Study Mode</h1>
      <div className="mode-cards">
        <div className="mode-card">
          <div className={MODES.study.headerClass} />
          <div className="mode-card-body">
            <div className="mode-card-icon" aria-hidden="true">{MODES.study.icon}</div>
            <h2 className="mode-card-title">{studyTitle}</h2>
            <p className="mode-card-desc">{MODES.study.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => onSelectMode('study')}>
              {MODES.study.buttonLabel}
            </button>
          </div>
        </div>

        <div className="mode-card mode-card-popular">
          <div className={MODES.exam.headerClass}>
            <span className="mode-badge">{MODES.exam.badge}</span>
          </div>
          <div className="mode-card-body">
            <div className="mode-card-icon exam" aria-hidden="true">{MODES.exam.icon}</div>
            <h2 className="mode-card-title">{MODES.exam.title}</h2>
            <p className="mode-card-desc">{MODES.exam.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => onSelectMode('exam')}>
              {MODES.exam.buttonLabel}
            </button>
          </div>
        </div>

        <div className="mode-card">
          <div className={MODES.quick.headerClass} />
          <div className="mode-card-body">
            <div className="mode-card-icon quick" aria-hidden="true">{MODES.quick.icon}</div>
            <h2 className="mode-card-title">{MODES.quick.title}</h2>
            <p className="mode-card-desc">{MODES.quick.description}</p>
            <button type="button" className="mode-card-btn" onClick={() => onSelectMode('quick')}>
              {MODES.quick.buttonLabel}
            </button>
          </div>
        </div>
      </div>

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

      {onShowAbout && (
        <div className="about-link-container">
          <button type="button" className="about-link-btn" onClick={onShowAbout}>
            Learn More About the Citizenship Test →
          </button>
        </div>
      )}
    </div>
  )
}

export default StartPage
