import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import StartPage from './components/StartPage.jsx'
import About from './components/About.jsx'
import QuizPage from './components/QuizPage.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  const [quizDataEn, setQuizDataEn] = useState(null)
  const [quizDataEs, setQuizDataEs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load both language files at once
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch('/quiz-data.json').then(res => res.json()),
      fetch('/quiz-data-es.json').then(res => res.json())
    ])
      .then(([en, es]) => {
        setQuizDataEn(en)
        setQuizDataEs(es)
        setLoading(false)
      })
      .catch(() => {
        setError('Error loading quiz data')
        setLoading(false)
      })
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

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <StartPage
                  totalQuestions={(quizDataEn && quizDataEn.questions.length) || 0}
                />
              }
            />
            <Route
              path="/quiz"
              element={
                <QuizPage
                  quizDataEn={quizDataEn}
                  quizDataEs={quizDataEs}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
