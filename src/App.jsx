import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Test from './components/Test.jsx'
import StartPage from './components/StartPage.jsx'

const QUIZ_DATA_URL = '/quiz-data.json'
const EXAM_QUESTION_COUNT = 20
const EXAM_PASS_THRESHOLD = 12
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
  const [rawQuizData, setRawQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)

  useEffect(() => {
    fetch(QUIZ_DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Unable to load the questionnaire.')
        return res.json()
      })
      .then((data) => {
        if (!data.questions || !Array.isArray(data.questions)) {
          throw new Error('Invalid questionnaire format. Expected a "questions" array.')
        }
        setRawQuizData(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const quizDataForMode = useMemo(() => {
    if (!rawQuizData || !selectedMode) return null
    const all = rawQuizData.questions
    const shuffled = shuffleArray(all)
    let questions
    if (selectedMode === 'study') {
      questions = shuffled
    } else if (selectedMode === 'exam') {
      questions = shuffled.slice(0, Math.min(EXAM_QUESTION_COUNT, shuffled.length))
    } else {
      questions = shuffled.slice(0, Math.min(QUICK_QUESTION_COUNT, shuffled.length))
    }
    return { ...rawQuizData, questions }
  }, [rawQuizData, selectedMode])

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

  if (!rawQuizData?.questions?.length) {
    return (
      <div className="app-empty">
        <p>No questions available in this questionnaire.</p>
      </div>
    )
  }

  if (!selectedMode) {
    return (
      <div className="app">
        <StartPage
          totalQuestions={rawQuizData.questions.length}
          onSelectMode={setSelectedMode}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <Test
        key={sessionKey}
        quizData={quizDataForMode}
        passThreshold={passThreshold}
        onBackToStart={() => setSelectedMode(null)}
        onRestart={() => setSessionKey((k) => k + 1)}
      />
    </div>
  )
}

export default App
