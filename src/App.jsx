import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Test from './components/Test.jsx'
import StartPage from './components/StartPage.jsx'
import About from './components/About.jsx'

const EXAM_QUESTION_COUNT = 20
const EXAM_PASS_THRESHOLD = 12
const EXAM_NO_OPTIONS_QUESTION_COUNT = 20
const QUICK_QUESTION_COUNT = 10

function shuffleArray(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function App() {
  const [rawQuizDataEn, setRawQuizDataEn] = useState(null)
  const [rawQuizDataEs, setRawQuizDataEs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)
  const [showAbout, setShowAbout] = useState(false)

  // Load both language files at once
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch('/quiz-data.json').then(res => res.json()),
      fetch('/quiz-data-es.json').then(res => res.json())
    ])
      .then(([en, es]) => {
        setRawQuizDataEn(en)
        setRawQuizDataEs(es)
        setLoading(false)
      })
      .catch(() => {
        setError('Error loading quiz data')
        setLoading(false)
      })
  }, [])

  // Handler that now takes both mode and language
  const handleSelectMode = (mode, lang) => {
    setSelectedMode(mode)
    setSelectedLanguage(lang)
    setSessionKey(k => k + 1)
  }

  let rawQuizData = selectedLanguage === 'es' ? rawQuizDataEs : rawQuizDataEn

  const quizDataForMode = useMemo(() => {
    if (!rawQuizData || !selectedMode) return null
    const all = rawQuizData.questions
    const shuffled = shuffleArray(all)
    let questions
    if (selectedMode === 'study') {
      questions = shuffled
    } else if (selectedMode === 'exam') {
      questions = shuffled.slice(0, Math.min(EXAM_QUESTION_COUNT, shuffled.length))
    } else if (selectedMode === 'real_no_options') {
      questions = shuffled.slice(0, Math.min(EXAM_NO_OPTIONS_QUESTION_COUNT, shuffled.length))
    } else {
      questions = shuffled.slice(0, Math.min(QUICK_QUESTION_COUNT, shuffled.length))
    }
    return { ...rawQuizData, questions }
  }, [rawQuizData, selectedMode, sessionKey])

  const passThreshold = selectedMode === 'exam' ? EXAM_PASS_THRESHOLD : undefined

  if (loading) {
    return (
      <div className="app-loading">
        <p>Loading questionnaire...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-error">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!rawQuizDataEn?.questions?.length && !rawQuizDataEs?.questions?.length) {
    return (
      <div className="app-empty">
        <p>No questions available in this questionnaire.</p>
      </div>
    )
  }

  if (showAbout) {
    return (
      <div className="app">
        <About onBackToStart={() => setShowAbout(false)} />
      </div>
    )
  }

  if (!selectedMode || !selectedLanguage) {
    return (
      <div className="app">
        <StartPage
          totalQuestions={(rawQuizDataEn && rawQuizDataEn.questions.length) || 0}
          onSelectMode={handleSelectMode}
          onShowAbout={() => setShowAbout(true)}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <Test
        key={sessionKey}
        mode={selectedMode}
        quizData={quizDataForMode}
        passThreshold={passThreshold}
        onBackToStart={() => { setSelectedMode(null); setSelectedLanguage(null) }}
        onRestart={() => setSessionKey((k) => k + 1)}
      />
    </div>
  )
}

export default App
