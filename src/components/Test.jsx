import { useState } from 'react'
import './Test.css'

const Test = ({ quizData }) => {
  const { title = 'Civics Questionnaire', subtitle, questions } = quizData
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const questionNumber = currentQuestionIndex + 1

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
    return (
      <div className="quiz-container">
        <h1>{title}</h1>
        {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
        <h2 className="question results">Questionnaire Complete</h2>
        <div className="feedback results">
          Your score: <strong>{score} out of {questions.length}</strong> correct.
        </div>
        <button type="button" className="next-btn" onClick={handleRestart}>
          Start Over
        </button>
      </div>
    )
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer
  const feedbackClass = selectedAnswer !== null
    ? (isCorrect ? 'feedback correct-feedback' : 'feedback incorrect-feedback')
    : 'feedback'

  return (
    <div className="quiz-container">
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
