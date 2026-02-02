import { useState, useEffect } from 'react'
import './App.css'
import Test from './components/Test.jsx'

const QUIZ_DATA_URL = '/quiz-data.json'

function shuffleArray(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function App() {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setQuizData({ ...data, questions: shuffleArray(data.questions) })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

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

  if (!quizData.questions.length) {
    return (
      <div className="app-empty">
        <p>No questions available in this questionnaire.</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Test quizData={quizData} />
    </div>
  )
}

export default App
