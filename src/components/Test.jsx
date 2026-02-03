import { useState } from 'react'
import './Test.css'

const Test = ({ quizData, passThreshold, onBackToStart, onRestart }) => {
  const { title = 'Civics Questionnaire', subtitle, questions } = quizData
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const questionNumber = currentQuestionIndex + 1
  const progressPercent = showResults
    ? 100
    : ((currentQuestionIndex + 1) / questions.length) * 100

  const handleOptionClick = (optionText) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(optionText)
    if (optionText === currentQuestion.correctAnswer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestionIndex((i) => i + 1)
      setSelectedAnswer(null)
    }
  }

  const handleRestart = () => {
    onRestart?.()
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResults(false)
  }

  const getOptionClass = (optionText) => {
    if (selectedAnswer === null) return 'option-btn'
    const isCorrectOption = optionText === currentQuestion.correctAnswer
    const isSelected = optionText === selectedAnswer
    if (isCorrectOption) return 'option-btn correct'
    if (isSelected && !isCorrectOption) return 'option-btn incorrect'
    return 'option-btn'
  }

  if (showResults) {
    const passed = passThreshold != null ? score >= passThreshold : null
    return (
      <div className="quiz-container">
        <div className="progress-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar-fill" style={{ width: '100%' }} />
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
        <h2 className="question results">Questionnaire Complete</h2>
        {passed !== null && (
          <p className={`results-verdict ${passed ? 'results-pass' : 'results-fail'}`}>
            {passed ? 'You passed.' : `You did not pass. You need at least ${passThreshold} correct to pass.`}
          </p>
        )}
        <div className="feedback results">
          Your score: <strong>{score} out of {questions.length}</strong> correct.
        </div>
        <div className="results-actions">
          <button type="button" className="next-btn" onClick={handleRestart}>
            Start Over
          </button>
          {onBackToStart && (
            <button type="button" className="next-btn next-btn-secondary" onClick={onBackToStart}>
              Back to menu
            </button>
          )}
        </div>
      </div>
    )
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer
  const feedbackClass = selectedAnswer !== null
    ? (isCorrect ? 'feedback correct-feedback' : 'feedback incorrect-feedback')
    : 'feedback'

  return (
    <div className="quiz-container">
      <div className="progress-bar" role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={0} aria-valuemax={questions.length}>
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <h1>{title}</h1>
      {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
      <p className="question-number">
        Question {questionNumber} of {questions.length}
      </p>
      <h2 className="question">{currentQuestion.question}</h2>
      <ul className="options">
        {currentQuestion.options.map((optionText) => (
          <li key={optionText}>
            <button
              type="button"
              className={getOptionClass(optionText)}
              onClick={() => handleOptionClick(optionText)}
              disabled={selectedAnswer !== null}
            >
              {optionText}
            </button>
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && (
        <>
          <p className={feedbackClass}>
            {currentQuestion.explanation}
          </p>
          <button type="button" className="next-btn" onClick={handleNext}>
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        </>
      )}
    </div>
  )
}

export default Test
