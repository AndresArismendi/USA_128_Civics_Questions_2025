import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import Test from './Test.jsx'

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

function QuizPage({ quizDataEn, quizDataEs }) {
    const location = useLocation()
    const navigate = useNavigate()
    const { mode, language } = location.state || {}
    const [sessionKey, setSessionKey] = useState(0)

    // Redirect to home if no mode/language selected (e.g. direct access to /quiz)
    if (!mode || !language) {
        return <Navigate to="/" replace />
    }

    const rawQuizData = language === 'es' ? quizDataEs : quizDataEn

    const quizDataForMode = useMemo(() => {
        if (!rawQuizData) return null
        const all = rawQuizData.questions
        const shuffled = shuffleArray(all)
        let questions
        if (mode === 'study' || mode === 'audio') {
            questions = shuffled
        } else if (mode === 'exam') {
            questions = shuffled.slice(0, Math.min(EXAM_QUESTION_COUNT, shuffled.length))
        } else if (mode === 'real_no_options') {
            questions = shuffled.slice(0, Math.min(EXAM_NO_OPTIONS_QUESTION_COUNT, shuffled.length))
        } else {
            questions = shuffled.slice(0, Math.min(QUICK_QUESTION_COUNT, shuffled.length))
        }
        return { ...rawQuizData, questions }
    }, [rawQuizData, mode, sessionKey])

    const passThreshold = mode === 'exam' ? EXAM_PASS_THRESHOLD : undefined

    if (!quizDataForMode) return <div>Loading data...</div>

    return (
        <Test
            key={sessionKey}
            mode={mode}
            quizData={quizDataForMode}
            passThreshold={passThreshold}
            onBackToStart={() => navigate('/')}
            onRestart={() => setSessionKey((k) => k + 1)}
        />
    )
}

export default QuizPage
