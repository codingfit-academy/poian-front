import { useState } from 'react'
import StarRating from './StarRating'
import { NOTE_TYPES } from '../constants/notation'
import './NoteQuiz.css'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuestion(mode) {
  const correct = NOTE_TYPES[Math.floor(Math.random() * NOTE_TYPES.length)]
  const distractors = shuffle(NOTE_TYPES.filter((n) => n.id !== correct.id)).slice(0, 3)
  const choices = shuffle([correct, ...distractors])
  const questionMode = mode === 'mixed' ? (Math.random() < 0.5 ? 'name' : 'beat') : mode
  return { correct, choices, mode: questionMode }
}

// 실제 채점 대상은 음표 이름/박자 지식 퀴즈이며, 정답 개수 비율로 별점을 매긴다
function NoteQuiz({ instruction, mode = 'name', questionCount = 6 }) {
  const [phase, setPhase] = useState('ready') // ready | quiz | result
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [stars, setStars] = useState(0)

  const begin = () => {
    setQuestions(Array.from({ length: questionCount }, () => buildQuestion(mode)))
    setIndex(0)
    setScore(0)
    setFeedback(null)
    setPhase('quiz')
  }

  const current = questions[index]

  const handleChoice = (choice) => {
    if (feedback || !current) return
    const isCorrect = choice.id === current.correct.id
    setFeedback({ choiceId: choice.id, correct: isCorrect })
    const finalScore = isCorrect ? score + 1 : score
    if (isCorrect) setScore(finalScore)

    window.setTimeout(() => {
      setFeedback(null)
      const next = index + 1
      if (next >= questions.length) {
        const ratio = finalScore / questions.length
        setStars(ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1)
        setPhase('result')
      } else {
        setIndex(next)
      }
    }, 700)
  }

  return (
    <div className="note-quiz">
      <p className="note-quiz__label">미션</p>
      <p className="note-quiz__instruction">{instruction}</p>

      {phase === 'ready' && (
        <button type="button" className="big-button big-button--accent" onClick={begin}>
          시작하기
        </button>
      )}

      {phase === 'quiz' && current && (
        <div className="note-quiz__question">
          <p className="status-text">
            {index + 1} / {questions.length}
          </p>
          <p className="note-quiz__symbol">{current.correct.symbol}</p>
          <p className="note-quiz__prompt">
            {current.mode === 'name' ? '이 음표의 이름은 무엇일까요?' : '이 음표는 몇 박자일까요?'}
          </p>
          <div className="note-quiz__choices">
            {current.choices.map((choice) => {
              const label = current.mode === 'name' ? choice.name : choice.beatLabel
              const state = feedback
                ? choice.id === current.correct.id
                  ? 'correct'
                  : choice.id === feedback.choiceId
                    ? 'wrong'
                    : 'idle'
                : 'idle'
              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`note-quiz__choice note-quiz__choice--${state}`}
                  onClick={() => handleChoice(choice)}
                  disabled={!!feedback}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="note-quiz__result">
          <p className="note-quiz__result-title">
            {score} / {questions.length} 문제를 맞혔어요!
          </p>
          <StarRating count={stars} />
          <button type="button" className="big-button" onClick={begin}>
            다시 풀기
          </button>
        </div>
      )}
    </div>
  )
}

export default NoteQuiz
