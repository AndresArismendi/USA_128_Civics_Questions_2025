import { useState, useMemo, useEffect, useRef } from 'react'
import speechService from '../services/SpeechService'
import './Test.css'

function shuffleOptions(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const Test = ({ quizData, passThreshold, onBackToStart, onRestart, mode }) => {
  const { title = 'Civics Questionnaire', subtitle, questions } = quizData
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false) // New state for Real Mode
  const [showResults, setShowResults] = useState(false)
  const [showAdBreak, setShowAdBreak] = useState(false)
  const [adCountdown, setAdCountdown] = useState(0)
  const [pendingAction, setPendingAction] = useState(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(mode === 'audio')
  const audioTimeoutRef = useRef(null)

  const currentQuestion = questions[currentQuestionIndex]
  const optionsInRandomOrder = useMemo(
    () => shuffleOptions(currentQuestion.options),
    [currentQuestion]
  )
  const isRealMode = mode === 'real_no_options'
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

  const shouldShowAd = questionNumber % 10 === 0 || isLastQuestion

  const handleNext = () => {
    if (shouldShowAd) {
      setPendingAction(isLastQuestion ? 'showResults' : 'nextQuestion')
      setShowAdBreak(true)
      setAdCountdown(3)
    } else {
      if (isLastQuestion) {
        setShowResults(true)
      } else {
        setCurrentQuestionIndex((i) => i + 1)
        setSelectedAnswer(null)
      }
    }
  }

  // Reset showAnswer state when question changes
  useEffect(() => {
    setShowAnswer(false)
  }, [currentQuestionIndex])

  useEffect(() => {
    if (!showAdBreak || adCountdown <= 0) return
    const id = setInterval(() => setAdCountdown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [showAdBreak, adCountdown])

  useEffect(() => {
    if (!showAdBreak) return
    const t = setTimeout(() => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (e) {
        // AdSense not loaded or not configured
      }
    }, 100)
    return () => clearTimeout(t)
  }, [showAdBreak])

  // Audio Mode Logic
  useEffect(() => {
    // Clear any pending audio timeout when question changes or audio is toggled
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current)
    }
    speechService.stop()

    if (isAudioEnabled && !showResults && !showAdBreak) {
      let isCancelled = false

      const check = () => {
        if (isCancelled) throw new Error('cancelled')
      }

      const speak = (text) => new Promise((resolve) => {
        check()
        speechService.speak(text, resolve)
      })

      const wait = (ms) => new Promise((resolve) => {
        check()
        audioTimeoutRef.current = setTimeout(resolve, ms)
      })

      const playSequence = async () => {
        try {
          // Play sequence twice
          for (let i = 0; i < 2; i++) {
            // Speak Question
            await speak(currentQuestion.question)
            check()

            // Wait 2 seconds (or maybe slightly less between Q and A? sticking to 2s per prompt implication "After read the answer wait 2 seconds..."). 
            // Logic: Question -> 2s -> Answer.
            await wait(2000)
            check()

            // Speak Answer
            await speak(`The answer is: ${currentQuestion.correctAnswer}`)
            check()

            // If this was the first iteration, wait a bit before repeating
            if (i === 0) {
              await wait(1000)
            }
          }

          // After full sequence (twice), wait 2 seconds before next
          await wait(2000)
          check()

          handleNext()
        } catch (e) {
          // Cancelled, ignore
        }
      }

      playSequence()

      return () => {
        isCancelled = true
        if (audioTimeoutRef.current) {
          clearTimeout(audioTimeoutRef.current)
        }
        speechService.stop()
      }
    }
  }, [currentQuestionIndex, isAudioEnabled, showResults, showAdBreak, currentQuestion])

  const handleAdNext = () => {
    const action = pendingAction
    setShowAdBreak(false)
    setPendingAction(null)
    if (action === 'showResults') {
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
    setShowAnswer(false)
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

  if (showAdBreak) {
    return (
      <div className="quiz-container">
        <div className="progress-bar" role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={0} aria-valuemax={questions.length}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
        <div id="quiz-ad" className="quiz-ad">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5927169678303290"
            data-ad-slot="7586582915"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
        <p className="ad-countdown" aria-live="polite">
          {adCountdown > 0 ? `Continue in ${adCountdown} second${adCountdown !== 1 ? 's' : ''}...` : 'Click Next to continue.'}
        </p>
        <button
          type="button"
          className="next-btn"
          onClick={handleAdNext}
          disabled={adCountdown > 0}
        >
          Next
        </button>
      </div>
    )
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
          {mode !== 'real_no_options' ? (
            <span>Your score: <strong>{score} out of {questions.length}</strong> correct.</span>
          ) : (
            <span>Exam completed.</span>
          )}
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
    <div className={`quiz-container ${mode}`}>
      <div className="progress-bar" role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={0} aria-valuemax={questions.length}>
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="audio-toggle-container">
        <button
          type="button"
          className={`audio-toggle-btn ${isAudioEnabled ? 'active' : ''}`}
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
        >
          {isAudioEnabled ? '🔊 Audio Mode: ON' : '🔈 Audio Mode: OFF'}
        </button>
      </div>
      <h1>{title}</h1>
      {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
      <p className="question-number">
        Question {questionNumber} of {questions.length}
      </p>
      <h2 className="question">{currentQuestion.question}</h2>

      {!isRealMode && (
        <ul className="options">
          {optionsInRandomOrder.map((optionText) => (
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
      )}

      {/* Real Exam Mode: Show Answer Button */}
      {isRealMode && !showAnswer && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            type="button"
            className="next-btn"
            onClick={() => setShowAnswer(true)}
          >
            Show Correct Answer
          </button>
        </div>
      )}

      {/* Real Exam Mode: Answer Revealed */}
      {isRealMode && showAnswer && (
        <>
          <p className="feedback correct-feedback">
            <strong>Correct Answer:</strong> {currentQuestion.correctAnswer}
            <br />
            {currentQuestion.explanation}
          </p>
          <button type="button" className="next-btn" onClick={handleNext}>
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </button>
        </>
      )}

      {/* Standard Mode: Feedback */}
      {selectedAnswer !== null && !isRealMode && (
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
